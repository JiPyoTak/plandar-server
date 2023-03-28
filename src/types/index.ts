import { User } from '@/entity/user.entity';

enum TokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

type EnvironmentType =
  | 'JWT_SECRET_KEY'
  | 'ACCESS_HEADER'
  | 'REFRESH_HEADER'
  | 'ACCESS_EXPIRES'
  | 'REFRESH_EXPIRES'
  | 'COOKIE_MAX_AGE';

type AuthEnvironment = {
  [key in EnvironmentType]: string;
};

type TTokenUser = Pick<User, 'id'>;

export { TokenType, AuthEnvironment, TTokenUser };