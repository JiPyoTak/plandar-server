import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: any) {
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      throw new BadRequestException(
        'Validation failed (Date string is expected)',
      );
    }

    return date;
  }
}
