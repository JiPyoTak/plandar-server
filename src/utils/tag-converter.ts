import { TagResDto } from '@/dto/tag';

const tagToStringArray = (tags: TagResDto[]): string[] => {
  return tags.map(({ name }) => name);
};

const mapTagsToStringArray = <
  IType extends { tags?: TagResDto[] },
  TArgs = IType | IType[],
  TForm = { tags?: TagResDto[] } & Omit<IType, 'tags'>,
  TReturn = TArgs extends any[] ? TForm[] : TForm,
>(
  obj: TArgs,
): TReturn => {
  if (obj instanceof Array) {
    return obj.map(({ tags, ...rest }) => {
      if (tags?.length === 0) return rest as TReturn;
      return {
        ...rest,
        tags: tagToStringArray(tags),
      };
    }) as TReturn;
  }

  const { tags, ...rest } = obj as unknown as IType;
  return (
    tags?.length > 0 ? { ...rest, tags: tagToStringArray(tags) } : rest
  ) as TReturn;
};

export { mapTagsToStringArray };
