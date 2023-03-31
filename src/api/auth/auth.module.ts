import { Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserRepository } from '@/api/user/user.repository';
import { UserService } from '@/api/user/user.service';
import { TypeOrmExModule } from '@/common/modules';
import {
  GoogleAuthStrategy,
  KaKaoAuthStrategy,
  JwtStrategy,
} from '@/common/strategies';
import { ENV_PROVIDER } from '@/utils/constants';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const CustomConfigProvider: Provider = {
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
};

@Module({
  imports: [
    PassportModule,
    TypeOrmExModule.forFeature([UserRepository]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    ConfigService,
    GoogleAuthStrategy,
    KaKaoAuthStrategy,
    JwtStrategy,
    CustomConfigProvider,
  ],
})
export class AuthModule {}
