import { CategoryResDto } from '@/dto/category/category-res.dto';

type HexColor = `#${string}`;

interface CategoryInfo extends Omit<CategoryResDto, 'color'> {
  color: string;
}

interface CreateCategoryArgs {
  userId: number;
  categoryName: string;
  color?: string;
}

interface UpdateCategoryArgs {
  userId: number;
  categoryId: number;
  categoryName?: string;
  color?: string;
}

interface DeleteCategoryArgs {
  userId: number;
  categoryId: number;
}

export {
  CreateCategoryArgs,
  UpdateCategoryArgs,
  DeleteCategoryArgs,
  HexColor,
  CategoryInfo,
};
