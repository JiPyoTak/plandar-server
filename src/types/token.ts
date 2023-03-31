import { UserEntity } from '@/entities';

const enum EJwtTokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

type TTokenUser = Pick<UserEntity, 'id'>;

export { TTokenUser, EJwtTokenType };
