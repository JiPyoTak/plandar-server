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

export { TAuthEnvironment };
