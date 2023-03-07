import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsPositive } from 'class-validator';

import { User } from '@/entity/user.entity';

export class CreateUserQueryDto {
  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  success: boolean;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  time?: number;
}

export class CreateUserRetDto extends PickType(User, [
  'username',
  'id',
] as const) {}
