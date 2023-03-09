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

// PickType, OmitType, PartialType 등을 이용해 entity에서 필요한 부분만 뽑아서 dto를 만들 수 있다.
export class CreateUserRetDto extends PickType(User, [
  'username',
  'id',
] as const) {}
