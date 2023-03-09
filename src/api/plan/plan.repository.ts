import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Plan } from '@/entity/plan.entity';

@Injectable()
export class PlanRepository extends Repository<Plan> {
  constructor(dataSource: DataSource) {
    super(Plan, dataSource.createEntityManager());
  }

  async createPlan(planName: string) {
    return this.save(this.create({ planName }));
  }
}
