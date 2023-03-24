import { PickType } from '@nestjs/swagger';

import { Category } from '@/entity/category.entity';

class CategoryResDto extends PickType(Category, [
  'name',
  'id',
  'color',
] as const) {}

export { CategoryResDto };
