import { Injectable } from '@nestjs/common';

import { CategoryService } from '@/api/category/category.service';
import { TagService } from '@/api/tag/tag.service';
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
  constructor(
    private readonly planRepo: PlanRepository,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
  ) {}

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
