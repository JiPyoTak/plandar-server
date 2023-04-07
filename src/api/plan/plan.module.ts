import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@/common/modules';

import { PlanController } from './plan.controller';
import { PlanRepository } from './plan.repository';
import { PlanService } from './plan.service';
import { CategoryModule } from '../category/category.module';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [
    TypeOrmExModule.forFeature([PlanRepository]),
    CategoryModule,
    TagModule,
  ],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
