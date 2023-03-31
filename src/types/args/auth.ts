import { JwtSignOptions } from '@nestjs/jwt';
import { Response } from 'express';

import { UserEntity } from '@/entities';

import { EJwtTokenType } from '..';

interface ISignatureArgs {
  user: UserEntity;
  options?: JwtSignOptions;
}

interface IRegisterTokenInCookieArgs {
  type: EJwtTokenType;
  token: string;
  res: Response;
}

interface ILoginCallbackArgs {
  user: UserEntity;
  res: Response;
}

export { ISignatureArgs, IRegisterTokenInCookieArgs, ILoginCallbackArgs };
