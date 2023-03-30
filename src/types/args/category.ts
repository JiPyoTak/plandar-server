interface CreateCategoryArgs {
  userId: number;
  categoryName: string;
  color?: number;
}

interface UpdateCategoryArgs {
  userId: number;
  categoryId: number;
  categoryName?: string;
  color?: number;
}

interface DeleteCategoryArgs {
  userId: number;
  categoryId: number;
}

export { CreateCategoryArgs, UpdateCategoryArgs, DeleteCategoryArgs };
