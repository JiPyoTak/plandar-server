import { Test } from '@nestjs/testing';

import { UserController } from '@/api/user/user.controller';
import { UserService } from '@/api/user/user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
    })
      .useMocker((token) => {
        if (token === UserService) {
          return { createUser: jest.fn().mockResolvedValue({}) };
        }
      })
      .compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = await moduleRef.resolve(UserService);
  });

  it('Check defining Modules', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });
});
