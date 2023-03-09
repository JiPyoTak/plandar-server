import { PlanRepository } from '@/api/plan/plan.repository';
import { UserRepository } from '@/api/user/user.repository';
import { UserService } from '@/api/user/user.service';
import createTestingModule from 'test/utils/createTestingModule';

describe('UserService', () => {
  let planRepository: PlanRepository;
  let userRepository: UserRepository;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await createTestingModule({
      providers: [UserService],
    });

    planRepository = moduleRef.get<PlanRepository>(PlanRepository);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
    userService = moduleRef.get<UserService>(UserService);
  });

  it('Check defining Modules', () => {
    expect(planRepository).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(userService).toBeDefined();
  });
});
