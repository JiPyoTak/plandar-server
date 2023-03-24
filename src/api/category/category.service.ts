import { Injectable } from '@nestjs/common';

import { CategoryRepository } from '@/api/category/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async readCategories(): Promise<any> {
    return Promise.resolve();
  }

  async createCategory(): Promise<any> {
    return Promise.resolve();
  }

  async updateCategory(): Promise<any> {
    return Promise.resolve();
  }

  async deleteCategory(): Promise<any> {
    return Promise.resolve();
  }
}
