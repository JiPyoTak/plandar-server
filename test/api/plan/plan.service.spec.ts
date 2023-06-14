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
import { omitKey } from 'test/utils/omit-key';

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
      const result = [{ ...PLAN_STUB_WITH_COLOR }].map(({ tags, ...rest }) => ({
        ...rest,
        tags: tags.map(({ name }) => name),
      }));
      const planRepoSpy = jest
        .spyOn(planRepository, 'findPlansBetweenDate')
        .mockResolvedValue([{ ...PLAN_STUB }]);

      const plans = await planService.getPlans(args);

      expect(planRepoSpy).toHaveBeenCalledTimes(1);
      expect(planRepoSpy).toHaveBeenCalledWith(args);
      expect(plans).toEqual(result);
    });
  });

  describe('createPlan', () => {
    it('should createPlan without category & tags and return new', async () => {
      const newPlanData = omitKey(
        {
          ...PLAN_STUB,
          userId: USER_STUB.id,
        },
        ['categoryId', 'tags'],
      );
      const result = {
        ...PLAN_STUB_WITH_COLOR,
        tags: [],
        categoryId: null,
      };
      const categoryServSpy = jest
        .spyOn(categoryService, 'checkUserOwnCategory')
        .mockRejectedValue(
          new Error(
            'categoryService - checkUserOwnCategory : 실행되어선 안되는 함수입니다.',
          ),
        );
      const tagServSpy = jest
        .spyOn(tagService, 'createTag')
        .mockRejectedValue(
          new Error('tagService - createTag : 실행되어선 안되는 함수입니다.'),
        );
      const planRepoSpy = jest
        .spyOn(planRepository, 'createPlan')
        .mockResolvedValue({ ...result, color: PLAN_STUB.color });

      const plan = await planService.createPlan(newPlanData);

      expect(categoryServSpy).toHaveBeenCalledTimes(0);
      expect(tagServSpy).toHaveBeenCalledTimes(0);
      expect(planRepoSpy).toHaveBeenCalledTimes(1);
      expect(planRepoSpy).toHaveBeenCalledWith({
        ...newPlanData,
        tags: [],
      });
      expect(plan).toEqual(result);
    });

    it('should createPlan with category & tags and return new', async () => {
      const newPlanData = {
        ...PLAN_STUB,
        tags: PLAN_STUB.tags.map(({ name }) => name),
        userId: USER_STUB.id,
      };
      const { tags, ...rest } = PLAN_STUB_WITH_COLOR;
      const result = { ...rest, tags: tags.map(({ name }) => name) };
      const categoryServSpy = jest
        .spyOn(categoryService, 'checkUserOwnCategory')
        .mockResolvedValue(undefined);
      const tagServSpy = jest
        .spyOn(tagService, 'createTag')
        .mockImplementation(async ({ tagName }) => ({
          ...PLAN_STUB.tags.find(({ name }) => name === tagName),
        }));
      const planRepoSpy = jest
        .spyOn(planRepository, 'createPlan')
        .mockResolvedValue({ ...PLAN_STUB });

      const plan = await planService.createPlan(newPlanData);

      expect(categoryServSpy).toHaveBeenCalledTimes(1);
      expect(categoryServSpy).toHaveBeenCalledWith({
        categoryId: newPlanData.categoryId,
        userId: newPlanData.userId,
      });
      expect(tagServSpy).toHaveBeenCalledTimes(PLAN_STUB.tags.length);
      newPlanData.tags.forEach((tagName) => {
        expect(tagServSpy).toHaveBeenCalledWith({
          tagName,
          userId: newPlanData.userId,
        });
      });
      expect(planRepoSpy).toHaveBeenCalledTimes(1);
      expect(planRepoSpy).toHaveBeenCalledWith({
        ...result,
        tags,
        color: PLAN_STUB.color,
        userId: newPlanData.userId,
      });
      expect(plan).toEqual(result);
    });
  });

  describe('updatePlan', () => {
    it('should update plan without categoryId & tags and return', async () => {
      const planData = omitKey(
        {
          ...PLAN_STUB,
          tags: [],
          userId: USER_STUB.id,
        },
        ['categoryId'],
      );
      const result = { ...PLAN_STUB_WITH_COLOR, tags: [], categoryId: null };
      const planCheckUserOwnPlanSpy = jest
        .spyOn(planService, 'checkUserOwnPlan')
        .mockResolvedValue(undefined);
      const categoryServSpy = jest
        .spyOn(categoryService, 'checkUserOwnCategory')
        .mockRejectedValue(
          new Error(
            'categoryService - checkUserOwnCategory : 실행되어선 안되는 함수입니다.',
          ),
        );
      const tagServSpy = jest
        .spyOn(tagService, 'createTag')
        .mockRejectedValue(
          new Error('tagService - createTag : 실행되어선 안되는 함수입니다.'),
        );
      const planRepoSpy = jest
        .spyOn(planRepository, 'updatePlan')
        .mockResolvedValue({ ...result, color: PLAN_STUB.color });

      const plans = await planService.updatePlan(planData);

      expect(planCheckUserOwnPlanSpy).toHaveBeenCalledTimes(1);
      expect(categoryServSpy).toHaveBeenCalledTimes(0);
      expect(tagServSpy).toHaveBeenCalledTimes(0);
      expect(planRepoSpy).toHaveBeenCalledTimes(1);
      expect(planRepoSpy).toHaveBeenCalledWith({
        ...planData,
      });
      expect(plans).toEqual(result);
    });

    it('should update plan with categoryId & tags and return', async () => {
      const planData = {
        ...PLAN_STUB,
        tags: PLAN_STUB.tags.map(({ name }) => name),
        userId: USER_STUB.id,
      };
      const { tags, ...rest } = PLAN_STUB_WITH_COLOR;
      const result = { ...rest, tags: tags.map(({ name }) => name) };
      const planCheckUserOwnPlanSpy = jest
        .spyOn(planService, 'checkUserOwnPlan')
        .mockResolvedValue(undefined);
      const categoryServSpy = jest
        .spyOn(categoryService, 'checkUserOwnCategory')
        .mockResolvedValue(undefined);
      const tagServSpy = jest
        .spyOn(tagService, 'createTag')
        .mockImplementation(async ({ tagName }) => ({
          ...PLAN_STUB.tags.find(({ name }) => name === tagName),
        }));
      const planRepoSpy = jest
        .spyOn(planRepository, 'updatePlan')
        .mockResolvedValue({ ...PLAN_STUB });

      const plans = await planService.updatePlan(planData);

      expect(planCheckUserOwnPlanSpy).toHaveBeenCalledTimes(1);
      expect(categoryServSpy).toHaveBeenCalledTimes(1);
      expect(categoryServSpy).toHaveBeenCalledWith({
        categoryId: planData.categoryId,
        userId: planData.userId,
      });
      expect(tagServSpy).toHaveBeenCalledTimes(planData.tags.length);
      planData.tags.forEach((tagName) => {
        expect(tagServSpy).toHaveBeenCalledWith({
          tagName,
          userId: planData.userId,
        });
      });
      expect(planRepoSpy).toHaveBeenCalledTimes(1);
      expect(planRepoSpy).toHaveBeenCalledWith({
        ...result,
        tags,
        color: PLAN_STUB.color,
        userId: planData.userId,
      });
      expect(plans).toEqual(result);
    });
  });

  describe('deletePlan', () => {
    it('should delete plan and return', async () => {
      const args = {
        planId: PLAN_STUB.id,
        userId: USER_STUB.id,
      };
      const { tags, ...rest } = PLAN_STUB_WITH_COLOR;
      const result = { ...rest, tags: tags.map(({ name }) => name) };
      const planCheckUserOwnPlanSpy = jest
        .spyOn(planService, 'checkUserOwnPlan')
        .mockResolvedValue(undefined);
      const planFindById = jest
        .spyOn(planRepository, 'findPlanById')
        .mockResolvedValue({ ...PLAN_STUB });
      const planRepoSpy = jest
        .spyOn(planRepository, 'deletePlan')
        .mockResolvedValue(true);
      const tagServSpy = jest
        .spyOn(tagService, 'deleteTagIfNotReferenced')
        .mockImplementation(async ({ tagId }) => ({
          ...PLAN_STUB.tags.find(({ id }) => id === tagId),
        }));

      const plan = await planService.deletePlan(args);

      expect(planCheckUserOwnPlanSpy).toHaveBeenCalledTimes(1);
      expect(planCheckUserOwnPlanSpy).toHaveBeenCalledWith(args);
      expect(planFindById).toHaveBeenCalledTimes(1);
      expect(planFindById).toHaveBeenCalledWith(args.planId);
      expect(planRepoSpy).toHaveBeenCalledTimes(1);
      expect(planRepoSpy).toHaveBeenCalledWith(args.planId);
      expect(tagServSpy).toHaveBeenCalledTimes(PLAN_STUB.tags.length);
      PLAN_STUB.tags.forEach(({ id: tagId }) => {
        expect(tagServSpy).toHaveBeenCalledWith({ tagId, userId: args.userId });
      });
      expect(plan).toEqual(result);
    });
  });
});
