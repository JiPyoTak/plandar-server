import { EntityTarget } from 'typeorm';

import { RootRepository } from '@/common/root.repository';
import { Plan } from '@/entity/plan.entity';

export class PlanRepository extends RootRepository<Plan> {
  getName(): EntityTarget<Plan> {
    return Plan.name;
  }

  async createPlan(planName: string) {
    return this.getRepo().insert({
      planName,
    });
  }
}
