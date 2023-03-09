import { Repository } from 'typeorm';

import { CustomRepository } from '@/common/customRepository.decorator';
import { Plan } from '@/entity/plan.entity';

@CustomRepository(Plan)
export class PlanRepository extends Repository<Plan> {
  async createPlan(planName: string) {
    return this.save(this.create({ planName }));
  }
}
