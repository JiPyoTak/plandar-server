import { Module } from '@nestjs/common';

import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';

@Module({
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
