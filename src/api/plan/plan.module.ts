import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@/common/modules';

import { PlanController } from './plan.controller';
import { PlanRepository } from './plan.repository';
import { PlanService } from './plan.service';

@Module({
  imports: [TypeOrmExModule.forFeature([PlanRepository])],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
