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

const PLANDAR_CUSTOM_REPSOITORY = 'PLANDAR_CUSTOM_REPSOITORY';

const ENV_PROVIDER = 'ENV_PROVIDER';

export { TokenType, PLANDAR_CUSTOM_REPSOITORY, ENV_PROVIDER, AuthEnvironment };
