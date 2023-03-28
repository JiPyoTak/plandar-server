import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { CategoryRepository } from '@/api/category/category.repository';
import {
  CategoryResDto,
  CreateCategoryArgs,
  DeleteCategoryArgs,
  UpdateCategoryArgs,
} from '@/dto/category';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async readCategory(userId: number): Promise<CategoryResDto[]> {
    return this.categoryRepo.readCategory(userId);
  }

  async createCategory(
    createCategoryArgs: CreateCategoryArgs,
  ): Promise<CategoryResDto> {
    const category = await this.categoryRepo.findCategoryByName({
      userId: createCategoryArgs.userId,
      categoryName: createCategoryArgs.categoryName,
    });
    if (category) {
      throw new ConflictException('Category already exists');
    }
    return this.categoryRepo.createCategory(createCategoryArgs);
  }

  async updateCategory(
    updateCategoryArgs: UpdateCategoryArgs,
  ): Promise<CategoryResDto> {
    const category = await this.categoryRepo.findCategoryByName({
      categoryName: updateCategoryArgs.categoryName,
      userId: updateCategoryArgs.userId,
    });
    if (!category) {
      throw new ConflictException('Tag does not exist');
    } else if (category.name === updateCategoryArgs.categoryName) {
      throw new ConflictException('Tag name is the same');
    }
    return this.categoryRepo.updateCategory(updateCategoryArgs);
  }

  async deleteCategory(
    deleteCategoryArgs: DeleteCategoryArgs,
  ): Promise<CategoryResDto> {
    const category = await this.categoryRepo.findCategoryById(
      deleteCategoryArgs,
    );
    if (!category) {
      throw new ConflictException('Tag does not exist');
    }

    if (!(await this.categoryRepo.deleteCategory(deleteCategoryArgs))) {
      throw new InternalServerErrorException(
        'There is an error in deleting category',
      );
    }
    return category;
  }
}
