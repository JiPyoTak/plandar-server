import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsNumber } from 'class-validator';

import { TagResDto } from '@/dto/tag';
import { PlanEntity } from '@/entities';

class PlanResDto extends OmitType(PlanEntity, [
  'createdAt',
  'updatedAt',
  'user',
  'tags',
  'category',
] as const) {
  @ApiProperty({
    description: '일정이 속해있는 카테고리 아이디',
  })
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    description: '일정이 가지고 있는 태그 객체',
  })
  @IsArray()
  @ArrayMaxSize(5)
  tags?: TagResDto[];
}

export { PlanResDto };