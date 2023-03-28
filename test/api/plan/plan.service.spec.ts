import { PlanRepository } from '@/api/plan/plan.repository';
import { PlanService } from '@/api/plan/plan.service';
import createTestingModule from 'test/utils/createTestingModule';

describe('PlanService', () => {
  let planRepository: PlanRepository;
  let planService: PlanService;

  beforeEach(async () => {
    const moduleRef = await createTestingModule({
      providers: [PlanService],
    });

    planRepository = moduleRef.get<PlanRepository>(PlanRepository);
    planService = moduleRef.get<PlanService>(PlanService);
  });

  it('Check defining Modules', () => {
    expect(planRepository).toBeDefined();
    expect(planService).toBeDefined();
  });
});
