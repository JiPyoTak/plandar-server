import { Injectable } from '@nestjs/common';

import { PlanResDto } from '@/dto/plan';
import { ICreatePlanArgs, IGetPlansArgs } from '@/types/args';

import { PlanRepository } from './plan.repository';

@Injectable()
export class PlanService {
  constructor(private readonly planRepository: PlanRepository) {}

  async getPlans(data: IGetPlansArgs): Promise<PlanResDto[]> {
    return [];
  }

  async createPlan(data: ICreatePlanArgs): Promise<PlanResDto> {
    return {} as PlanResDto;
  }

  async updatePlan(data): Promise<PlanResDto> {
    return {} as PlanResDto;
  }

  async deletePlan(data): Promise<PlanResDto> {
    return {} as PlanResDto;
  }
}
