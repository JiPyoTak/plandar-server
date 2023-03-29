import { Inject, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { CookieOptions, Response } from 'express';

import { User } from '@/entity/user.entity';
import { AuthEnvironment, EJwtTokenType } from '@/types';
import { ENV_PROVIDER } from '@/utils/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(ENV_PROVIDER) private readonly env: AuthEnvironment,
  ) {}

  async login(user: User): Promise<[string, string]> {
    const { ACCESS_EXPIRES, REFRESH_EXPIRES } = this.env;

    const accessOptions: JwtSignOptions = { expiresIn: ACCESS_EXPIRES };
    const refreshOptions: JwtSignOptions = { expiresIn: REFRESH_EXPIRES };

    const accessToken = this.signature(user, accessOptions);
    const refreshToken = this.signature(user, refreshOptions);

    return [accessToken, refreshToken];
  }

  async clearCookie(res: Response): Promise<void> {
    const { ACCESS_HEADER, REFRESH_HEADER } = this.env;

    res.clearCookie(ACCESS_HEADER);
    res.clearCookie(REFRESH_HEADER);
  }

  signature(user: User, options: JwtSignOptions = {}) {
    return this.jwtService.sign({ id: user.id }, options);
  }

  registerTokenInCookie(type: EJwtTokenType, token: string, res: Response) {
    const { ACCESS_HEADER, REFRESH_HEADER, COOKIE_MAX_AGE } = this.env;

    const tokenName =
      type === EJwtTokenType.ACCESS ? ACCESS_HEADER : REFRESH_HEADER;

    const cookieOptions: CookieOptions = {
      maxAge: Number(COOKIE_MAX_AGE),
      httpOnly: true,
      secure: true,
    };

    res.cookie(tokenName, token, cookieOptions);
  }
}
