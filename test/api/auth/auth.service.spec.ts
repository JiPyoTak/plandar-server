import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { AuthService } from '@/api/auth/auth.service';
import { UserService } from '@/api/user/user.service';
import { User } from '@/entity/user.entity';
import { TokenType } from '@/types';
import { USER_STUB } from 'test/api/user/mock';
import createTestingModule from 'test/utils/createTestingModule';

import { MockConfigService, RESPONSE_STUB, TOKEN_STUB } from './mock';

describe('AuthService', () => {
  const mockUser = Object.assign({}, USER_STUB);

  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleRef = await createTestingModule({
      providers: [
        AuthService,
        UserService,
        JwtService,
        {
          provide: ConfigService,
          useClass: MockConfigService,
        },
      ],
    });

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
        .mockReturnValue(TOKEN_STUB);

      const [accessToken, refreshToken] = await authService.login(user);

      expect(authServBySignature).toBeCalledTimes(2);
      expect(accessToken).toEqual(TOKEN_STUB);
      expect(refreshToken).toEqual(TOKEN_STUB);
    });
  });

  describe('registerTokenInCookie', () => {
    it('should return true', async () => {
      const token_type = TokenType.ACCESS;

      await authService.registerTokenInCookie(
        token_type,
        TOKEN_STUB,
        RESPONSE_STUB,
      );

      expect(RESPONSE_STUB.cookie).toBeCalledTimes(1);
    });
  });
  describe('clearCookie', () => {
    it('should return true', async () => {
      await authService.clearCookie(RESPONSE_STUB);

      expect(RESPONSE_STUB.clearCookie).toBeCalledTimes(2);
    });
  });
});
