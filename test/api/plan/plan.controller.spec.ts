import type { INestApplication } from '@nestjs/common';

import { PlanController } from '@/api/plan/plan.controller';
import { PlanService } from '@/api/plan/plan.service';
import createTestingModule from 'test/utils/create-testing-module';

describe('PlanController', () => {
  let app: INestApplication;
  let planService: PlanService;

  beforeEach(async () => {
    const moduleRef = await createTestingModule({
      controllers: [PlanController],
    });

    app = moduleRef.createNestApplication();
    await app.init();
    planService = await app.resolve<PlanService>(PlanService);
  });

  it('Check defining Modules', () => {
    expect(planService).toBeDefined();
  });
});
