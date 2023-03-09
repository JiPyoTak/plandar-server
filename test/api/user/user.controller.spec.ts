import type { INestApplication } from '@nestjs/common';

import { UserController } from '@/api/user/user.controller';
import { UserService } from '@/api/user/user.service';
import createTestingModule from 'test/utils/createTestingModule';

describe('UserController', () => {
  let app: INestApplication;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await createTestingModule({
      controllers: [UserController],
    });

    userService = moduleRef.get<UserService>(UserService);
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('Check defining Modules', () => {
    expect(userService).toBeDefined();
  });
});
