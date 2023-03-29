import { HexColor } from '@/dto/category';

const strToHexColor = (color: string): HexColor => `#${color}`;

const mapToHexColor = <
  IType extends { color: string },
  TArgs = IType | IType[],
  TForm = { color: HexColor } & Omit<IType, 'color'>,
  TReturn = TArgs extends any[] ? TForm[] : TForm,
>(
  obj: TArgs,
): TReturn => {
  if (obj instanceof Array) {
    return obj.map(({ color, ...rest }) => ({
      ...rest,
      color: strToHexColor(color),
    })) as TReturn;
  }

  const { color, ...rest } = obj as unknown as IType;
  return { ...rest, color: strToHexColor(color) } as TReturn;
};

export { strToHexColor, mapToHexColor };
