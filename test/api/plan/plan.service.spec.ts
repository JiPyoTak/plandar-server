import { ConflictException, ForbiddenException } from '@nestjs/common';

import { CategoryService } from '@/api/category/category.service';
import { PlanRepository } from '@/api/plan/plan.repository';
import { PlanService } from '@/api/plan/plan.service';
import { TagService } from '@/api/tag/tag.service';
import {
  PLAN_STUB,
  PLAN_STUB_WITH_COLOR,
  PLAN_TIME_MAX_STUB,
  PLAN_TIME_MIN_STUB,
} from 'test/api/plan/stub';
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

    it(`expect throw error when plan does not exist`, async () => {
      const args = {
        userId: USER_STUB.id,
        planId: PLAN_STUB.id,
      };
      const planRepoSpy = jest
        .spyOn(planRepository, 'findOnlyUserId')
        .mockResolvedValue(null);

      try {
        await planService.checkUserOwnPlan(args);
        expect('not to be execute this').toBe('throw Error');
      } catch (error) {
        expect(planRepoSpy).toHaveBeenCalledTimes(1);
        expect(planRepoSpy).toHaveBeenCalledWith(args.planId);
        expect(error).toBeInstanceOf(ConflictException);
        expect(typeof error.message).toBe('string');
      }
    });

    it(`expect throw error when plan's userId is not same with userId`, async () => {
      const args = {
        userId: USER_STUB.id,
        planId: PLAN_STUB.id,
      };
      const planRepoSpy = jest
        .spyOn(planRepository, 'findOnlyUserId')
        .mockResolvedValue(Infinity);

      try {
        await planService.checkUserOwnPlan(args);
        expect('not to be execute this').toBe('throw Error');
      } catch (error) {
        expect(planRepoSpy).toHaveBeenCalledTimes(1);
        expect(planRepoSpy).toHaveBeenCalledWith(args.planId);
        expect(error).toBeInstanceOf(ForbiddenException);
        expect(typeof error.message).toBe('string');
      }
    });
  });

  describe('checkHasPlan', () => {
    it(`should pass if planId is existing in database`, async () => {
      const planId = PLAN_STUB.id;
      const planRepoSpy = jest
        .spyOn(planRepository, 'exist')
        .mockResolvedValue(true);

      await planService.checkHasPlan(planId);

      expect(planRepoSpy).toHaveBeenCalledTimes(1);
      expect(planRepoSpy).toHaveBeenCalledWith({ where: { id: planId } });
    });

    it(`expect throw conflict error if planId is not existed in database`, async () => {
      const planId = PLAN_STUB.id;
      const planRepoSpy = jest
        .spyOn(planRepository, 'exist')
        .mockResolvedValue(false);

      try {
        await planService.checkHasPlan(planId);
        expect('not to be execute this').toBe('throw Error');
      } catch (error) {
        expect(planRepoSpy).toHaveBeenCalledTimes(1);
        expect(planRepoSpy).toHaveBeenCalledWith({ where: { id: planId } });
        expect(error).toBeInstanceOf(ConflictException);
        expect(typeof error.message).toBe('string');
      }
    });
  });

  describe('getPlans', () => {
    it('should return plans between timemin, timemax query', async () => {
      const args = {
        userId: USER_STUB.id,
        timeMin: PLAN_TIME_MIN_STUB,
        timeMax: PLAN_TIME_MAX_STUB,
      };
      const result = [{ ...PLAN_STUB_WITH_COLOR }];
      const planRepoSpy = jest
        .spyOn(planRepository, 'findPlansBetweenDate')
        .mockResolvedValue([{ ...PLAN_STUB }]);

      const plans = await planService.getPlans(args);

      expect(planRepoSpy).toHaveBeenCalledTimes(1);
      expect(planRepoSpy).toHaveBeenCalledWith(args);
      expect(plans).toEqual(result);
    });
  });
});
