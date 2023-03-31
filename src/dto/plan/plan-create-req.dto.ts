import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
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
    description: '일정 색상, 0x000000(0) ~ 0xffffff(16777215)',
    example: 0x52d681,
    minimum: 0x000000,
    maximum: 0xffffff,
    default: Buffer.from('0x52d681'),
  })
  @IsOptional()
  @IsString()
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
