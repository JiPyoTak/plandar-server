import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsHexColor,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { PlanEntity } from '@/entities';

class PlanCreateReqDto extends PickType(PlanEntity, [
  'title',
  'description',
  'isAllDay',
  'type',
  'startTime',
  'endTime',
] as const) {
  @ApiPropertyOptional({
    description: '일정 색상, #000000 ~ #ffffff',
    example: '#52d681',
  })
  @IsOptional()
  @IsHexColor()
  color?: string;

  @ApiProperty({
    description: '일정이 속해있는 카테고리 아이디',
    example: 100,
  })
  @IsNumber()
  categoryId!: number;

  @ApiProperty({
    description: '일정이 속해있는 카테고리 아이디',
    example: 100,
  })
  @IsArray()
  @ArrayMaxSize(5)
  @IsString({ each: true })
  tags!: string[];
}

export { PlanCreateReqDto };
