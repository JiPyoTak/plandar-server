import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsHexColor } from 'class-validator';

import { HexColor } from '@/dto/category/args';
import { Category } from '@/entity/category.entity';

class CategoryResDto extends PickType(Category, ['name', 'id'] as const) {
  @ApiProperty({
    description: '카테고리 색상, #000000 ~ #ffffff',
    example: '#52d681',
  })
  @IsHexColor()
  color!: HexColor;
}

export { CategoryResDto };
