import { Repository } from 'typeorm';

import { CustomRepository } from '@/common/decorators';
import { PlanResDto } from '@/dto/plan';
import { PlanEntity } from '@/entities';
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
}
