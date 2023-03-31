import { PickType } from '@nestjs/swagger';

import { UserEntity } from '@/entities';

export class UserCreateDto extends PickType(UserEntity, [
  'username',
  'email',
  'profileImage',
] as const) {}
