import { Test } from '@nestjs/testing';

import { PlanRepository } from '@/api/plan/plan.repository';
import { UserRepository } from '@/api/user/user.repository';
import { UserService } from '@/api/user/user.service';
import { TransactionManager } from '@/common/transaction.manager';

describe('UserService', () => {
  let planRepository: PlanRepository;
  let userRepository: UserRepository;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserService],
    })
      .useMocker((token) => {
        if (token === UserRepository) {
          return { createUser: jest.fn().mockResolvedValue({}) };
        }
        if (token === PlanRepository) {
          return { createPlan: jest.fn().mockResolvedValue({}) };
        }
        if (token === TransactionManager) {
          return { getEntityManager: jest.fn().mockResolvedValue({}) };
        }
      })
      .compile();

    planRepository = moduleRef.get<PlanRepository>(PlanRepository);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
    userService = await moduleRef.resolve(UserService);
  });

  it('Check defining Modules', () => {
    expect(planRepository).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(userService).toBeDefined();
  });
});
