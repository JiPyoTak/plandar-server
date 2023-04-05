import { CategoryService } from '@/api/category/category.service';
import { PlanRepository } from '@/api/plan/plan.repository';
import { PlanService } from '@/api/plan/plan.service';
import { TagService } from '@/api/tag/tag.service';
import { PLAN_STUB } from 'test/api/plan/stub';
import { USER_STUB } from 'test/api/user/stub';
import createTestingModule from 'test/utils/create-testing-module';

describe('PlanService', () => {
  let planRepository: PlanRepository;
  let planService: PlanService;
  let categoryService: CategoryService;
  let tagService: TagService;

  beforeEach(async () => {
    const moduleRef = await createTestingModule({
      providers: [PlanService, CategoryService, TagService],
    });

    planRepository = moduleRef.get<PlanRepository>(PlanRepository);
    categoryService = moduleRef.get<CategoryService>(CategoryService);
    tagService = moduleRef.get<TagService>(TagService);
    planService = moduleRef.get<PlanService>(PlanService);
  });

  it('Check defining Modules', () => {
    expect(planRepository).toBeDefined();
    expect(categoryService).toBeDefined();
    expect(tagService).toBeDefined();
    expect(planService).toBeDefined();
  });

  describe('checkUserOwnPlan', () => {
    it(`should pass - userId & plan's userId are same`, async () => {
      const args = {
        userId: USER_STUB.id,
        planId: PLAN_STUB.id,
      };
      const planRepoSpy = jest
        .spyOn(planRepository, 'findOnlyUserId')
        .mockResolvedValue(args.userId);

      await planService.checkUserOwnPlan(args);

      expect(planRepoSpy).toHaveBeenCalledTimes(1);
      expect(planRepoSpy).toHaveBeenCalledWith(args.planId);
    });
  });
});
