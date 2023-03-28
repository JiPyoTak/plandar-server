import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

import { User } from '@/decorators/user.decorator';
import { User as UserEntity } from '@/entity/user.entity';
import { TokenType } from '@/types';

import { AuthService } from './auth.service';
import { GoogleAuthGuard, KakaoAuthGuard } from './guards/oauth.guard';

@Controller('auth')
export class AuthController {
  private readonly CLIENT_REDIRECT_URL: string;

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    this.CLIENT_REDIRECT_URL = configService.get('CLIENT_REDIRECT_URL');
  }

  async loginCallback(user: UserEntity, res: Response) {
    const [accessToken, refreshToken] = await this.authService.login(user);

    this.authService.registerTokenInCookie(TokenType.ACCESS, accessToken, res);
    this.authService.registerTokenInCookie(
      TokenType.REFRESH,
      refreshToken,
      res,
    );

    res.redirect(this.CLIENT_REDIRECT_URL);
  }

  @Get('/')
  async get() {
    return 'auth';
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google')
  async googleLogin() {
    return 'google auth login';
  }

  @UseGuards(KakaoAuthGuard)
  @Get('/kakao')
  async kakaoLogin() {
    return 'kakao auth login';
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google/callback')
  async googleLoginCallback(@User() user: UserEntity, @Res() res: Response) {
    return this.loginCallback(user, res);
  }

  @UseGuards(KakaoAuthGuard)
  @Get('/kakao/callback')
  async kakaoLoginCallback(@User() user: UserEntity, @Res() res: Response) {
    return this.loginCallback(user, res);
  }
}
