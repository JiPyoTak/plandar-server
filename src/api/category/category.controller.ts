import { Controller } from '@nestjs/common';

import { CategoryService } from '@/api/category/category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
}
