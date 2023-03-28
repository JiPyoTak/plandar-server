import { Repository } from 'typeorm';

import { CustomRepository } from '@/common/customRepository.decorator';
import { Category } from '@/entity/category.entity';

@CustomRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async findCategoryById(): Promise<any> {
    return Promise.resolve();
  }

  async findCategoryByName(): Promise<any> {
    return Promise.resolve();
  }

  async readCategory(): Promise<any> {
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
