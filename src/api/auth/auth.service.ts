import { Inject, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { CookieOptions, Response } from 'express';

import { UserEntity } from '@/entities';
import { TAuthEnvironment, EJwtTokenType } from '@/types';
import { IRegisterTokenInCookieArgs, ISignatureArgs } from '@/types/args';
import { ENV_PROVIDER } from '@/utils/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(ENV_PROVIDER) private readonly env: TAuthEnvironment,
  ) {}

  async login(user: UserEntity): Promise<[string, string]> {
    const { ACCESS_EXPIRES, REFRESH_EXPIRES } = this.env;

    const accessOptions: JwtSignOptions = { expiresIn: ACCESS_EXPIRES };
    const refreshOptions: JwtSignOptions = { expiresIn: REFRESH_EXPIRES };

    const accessToken = this.signature({ user, options: accessOptions });
    const refreshToken = this.signature({ user, options: refreshOptions });

    return [accessToken, refreshToken];
  }

  async clearCookie(res: Response): Promise<void> {
    const { ACCESS_HEADER, REFRESH_HEADER } = this.env;

    res.clearCookie(ACCESS_HEADER);
    res.clearCookie(REFRESH_HEADER);
  }

  signature({ user, options = {} }: ISignatureArgs) {
    return this.jwtService.sign({ id: user.id }, options);
  }

  registerTokenInCookie({ type, token, res }: IRegisterTokenInCookieArgs) {
    const { ACCESS_HEADER, REFRESH_HEADER, COOKIE_MAX_AGE } = this.env;

    const isRefresh = type === EJwtTokenType.REFRESH;
    const tokenName = isRefresh ? REFRESH_HEADER : ACCESS_HEADER;

    let cookieOptions: CookieOptions = {
      maxAge: Number(COOKIE_MAX_AGE),
      secure: true,
    };

    if (isRefresh) {
      cookieOptions = {
        ...cookieOptions,
        httpOnly: true,
      };
    }

    res.cookie(tokenName, token, cookieOptions);
  }
}
