import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsHexColor } from 'class-validator';

import { Category } from '@/entity/category.entity';
import { THexColor } from '@/types';

class CategoryResDto extends PickType(Category, ['name', 'id'] as const) {
  @ApiProperty({
    description: '카테고리 색상, #000000 ~ #ffffff',
    example: '#52d681',
  })
  @IsHexColor()
  color!: THexColor;
}

export { CategoryResDto };
