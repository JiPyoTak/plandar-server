import { Module } from '@nestjs/common';

import { CategoryRepository } from '@/api/category/category.repository';
import { TypeOrmExModule } from '@/common/typeOrmEx.module';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmExModule.forFeature([CategoryRepository])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
