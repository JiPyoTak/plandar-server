import { THexColor } from '@/types';

const strToHexColor = (color: string): THexColor => {
  if (color[0] === '#') return color as THexColor;
  return `#${color}`;
};

const mapToHexColor = <
  IType extends { color: string },
  TArgs = IType | IType[],
  TForm = { color: THexColor } & Omit<IType, 'color'>,
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
