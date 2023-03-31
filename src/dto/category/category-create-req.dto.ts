import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsHexColor, IsOptional } from 'class-validator';

import { CategoryEntity } from '@/entities';

class CategoryCreateReqDto extends PickType(CategoryEntity, ['name'] as const) {
  @ApiPropertyOptional({
    description: '카테고리 색상, #000000 ~ #ffffff',
    example: '#52d681',
  })
  @IsOptional()
  @IsHexColor()
  @Transform(({ value }) => value.replace('#', ''))
  color?: string;
}

export { CategoryCreateReqDto };
