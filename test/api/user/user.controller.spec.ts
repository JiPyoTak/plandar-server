import {
  INestApplication,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import * as testRequest from 'supertest';

import { UserController } from '@/api/user/user.controller';
import { UserService } from '@/api/user/user.service';
import { HttpExceptionFilter } from '@/common/filters';
import { SuccessInterceptor } from '@/common/interceptors';
import createTestingModule from 'test/utils/create-testing-module';

import { GET_USER_ERROR_STUB, USER_STUB } from './stub';

describe('UserController', () => {
  const mockUser = Object.assign({}, USER_STUB);

  let app: INestApplication;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await createTestingModule({
      controllers: [UserController],
    });

    app = moduleRef.createNestApplication();

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new SuccessInterceptor());
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();

    userService = await app.resolve<UserService>(UserService);
  });

  it('Check defining Modules', () => {
    expect(userService).toBeDefined();
  });

  describe('GET /user', () => {
    it('expect success response with user', async () => {
      // given
      const id = mockUser.id;
      const user = { ...mockUser };
      const result = {
        success: true,
        data: user,
      };
      const userServSpy = jest
        .spyOn(userService, 'getUser')
        .mockResolvedValue(user);

      // when
      const request = await testRequest(app.getHttpServer())
        .get(`/user`)
        .expect(200);

      // then
      expect(userServSpy).toHaveBeenCalledWith(id);
      expect(request.body).toEqual(result);
    });

    it('expect failure response with user', async () => {
      // given
      const id = mockUser.id;
      const userServSpy = jest
        .spyOn(userService, 'getUser')
        .mockRejectedValue(new NotFoundException('존재하지 않는 유저입니다.'));

      // when
      const request = await testRequest(app.getHttpServer())
        .get(`/user`)
        .expect(404);

      const result = {
        ...GET_USER_ERROR_STUB,
        timestamp: request.body.timestamp,
      };

      expect(userServSpy).toHaveBeenCalledWith(id);
      expect(request.body).toEqual(result);
    });
  });
});
