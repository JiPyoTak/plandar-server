import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { TTokenUser } from '@/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          const refreshHeader = this.configService.get('REFRESH_HEADER');
          const refreshCookie = request.cookies?.[refreshHeader];

          const { authorization } = request.headers;
          const accessToken = /^Bearer (.*)$/.exec(authorization)?.[1];

          return accessToken ?? refreshCookie ?? null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  validate(payload: TTokenUser) {
    return { id: payload.id };
  }
}
