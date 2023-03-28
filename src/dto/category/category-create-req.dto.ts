import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

import { Category } from '@/entity/category.entity';

class CategoryCreateReqDto extends PickType(Category, ['name'] as const) {
  @ApiPropertyOptional({
    description: '카테고리 색상, 0x000000(0) ~ 0xffffff(16777215)',
    example: 0x52d681,
    minimum: 0x000000,
    maximum: 0xffffff,
    default: Buffer.from('0x52d681'),
  })
  @IsOptional()
  @IsNumber()
  color?: number;
}

export { CategoryCreateReqDto };
