import { Injectable } from '@nestjs/common';

import { PlanEntity } from '@/entities';

import { PlanRepository } from './plan.repository';

@Injectable()
export class PlanService {
  constructor(private readonly planRepository: PlanRepository) {}

  async getPlans(data): Promise<PlanEntity[]> {
    return [];
  }

  async createPlan(data): Promise<PlanEntity> {
    return {} as PlanEntity;
  }

  async updatePlan(data): Promise<PlanEntity> {
    return {} as PlanEntity;
  }

  async deletePlan(data): Promise<PlanEntity> {
    return {} as PlanEntity;
  }
}
