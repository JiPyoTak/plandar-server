import { UserEntity } from '@/entities/user.entity';

const enum EJwtTokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

type TTokenUser = Pick<UserEntity, 'id'>;

export { TTokenUser, EJwtTokenType };
