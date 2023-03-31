import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsHexColor,
} from 'class-validator';

import { IsDateType } from '@/common/decorators/date-type.decorator';
import { PLAN_TYPE } from '@/entities';

class PlanUpdateReqDto {
  @ApiPropertyOptional({
    description: '일정 제목',
    example: '내일 목표',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: '일정에 대해 유저가 써놓은 설명',
    example: '이 일정은 지켜지지 않아도 된다.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: '일정이 나타내는 색상',
    example: '#52d681',
  })
  @IsHexColor()
  @IsOptional()
  color?: string;

  @ApiPropertyOptional({
    description: '일정이 종일에 해당하는지에 대한 여부',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isAllDay?: boolean;

  @ApiPropertyOptional({
    description: '일정이 속하는 타입, 일정 / 할 일 / 알람',
    example: PLAN_TYPE.EVENT,
  })
  @IsOptional()
  @IsEnum(PLAN_TYPE)
  type?: PLAN_TYPE;

  @ApiPropertyOptional({
    description: '일정이 시작하는 시간',
    example: new Date('2023-03-07 15:38:06.785155'),
  })
  @IsOptional()
  @IsDateType()
  startTime?: Date;

  @ApiPropertyOptional({
    description: '일정의 마지막 시간',
    example: null,
  })
  @IsOptional()
  @IsDateType()
  endTime?: Date | null;

  @ApiPropertyOptional({
    description: '일정이 속해있는 카테고리 아이디',
    example: 100,
  })
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiPropertyOptional({
    description: '일정이 속해있는 태그의 묶음',
    example: ['태그1', '태그2'],
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @IsString({ each: true })
  tags?: string[];
}

export { PlanUpdateReqDto };
