import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy, Type } from '@nestjs/passport';
import { Strategy } from 'passport';
import {
  Strategy as GStrategy,
  Profile as GProfile,
} from 'passport-google-oauth20';
import { Strategy as KStrategy, Profile as KProfile } from 'passport-kakao';

import { UserService } from '@/api/user/user.service';
import { UserCreateDto } from '@/dto/user';

type Strategyptions = (
  configService: ConfigService,
) => Record<string, string | string[] | number | boolean>;

const oAuthStrategyGenerator = (
  strategyName: string,
  _strategy: Type<Strategy>,
  optionCb: Strategyptions,
): Type<Strategy> => {
  @Injectable()
  class OAuthStrategy extends PassportStrategy(_strategy, strategyName) {
    constructor(
      private readonly configService: ConfigService,
      private readonly userService: UserService,
    ) {
      const options = optionCb(configService);
      super({ ...options });
    }
    async validate(_: string, __: string, _profile: GProfile | KProfile) {
      const profile = getProfileByProvider(_profile);

      const user = await this.userService.validateUser(profile);

      return user;
    }
  }
  return OAuthStrategy;
};

const getProfileByProvider = (profile: GProfile | KProfile): UserCreateDto => {
  switch (profile.provider) {
    case 'google':
      return {
        username: profile.name.givenName,
        email: profile.emails[0].value,
        profileImage: profile.photos[0].value,
      };
    case 'kakao':
      return {
        username: profile.username,
        email: profile._json.kakao_account.email,
        profileImage: profile._json.properties.profile_image.replace(
          'http://',
          'https://',
        ),
      };
    default:
      throw new NotFoundException('유저 정보가 존재하지 않습니다.');
  }
};

export const GoogleAuthStrategy = oAuthStrategyGenerator(
  'google',
  GStrategy,
  (configService: ConfigService) => ({
    clientID: configService.get('GOOGLE_CLIENT_ID'),
    clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
    callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
    scope: ['email', 'profile'],
  }),
);

export const KaKaoAuthStrategy = oAuthStrategyGenerator(
  'kakao',
  KStrategy,
  (configService: ConfigService) => ({
    clientID: configService.get('KAKAO_CLIENT_ID'),
    callbackURL: configService.get('KAKAO_CALLBACK_URL'),
    clientSecret: configService.get('KAKAO_CLIENT_SECRET'),
  }),
);
