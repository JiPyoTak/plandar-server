import { Repository } from 'typeorm';

import { CustomRepository } from '@/common/decorators/custom-repository.decorator';
import { Category } from '@/entity/category.entity';
import {
  ICategoryInfo,
  ICreateCategoryArgs,
  IDeleteCategoryArgs,
  IUpdateCategoryArgs,
} from '@/types/args/category';

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
  }): Promise<ICategoryInfo> {
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
  }): Promise<ICategoryInfo> {
    return this.findOne({
      where: {
        name: categoryName,
        user: { id: userId },
      },
      select: SELECT,
    });
  }

  async readCategory(userId: number): Promise<ICategoryInfo[]> {
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
  }: ICreateCategoryArgs): Promise<ICategoryInfo> {
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
  }: IUpdateCategoryArgs): Promise<ICategoryInfo> {
    await this.update({ id: categoryId }, { name: categoryName, color });
    return this.findCategoryById({ userId, categoryId });
  }

  async deleteCategory({
    categoryId,
    userId,
  }: IDeleteCategoryArgs): Promise<boolean> {
    const { affected } = await this.delete({
      id: categoryId,
      user: { id: userId },
    });
    return !!affected;
  }
}
