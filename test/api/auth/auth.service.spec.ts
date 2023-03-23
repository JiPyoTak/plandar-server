import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Response } from 'express';

import { AuthService } from '@/api/auth/auth.service';
import { UserService } from '@/api/user/user.service';
import { User } from '@/entity/user.entity';
import { USER_STUB } from 'test/api/user/mock';
import createTestingModule from 'test/utils/createTestingModule';

import { TOKEN_STUB } from './mock';

describe('AuthService', () => {
  const mockUser = Object.assign({}, USER_STUB);

  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(async () => {
    const providers: Provider[] = [
      AuthService,
      UserService,
      JwtService,
      {
        provide: ConfigService,
        useValue: {
          JWT_SECRET_KEY: 'test',
          ACCESS_HEADER: 'access',
          REFRESH_HEADER: 'refresh',
          ACCESS_EXPIRES: '1h',
          REFRESH_EXPIRES: '14d',
          COOKIE_MAX_AGE: 1000 * 60 * 60 * 24 * 14,
        },
      },
    ];

    const moduleRef = await createTestingModule({ providers });

    authService = moduleRef.get<AuthService>(AuthService);
    userService = moduleRef.get<UserService>(UserService);
    jwtService = moduleRef.get<JwtService>(JwtService);
    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  it('Check defining Modules', () => {
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(configService).toBeDefined();
  });

  describe('signature', () => {
    it('should return JWT', async () => {
      const user: User = { ...mockUser };
      const jwtSignOption: JwtSignOptions = { expiresIn: '60s' };

      const jwtServBySign = jest
        .spyOn(jwtService, 'sign')
        .mockReturnValue(TOKEN_STUB);

      const token = authService.signature(user, jwtSignOption);

      expect(jwtServBySign).toHaveBeenCalledWith(user, jwtSignOption);
      expect(token).toEqual(TOKEN_STUB);
    });
  });

  describe('login', () => {
    it('should return access token and refresh token.', async () => {
      const user: User = { ...mockUser };

      const authServBySignature = jest
        .spyOn(authService, 'signature')
        .mockResolvedValue(TOKEN_STUB);

      const [accessToken, refreshToken] = await authService.login(user);

      expect(authServBySignature).toHaveBeenCalledWith(user);
      expect(authServBySignature).toBeCalledTimes(2);
      expect(accessToken).toEqual(TOKEN_STUB);
      expect(refreshToken).toEqual(TOKEN_STUB);
    });
  });

  describe('registerTokenInCookie', () => {
    it('should return true', async () => {
      const response = {
        cookie: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const token_type = 'access';

      await authService.registerTokenInCookie(token_type, TOKEN_STUB, response);

      expect(response.cookie).toBeCalledTimes(1);
    });
  });
  describe('clearCookie', () => {
    it('should return true', async () => {
      const response = {
        cookie: jest.fn().mockReturnThis(),
        clearCookie: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await authService.clearCookie(response);

      expect(response.clearCookie).toBeCalledTimes(2);
    });
  });
});
