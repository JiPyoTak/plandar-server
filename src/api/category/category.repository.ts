import { Repository } from 'typeorm';

import { CustomRepository } from '@/common/decorators';
import { CategoryEntity } from '@/entities';
import {
  ICategoryInfo,
  ICreateCategoryArgs,
  IDeleteCategoryArgs,
  IUpdateCategoryArgs,
} from '@/types/args/category';
import { CATEGORY_SELECT } from '@/utils/constants';

@CustomRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity> {
  async findOnlyUserId(id: number): Promise<number> {
    const category = await this.findOne({
      where: { id },
      select: { user: { id: true } },
      relations: { user: true },
    });

    return category?.user.id ?? null;
  }

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
      select: CATEGORY_SELECT,
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
      select: CATEGORY_SELECT,
    });
  }

  async readCategory(userId: number): Promise<ICategoryInfo[]> {
    return this.find({
      where: {
        user: { id: userId },
      },
      select: CATEGORY_SELECT,
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
