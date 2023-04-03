import { Injectable } from '@nestjs/common';

import { PlanResDto } from '@/dto/plan';
import {
  ICreatePlanArgs,
  IDeletePlanArgs,
  IGetPlansArgs,
  IUpdatePlanWithTagsArgs,
} from '@/types/args';

import { PlanRepository } from './plan.repository';

@Injectable()
export class PlanService {
  constructor(private readonly planRepo: PlanRepository) {}

  async getPlans(data: IGetPlansArgs): Promise<PlanResDto[]> {
    return [];
  }

  async createPlan(data: ICreatePlanArgs): Promise<PlanResDto> {
    return {} as PlanResDto;
  }

  async updatePlan(data: IUpdatePlanWithTagsArgs): Promise<PlanResDto> {
    return {} as PlanResDto;
  }

  async deletePlan(data: IDeletePlanArgs): Promise<PlanResDto> {
    return {} as PlanResDto;
  }
}
