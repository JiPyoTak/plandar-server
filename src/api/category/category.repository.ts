import { Repository } from 'typeorm';

import { CustomRepository } from '@/common/customRepository.decorator';
import {
  CategoryInfo,
  CreateCategoryArgs,
  DeleteCategoryArgs,
  UpdateCategoryArgs,
} from '@/dto/category';
import { Category } from '@/entity/category.entity';

const SELECT = {
  id: true,
  name: true,
  color: true,
};

@CustomRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async findCategoryById({
    userId,
    categoryId,
  }: {
    userId: number;
    categoryId: number;
  }): Promise<CategoryInfo> {
    return this.findOne({
      where: {
        id: categoryId,
        user: { id: userId },
      },
      select: SELECT,
    });
  }

  async findCategoryByName({
    userId,
    categoryName,
  }: {
    userId: number;
    categoryName: string;
  }): Promise<CategoryInfo> {
    return this.findOne({
      where: {
        name: categoryName,
        user: { id: userId },
      },
      select: SELECT,
    });
  }

  async readCategory(userId: number): Promise<CategoryInfo[]> {
    return this.find({
      where: {
        user: { id: userId },
      },
      select: SELECT,
    });
  }

  async createCategory({
    userId,
    categoryName,
    color,
  }: CreateCategoryArgs): Promise<CategoryInfo> {
    const {
      identifiers: [{ id }],
    } = await this.insert({
      name: categoryName,
      color,
      user: { id: userId },
    });
    return this.findCategoryById({ userId, categoryId: id });
  }

  async updateCategory({
    userId,
    categoryId,
    categoryName,
    color,
  }: UpdateCategoryArgs): Promise<CategoryInfo> {
    await this.update({ id: categoryId }, { name: categoryName, color });
    return this.findCategoryById({ userId, categoryId });
  }

  async deleteCategory({
    categoryId,
    userId,
  }: DeleteCategoryArgs): Promise<boolean> {
    const { affected } = await this.delete({
      id: categoryId,
      user: { id: userId },
    });
    return !!affected;
  }
}
