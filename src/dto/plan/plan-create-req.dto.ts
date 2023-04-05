import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
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
  @Transform(({ value }) => value.replace('#', ''))
  color?: string;

  @ApiPropertyOptional({
    description: '일정이 속해있는 카테고리 아이디',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiPropertyOptional({
    description: '일정이 속해있는 카테고리 아이디',
    example: ['태그1', '태그2'],
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @IsString({ each: true })
  tags?: string[];
}

export { PlanCreateReqDto };
