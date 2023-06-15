import { TagResDto } from '@/dto/tag';

const tagToStringArray = (tags: TagResDto[]): string[] => {
  return tags.map(({ name }) => name);
};

const mapTagsToStringArray = <
  IType extends { tags: TagResDto[] },
  TArgs = IType | IType[],
  TForm = { tags: TagResDto[] } & Omit<IType, 'tags'>,
  TReturn = TArgs extends any[] ? TForm[] : TForm,
>(
  obj: TArgs,
): TReturn => {
  if (obj instanceof Array) {
    return obj.map(({ tags, ...rest }) => {
      return {
        ...rest,
        tags: tagToStringArray(tags),
      };
    }) as TReturn;
  }

  const { tags, ...rest } = obj as unknown as IType;
  return { ...rest, tags: tagToStringArray(tags) } as TReturn;
};

export { mapTagsToStringArray };
