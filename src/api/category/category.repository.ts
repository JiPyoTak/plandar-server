import { Repository } from 'typeorm';

import { CustomRepository } from '@/common/decorators';
import { Category } from '@/entity/category.entity';

@CustomRepository(Category)
export class CategoryRepository extends Repository<Category> {}
