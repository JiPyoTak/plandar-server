import { PickType } from '@nestjs/swagger';

import { User } from '@/entity/user.entity';

// PickType, OmitType, PartialType 등을 이용해 entity에서 필요한 부분만 뽑아서 dto를 만들 수 있다.
export class CreateUserRetDto extends PickType(User, [
  'username',
  'email',
  'profileImage',
] as const) {}
