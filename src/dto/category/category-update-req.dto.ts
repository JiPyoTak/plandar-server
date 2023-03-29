import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsHexColor, IsOptional, IsString } from 'class-validator';

class CategoryUpdateReqDto {
  @ApiPropertyOptional({
    description: '카테고리 이름',
    example: '운동',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: '카테고리 색상',
    example: '#52d681',
  })
  @IsOptional()
  @IsHexColor()
  @Transform(({ value }) => value.replace('#', ''))
  color?: string;
}

export { CategoryUpdateReqDto };
