import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as testRequest from 'supertest';

import { AuthController } from '@/api/auth/auth.controller';
import { AuthService } from '@/api/auth/auth.service';
import { HttpExceptionFilter } from '@/common/filters';
import { GoogleAuthGuard } from '@/common/guards';
import { SuccessInterceptor } from '@/common/interceptors';
import { USER_STUB } from 'test/api/user/stub';
import { createMockAuthGuard } from 'test/utils/create-mock-jwt-auth-guard';
import createTestingModule from 'test/utils/create-testing-module';

import { TOKEN_STUB } from './stub';

describe('AuthController', () => {
  const mockUser = Object.assign({}, USER_STUB);
  const mockoAuthGuard = createMockAuthGuard(mockUser);

  let app: INestApplication;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await createTestingModule(
      { controllers: [AuthController] },
      undefined,
      (builder) => {
        builder.overrideGuard(GoogleAuthGuard).useValue(mockoAuthGuard);
      },
    );

    app = moduleRef.createNestApplication();

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new SuccessInterceptor());
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();

    authService = await app.resolve<AuthService>(AuthService);
  });

  it('Check defining Modules', () => {
    expect(authService).toBeDefined();
  });

  describe('GET /auth/google/callback', () => {
    it('expects to be called once for login and twice for register.', async () => {
      const authSpyOnByLogin = jest
        .spyOn(authService, 'login')
        .mockResolvedValue([TOKEN_STUB, TOKEN_STUB]);

      const authSpyOnByRegister = jest
        .spyOn(authService, 'registerTokenInCookie')
        .mockReturnThis();

      await testRequest(app.getHttpServer())
        .get(`/auth/google/callback`)
        .expect(302);

      expect(authSpyOnByLogin).toBeCalledTimes(1);
      expect(authSpyOnByRegister).toBeCalledTimes(2);
    });
  });

  describe('POST /refresh', () => {
    it('expects to be called once for login and twice for register.', async () => {
      const authSpyOnByLogin = jest
        .spyOn(authService, 'login')
        .mockResolvedValue([TOKEN_STUB, TOKEN_STUB]);

      const authSpyOnByRegister = jest
        .spyOn(authService, 'registerTokenInCookie')
        .mockReturnThis();

      const request = await testRequest(app.getHttpServer())
        .post(`/auth/refresh`)
        .expect(201);

      expect(authSpyOnByLogin).toBeCalledTimes(1);
      expect(authSpyOnByRegister).toBeCalledTimes(1);
      expect(request.body).toEqual({ success: true });
    });
  });
});
