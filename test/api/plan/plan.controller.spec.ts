import { Test } from '@nestjs/testing';

import { PlanController } from '@/api/plan/plan.controller';
import { PlanService } from '@/api/plan/plan.service';

describe('PlanController', () => {
  let planController: PlanController;
  let planService: PlanService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PlanController],
    })
      .useMocker((token) => {
        if (token === PlanService) {
          return { createPlan: jest.fn().mockResolvedValue({}) };
        }
      })
      .compile();

    planController = moduleRef.get<PlanController>(PlanController);
    planService = await moduleRef.resolve(PlanService);
  });

  it('Check defining Modules', () => {
    expect(planController).toBeDefined();
    expect(planService).toBeDefined();
  });
});
