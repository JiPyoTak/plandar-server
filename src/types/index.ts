import { User } from '@/entity/user.entity';

const enum EJwtTokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

type TEnvironmentType =
  | 'JWT_SECRET_KEY'
  | 'ACCESS_HEADER'
  | 'REFRESH_HEADER'
  | 'ACCESS_EXPIRES'
  | 'REFRESH_EXPIRES'
  | 'COOKIE_MAX_AGE';

type TAuthEnvironment = {
  [key in TEnvironmentType]: string;
};

type TTokenUser = Pick<User, 'id'>;

export { TAuthEnvironment, TTokenUser, EJwtTokenType };
