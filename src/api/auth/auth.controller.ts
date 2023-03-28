import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

import { Public } from '@/decorators/skip-auth.decorator';
import { User } from '@/decorators/user.decorator';
import { User as UserEntity } from '@/entity/user.entity';
import { JwtTokenType } from '@/types';

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

    this.authService.registerTokenInCookie(
      JwtTokenType.ACCESS,
      accessToken,
      res,
    );
    this.authService.registerTokenInCookie(
      JwtTokenType.REFRESH,
      refreshToken,
      res,
    );
  }

  @Public()
  @Get('/')
  async get() {
    return 'auth';
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('/google')
  async googleLogin() {
    return 'google auth login';
  }

  @Public()
  @UseGuards(KakaoAuthGuard)
  @Get('/kakao')
  async kakaoLogin() {
    return 'kakao auth login';
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('/google/callback')
  async googleLoginCallback(@User() user: UserEntity, @Res() res: Response) {
    await this.loginCallback(user, res);

    return res.redirect(this.CLIENT_REDIRECT_URL);
  }

  @Public()
  @UseGuards(KakaoAuthGuard)
  @Get('/kakao/callback')
  async kakaoLoginCallback(@User() user: UserEntity, @Res() res: Response) {
    await this.loginCallback(user, res);

    return res.redirect(this.CLIENT_REDIRECT_URL);
  }

  @Post('/refresh')
  async refresh(
    @User() user: UserEntity,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.loginCallback(user, res);
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this.authService.clearCookie(res);
  }
}
