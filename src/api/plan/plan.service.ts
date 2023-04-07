import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { CategoryService } from '@/api/category/category.service';
import { TagService } from '@/api/tag/tag.service';
import { PlanResDto } from '@/dto/plan';
import {
  ICheckUserOwnPlan,
  ICreatePlanArgs,
  IDeletePlanArgs,
  IGetPlansArgs,
  IUpdatePlanWithTagsArgs,
} from '@/types/args';
import { mapToHexColor } from '@/utils/color-converter';

import { PlanRepository } from './plan.repository';

@Injectable()
export class PlanService {
  constructor(
    private readonly planRepo: PlanRepository,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
  ) {}

  async checkUserOwnPlan({ userId, planId }: ICheckUserOwnPlan): Promise<void> {
    const planUserId = await this.planRepo.findOnlyUserId(planId);
    if (!planUserId) {
      throw new ConflictException(`존재하지 않는 일정입니다: ${planId}`);
    }
    if (planUserId !== userId) {
      throw new ForbiddenException(
        `유저가 조작할 수 없는 일정입니다: ${planId}`,
      );
    }
  }

  async checkHasPlan(id: number): Promise<void> {
    const hasPlan = await this.planRepo.exist({ where: { id } });
    if (!hasPlan) {
      throw new ConflictException(`존재하지 않는 일정입니다 : ${id}`);
    }
  }

  async getPlans(data: IGetPlansArgs): Promise<PlanResDto[]> {
    return mapToHexColor(await this.planRepo.findPlansBetweenDate(data));
  }

  @Transactional()
  async createPlan({
    tags = [],
    ...planData
  }: ICreatePlanArgs): Promise<PlanResDto> {
    const { categoryId, userId } = planData;
    if (categoryId) {
      await this.categoryService.checkUserOwnCategory({ categoryId, userId });
    }

    const createdTags = await Promise.all(
      tags.map((tagName) => this.tagService.createTag({ tagName, userId })),
    );

    const newPlan = await this.planRepo.createPlan({
      ...planData,
      tags: createdTags,
    });

    return mapToHexColor(newPlan);
  }

  @Transactional()
  async updatePlan({
    tags = [],
    ...data
  }: IUpdatePlanWithTagsArgs): Promise<PlanResDto> {
    const { id, categoryId, userId } = data;

    await this.checkUserOwnPlan({ userId, planId: id });

    if (categoryId) {
      await this.categoryService.checkUserOwnCategory({ categoryId, userId });
    }

    const createdTags = await Promise.all(
      tags.map((tagName) => this.tagService.createTag({ tagName, userId })),
    );

    const updatedPlan = await this.planRepo.updatePlan({
      ...data,
      tags: createdTags,
    });

    return mapToHexColor(updatedPlan);
  }

  @Transactional()
  async deletePlan({ userId, planId }: IDeletePlanArgs): Promise<PlanResDto> {
    await this.checkUserOwnPlan({ userId, planId });

    const plan = await this.planRepo.findPlanById(planId);

    const isDeleted = await this.planRepo.deletePlan(planId);
    if (!isDeleted) {
      throw new InternalServerErrorException('일정을 삭제하는데 실패했습니다');
    }

    const { tags } = plan;
    const tagDatas = await Promise.all(
      tags.map(({ id }) =>
        this.tagService.deleteTagIfNotReferenced({ tagId: id, userId }),
      ),
    );

    return mapToHexColor({ ...plan, tags: tagDatas });
  }
}
