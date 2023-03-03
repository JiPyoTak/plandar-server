import { Test } from '@nestjs/testing';

import { PlanRepository } from '@/api/plan/plan.repository';
import { PlanService } from '@/api/plan/plan.service';
import { TransactionManager } from '@/common/transaction.manager';

describe('PlanService', () => {
  let planRepository: PlanRepository;
  let planService: PlanService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PlanService],
    })
      .useMocker((token) => {
        if (token === PlanRepository) {
          return { createPlan: jest.fn().mockResolvedValue({}) };
        }
        if (token === TransactionManager) {
          return { getEntityManager: jest.fn().mockResolvedValue({}) };
        }
      })
      .compile();

    planRepository = moduleRef.get<PlanRepository>(PlanRepository);
    planService = moduleRef.get<PlanService>(PlanService);
  });

  it('Check defining Modules', () => {
    expect(planRepository).toBeDefined();
    expect(planService).toBeDefined();
  });
});
