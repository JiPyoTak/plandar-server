import { Module } from '@nestjs/common';

import { CategoryRepository } from '@/api/category/category.repository';
import { TypeOrmExModule } from '@/common/modules';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmExModule.forFeature([CategoryRepository])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
