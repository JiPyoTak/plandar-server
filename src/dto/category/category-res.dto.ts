import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsHexColor } from 'class-validator';

import { CategoryEntity } from '@/entities';
import { THexColor } from '@/types';

class CategoryResDto extends PickType(CategoryEntity, ['name', 'id'] as const) {
  @ApiProperty({
    description: '카테고리 색상, #000000 ~ #ffffff',
    example: '#52d681',
  })
  @IsHexColor()
  color!: THexColor;
}

export { CategoryResDto };
