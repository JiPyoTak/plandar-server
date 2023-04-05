import { Between, Repository } from 'typeorm';

import { CustomRepository } from '@/common/decorators';
import { PlanResDto } from '@/dto/plan';
import { PlanEntity } from '@/entities';
import { IGetPlansArgs } from '@/types/args';
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
}
