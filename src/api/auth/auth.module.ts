import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ENV_PROVIDER } from '@/utils/constants';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ConfigService,
    {
      provide: ENV_PROVIDER,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        JWT_SECRET_KEY: configService.get('JWT_SECRET_KEY'),
        ACCESS_HEADER: configService.get('ACCESS_HEADER'),
        REFRESH_HEADER: configService.get('REFRESH_HEADER'),
        ACCESS_EXPIRES: configService.get('ACCESS_EXPIRES'),
        REFRESH_EXPIRES: configService.get('REFRESH_EXPIRES'),
        COOKIE_MAX_AGE: configService.get('COOKIE_MAX_AGE'),
      }),
    },
  ],
})
export class AuthModule {}
