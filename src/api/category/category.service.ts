import { Injectable } from '@nestjs/common';

import { CategoryRepository } from '@/api/category/category.repository';
import {
  CreateCategoryArgs,
  DeleteCategoryArgs,
  UpdateCategoryArgs,
} from '@/dto/category';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async readCategory(userId: number): Promise<any> {
    return Promise.resolve();
  }

  async createCategory({
    userId,
    categoryName,
    color,
  }: CreateCategoryArgs): Promise<any> {
    return Promise.resolve();
  }

  async updateCategory({
    userId,
    categoryName,
    categoryId,
    color,
  }: UpdateCategoryArgs): Promise<any> {
    return Promise.resolve();
  }

  async deleteCategory({
    userId,
    categoryId,
  }: DeleteCategoryArgs): Promise<any> {
    return Promise.resolve();
  }
}
