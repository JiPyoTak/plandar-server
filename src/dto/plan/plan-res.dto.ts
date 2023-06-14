import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsNumber } from 'class-validator';

import { PlanEntity } from '@/entities';

class PlanResDto extends OmitType(PlanEntity, [
  'createdAt',
  'updatedAt',
  'userId',
  'user',
  'tags',
  'category',
  'categoryId',
] as const) {
  @ApiPropertyOptional({
    description: '일정이 속해있는 카테고리 아이디',
  })
  @IsNumber()
  categoryId?: number;

  @ApiProperty({
    description: '일정이 가지고 있는 태그 객체',
    example: ['태그1', '태그2'],
  })
  @IsArray()
  @ArrayMaxSize(5)
  tags!: string[];
}

export { PlanResDto };
