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
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { CategoryService } from '@/api/category/category.service';
import { User } from '@/common/decorators';
import {
  CategoryCreateReqDto,
  CategoryUpdateReqDto,
  CategoryResDto,
} from '@/dto/category';
import { UserEntity } from '@/entities';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: '카테고리 조회',
  })
  @ApiOkResponse({
    description: '카테고리 조회 성공',
    type: CategoryResDto,
    isArray: true,
  })
  @Get()
  async readCategory(@User() user: UserEntity) {
    return this.categoryService.readCategory(user.id);
  }

  @ApiOperation({
    summary: '카테고리 생성',
  })
  @ApiCreatedResponse({
    description: '카테고리 생성 성공',
    type: CategoryResDto,
  })
  @ApiConflictResponse({
    description: '이미 카테고리가 존재함',
  })
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

  @ApiOperation({
    summary: '카테고리 수정',
  })
  @ApiOkResponse({
    description: '카테고리 수정 성공',
    type: CategoryResDto,
  })
  @ApiConflictResponse({
    description:
      '카테고리가 존재하지 않거나 동일한 이름으로 수정하려고 하는 경우',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Request Body에 name, color가 모두 없는 경우',
  })
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

  @ApiOperation({
    summary: '카테고리 삭제',
  })
  @ApiOkResponse({
    description: '카테고리 삭제 성공',
    type: CategoryResDto,
  })
  @ApiConflictResponse({
    description: '카테고리가 존재하지 않는 경우',
  })
  @Delete(':categoryId')
  async deleteCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @User() user: UserEntity,
  ) {
    return this.categoryService.deleteCategory({ userId: user.id, categoryId });
  }
}
