import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

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

  async createPlan(data: ICreatePlanArgs): Promise<PlanResDto> {
    return {} as PlanResDto;
  }

  async updatePlan(data: IUpdatePlanWithTagsArgs): Promise<PlanResDto> {
    return {} as PlanResDto;
  }

  async deletePlan(data: IDeletePlanArgs): Promise<PlanResDto> {
    return {} as PlanResDto;
  }
}
