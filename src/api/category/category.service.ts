import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { CategoryRepository } from '@/api/category/category.repository';
import { CategoryResDto } from '@/dto/category';
import {
  ICheckUserOwnCategoryArgs,
  ICreateCategoryArgs,
  IDeleteCategoryArgs,
  IUpdateCategoryArgs,
} from '@/types/args/category';
import { mapToHexColor } from '@/utils/color-converter';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async checkUserOwnCategory({
    userId,
    categoryId,
  }: ICheckUserOwnCategoryArgs): Promise<void> {
    const categoryUserId = await this.categoryRepo.findOnlyUserId(categoryId);
    if (!categoryUserId) {
      throw new ConflictException(
        `존재하지 않는 카테고리입니다: ${categoryId}`,
      );
    }
    if (userId !== categoryUserId) {
      throw new ForbiddenException(
        `유저가 조작할 수 없는 카테고리 입니다: ${categoryId}`,
      );
    }
  }

  async checkHasCategory(id: number): Promise<void> {
    const hasCategory = await this.categoryRepo.exist({ where: { id } });
    if (!hasCategory) {
      throw new ConflictException(`존재하지 않는 카테고리입니다 : ${id}`);
    }
  }

  async readCategory(userId: number): Promise<CategoryResDto[]> {
    return mapToHexColor(await this.categoryRepo.readCategory(userId));
  }

  @Transactional()
  async createCategory(
    createCategoryArgs: ICreateCategoryArgs,
  ): Promise<CategoryResDto> {
    const category = await this.categoryRepo.findCategoryByName({
      userId: createCategoryArgs.userId,
      categoryName: createCategoryArgs.categoryName,
    });

    if (category) {
      throw new ConflictException('Category already exists');
    }
    return mapToHexColor(
      await this.categoryRepo.createCategory(createCategoryArgs),
    );
  }

  @Transactional()
  async updateCategory(
    updateCategoryArgs: IUpdateCategoryArgs,
  ): Promise<CategoryResDto> {
    const [category, categoryByName] = await Promise.all([
      this.categoryRepo.findCategoryById({
        userId: updateCategoryArgs.userId,
        categoryId: updateCategoryArgs.categoryId,
      }),
      updateCategoryArgs.categoryName
        ? this.categoryRepo.findCategoryByName({
            userId: updateCategoryArgs.userId,
            categoryName: updateCategoryArgs.categoryName,
          })
        : null,
    ]);

    if (!category) {
      throw new ConflictException('Category does not exist');
    } else if (categoryByName) {
      throw new ConflictException('Category already exists');
    }

    updateCategoryArgs.categoryName ??= category.name;
    updateCategoryArgs.color ??= category.color;
    if (
      category.name === updateCategoryArgs.categoryName &&
      category.color === updateCategoryArgs.color
    ) {
      throw new ConflictException(
        'Please change category to not same name or color',
      );
    }

    return mapToHexColor(
      await this.categoryRepo.updateCategory(updateCategoryArgs),
    );
  }

  @Transactional()
  async deleteCategory(
    deleteCategoryArgs: IDeleteCategoryArgs,
  ): Promise<CategoryResDto> {
    await this.checkUserOwnCategory(deleteCategoryArgs);

    const category = await this.categoryRepo.findCategoryById(
      deleteCategoryArgs,
    );

    if (!(await this.categoryRepo.deleteCategory(deleteCategoryArgs))) {
      throw new InternalServerErrorException(
        '카테고리를 삭제하던 도중 에러가 발생했습니다. \n 삭제 요청을 취소합니다.',
      );
    }
    return mapToHexColor(category);
  }
}
