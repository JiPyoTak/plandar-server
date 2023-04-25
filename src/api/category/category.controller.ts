import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoryService } from '@/api/category/category.service';
import { User } from '@/common/decorators';
import {
  CreateCategorySwagger,
  DeleteCategorySwagger,
  ReadCategorySwagger,
  UpdateCategorySwagger,
} from '@/common/decorators/swagger/swagger-category.decorator';
import { CategoryCreateReqDto, CategoryUpdateReqDto } from '@/dto/category';
import { UserEntity } from '@/entities';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ReadCategorySwagger()
  @Get()
  async readCategory(@User() user: UserEntity) {
    return this.categoryService.readCategory(user.id);
  }

  @CreateCategorySwagger()
  @Post()
  async createCategory(
    @Body() { name: categoryName, color }: CategoryCreateReqDto,
    @User() user: UserEntity,
  ) {
    return this.categoryService.createCategory({
      userId: user.id,
      categoryName,
      color,
    });
  }

  @UpdateCategorySwagger()
  @Put(':categoryId')
  async updateCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() { name: categoryName, color }: CategoryUpdateReqDto,
    @User() user: UserEntity,
  ) {
    if (!(categoryName || color)) {
      throw new UnprocessableEntityException();
    }
    return this.categoryService.updateCategory({
      userId: user.id,
      categoryId,
      categoryName,
      color,
    });
  }

  @DeleteCategorySwagger()
  @Delete(':categoryId')
  async deleteCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @User() user: UserEntity,
  ) {
    return this.categoryService.deleteCategory({ userId: user.id, categoryId });
  }
}
