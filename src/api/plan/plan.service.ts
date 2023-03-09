import { Injectable } from '@nestjs/common';

import { Plan } from '@/entity/plan.entity';

import { PlanRepository } from './plan.repository';

@Injectable()
export class PlanService {
  constructor(private readonly planRepo: PlanRepository) {}

  async createPlan(plan: Partial<Plan>) {
    return {} as Plan;
  }

  async getPlan(id: number) {
    return {} as Plan;
  }

  async getAllPlans() {
    return await this.planRepo.find();
  }

  async updatePlan(id: number, plan: Partial<Plan>) {
    return {} as Plan;
  }

  async removePlan(id: number) {
    return true;
  }
}
