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
      const userRepoSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(result);

      // when
      const user = await userService.getUser(id);

      // then
      expect(userRepoSpy).toHaveBeenCalledWith(id);
      expect(user).toEqual(result);
    });
  });

  describe('createUser', () => {
    it('should return new user', async () => {
      // given
      const newUser = { ...mockUser, id: undefined };
      const result = { ...mockUser };
      const userRepoSpy = jest
        .spyOn(userRepository, 'createUser')
        .mockResolvedValue(result);

      // when
      const user = await userService.createUser(newUser);

      // then
      expect(userRepoSpy).toHaveBeenCalledWith(newUser);
      expect(user).toEqual(result);
    });
  });
});
