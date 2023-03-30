import { JwtSignOptions } from '@nestjs/jwt';
import { Response } from 'express';

import { User } from '@/entity/user.entity';

import { EJwtTokenType } from '..';

interface ISignatureArgs {
  user: User;
  options?: JwtSignOptions;
}

interface IRegisterTokenInCookieArgs {
  type: EJwtTokenType;
  token: string;
  res: Response;
}

interface ILoginCallbackArgs {
  user: User;
  res: Response;
}

export { ISignatureArgs, IRegisterTokenInCookieArgs, ILoginCallbackArgs };
