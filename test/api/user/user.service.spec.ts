import { BadRequestException } from '@nestjs/common';

import { UserRepository } from '@/api/user/user.repository';
import { UserService } from '@/api/user/user.service';
import createTestingModule from 'test/utils/createTestingModule';

import { USER_MOCK } from './mock';

describe('UserService', () => {
  const mockUser = Object.assign({}, USER_MOCK);

  let userRepository: UserRepository;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await createTestingModule({
      providers: [UserService],
    });

    userRepository = moduleRef.get<UserRepository>(UserRepository);
    userService = moduleRef.get<UserService>(UserService);
  });

  it('Check defining Modules', () => {
    expect(userRepository).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('getUser', () => {
    it('should return user', async () => {
      // given
      const id = mockUser.id;
      const result = { ...mockUser };
      const userRepoSpyByGetUserInfo = jest
        .spyOn(userRepository, 'getUserById')
        .mockResolvedValue(result);

      // when
      const user = await userService.getUser(id);

      // then
      expect(userRepoSpyByGetUserInfo).toHaveBeenCalledWith(id);
      expect(user).toEqual(result);
    });

    it('Should return an error if the user does not exist.', async () => {
      try {
        // given
        const id = mockUser.id;
        jest.spyOn(userRepository, 'getUserById').mockResolvedValue(null);

        // when
        await userService.getUser(id);
      } catch (error) {
        // then
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('createUser', () => {
    it('should return new user', async () => {
      // given
      const newUser = { ...mockUser, id: undefined };
      const result = { ...mockUser };

      const userRepoSpyByfindeOne = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(null);

      const userRepoSpyByCreateUser = jest
        .spyOn(userRepository, 'createUser')
        .mockResolvedValue(result);

      // when
      const user = await userService.createUser(newUser);

      // then
      expect(userRepoSpyByCreateUser).toHaveBeenCalledWith(newUser);
      expect(userRepoSpyByfindeOne).toHaveBeenCalledWith({
        where: { email: mockUser.email },
      });
      expect(user).toEqual(result);
    });

    it('Should return an error when the user already exists', async () => {
      try {
        // given
        const newUser = { ...mockUser, id: undefined };

        jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);

        // when
        await userService.createUser(newUser);
      } catch (error) {
        // then
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
