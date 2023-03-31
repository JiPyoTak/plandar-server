import { Injectable } from '@nestjs/common';

import { PlanResDto } from '@/dto/plan';
import { IGetPlansArgs } from '@/types/args/plan';

import { PlanRepository } from './plan.repository';

@Injectable()
export class PlanService {
  constructor(private readonly planRepository: PlanRepository) {}

  async getPlans(data: IGetPlansArgs): Promise<PlanResDto[]> {
    return [];
  }

  async createPlan(data): Promise<PlanResDto> {
    return {} as PlanResDto;
  }

  async updatePlan(data): Promise<PlanResDto> {
    return {} as PlanResDto;
  }

  async deletePlan(data): Promise<PlanResDto> {
    return {} as PlanResDto;
  }
}
