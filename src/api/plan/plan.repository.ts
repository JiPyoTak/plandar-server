import { Between, Repository } from 'typeorm';

import { CustomRepository } from '@/common/decorators';
import { PlanResDto } from '@/dto/plan';
import { TagResDto } from '@/dto/tag';
import { PlanEntity } from '@/entities';
import { ICreatePlanArgs, IGetPlansArgs, IUpdatePlanArgs } from '@/types/args';
import { PLAN_SELECT } from '@/utils/constants';

@CustomRepository(PlanEntity)
export class PlanRepository extends Repository<PlanEntity> {
  async findPlanById(id: number): Promise<PlanResDto> {
    return await this.findOne({
      where: { id },
      select: PLAN_SELECT,
      relations: { category: false, tags: true },
    });
  }

  async findOnlyUserId(id: number): Promise<number> {
    const plan = await this.findOne({
      where: { id },
      select: { userId: true },
    });

    return plan?.userId ?? null;
  }

  findPlansBetweenDate({
    timeMin,
    timeMax,
  }: IGetPlansArgs): Promise<PlanResDto[]> {
    return this.find({
      where: {
        startTime: Between(timeMin, timeMax),
      },
      select: PLAN_SELECT,
      relations: { tags: true },
    });
  }

  async createPlan(
    planData: Omit<ICreatePlanArgs, 'tags'> & { tags: TagResDto[] },
  ): Promise<PlanResDto> {
    const filteredPlan = this.create(planData);

    const { id } = await this.save(filteredPlan);

    return await this.findPlanById(id);
  }

  async updatePlan({
    id,
    ...planData
  }: Omit<IUpdatePlanArgs, 'tags'> & {
    tags: TagResDto[];
  }): Promise<PlanResDto> {
    const data = this.create({ ...planData, id });
    await this.save(data);
    return await this.findPlanById(id);
  }

  async deletePlan(planId: number): Promise<boolean> {
    const { affected } = await this.delete({ id: planId });
    return !!affected;
  }
}
