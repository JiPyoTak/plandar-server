import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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
    example: 0x52d681,
    minimum: 0x000000,
    maximum: 0xffffff,
    default: Buffer.from('0x52d681'),
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Buffer.from(value, 'hex'))
  color?: number;
}

export { CategoryUpdateReqDto };
