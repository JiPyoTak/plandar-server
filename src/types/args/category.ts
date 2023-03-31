import { CategoryResDto } from '@/dto/category/category-res.dto';

interface ICategoryInfo extends Omit<CategoryResDto, 'color'> {
  color: string;
}

interface ICreateCategoryArgs {
  userId: number;
  categoryName: string;
  color?: string;
}

interface IUpdateCategoryArgs {
  userId: number;
  categoryId: number;
  categoryName?: string;
  color?: string;
}

interface IDeleteCategoryArgs {
  userId: number;
  categoryId: number;
}

export {
  ICreateCategoryArgs,
  IUpdateCategoryArgs,
  IDeleteCategoryArgs,
  ICategoryInfo,
};
