import { Repository } from 'typeorm';

import { CustomRepository } from '@/common/decorators';
import { Plan } from '@/entity/plan.entity';

@CustomRepository(Plan)
export class PlanRepository extends Repository<Plan> {
  async createPlan(planName: string) {
    return {} as Plan;
  }

  async findById(id: number) {
    return {} as Plan;
  }

  async updatePlan() {
    return {} as Plan;
  }

  async removePlan() {
    return true;
  }
}
