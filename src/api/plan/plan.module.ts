import { Module } from '@nestjs/common';

import { TransactionManager } from '@/common/transaction.manager';

import { PlanController } from './plan.controller';
import { PlanRepository } from './plan.repository';
import { PlanService } from './plan.service';

@Module({
  controllers: [PlanController],
  providers: [PlanService, PlanRepository, TransactionManager],
})
export class PlanModule {}
