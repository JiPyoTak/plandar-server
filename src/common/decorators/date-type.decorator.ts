import { Transform, TransformOptions } from 'class-transformer';
import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator';

const IS_DATE_TYPE = 'isDateType';

function isDateType(value) {
  return !isNaN(new Date(value).getTime());
}

export function IsDateType(validationOptions?: ValidationOptions) {
  return ValidateBy(
    {
      name: IS_DATE_TYPE,
      validator: {
        validate: (value) => isDateType(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix +
            '$property must be a valid Date Type - string, number, Date instance',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}

export function TransformDate(options?: TransformOptions) {
  return Transform(({ value }) => {
    if (value === null) {
      return null;
    }

    const returnValue = new Date(value);
    return isNaN(returnValue.getTime()) ? null : returnValue;
  }, options);
}
