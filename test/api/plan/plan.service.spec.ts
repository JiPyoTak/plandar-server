import { PlanRepository } from '@/api/plan/plan.repository';
import { PlanService } from '@/api/plan/plan.service';
import { Plan } from '@/entity/plan.entity';
import createTestingModule from 'test/utils/createTestingModule';

import { MOCK_PLAN } from './mock';

describe('PlanService', () => {
  const mockedPlan = Object.assign({}, MOCK_PLAN);

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

  describe('getPlan', () => {
    it('should return plan', async () => {
      // given
      const id = mockedPlan.id;
      const result: Plan = { ...mockedPlan };
      const planRepoSpy = jest
        .spyOn(planRepository, 'findById')
        .mockResolvedValue(result);

      // when
      const plan = await planService.getPlan(id);

      // then
      expect(planRepoSpy).toHaveBeenCalledWith(id);
      expect(plan).toEqual(result);
    });
  });

  describe('getAllPlans', () => {
    it('should return an array of plans', async () => {
      // given
      const result: Plan[] = [mockedPlan];
      const planRepoSpy = jest
        .spyOn(planRepository, 'find')
        .mockResolvedValue(result);

      // when
      const plans = await planService.getAllPlans();

      // then
      expect(planRepoSpy).toHaveBeenCalled();
      expect(plans).toEqual(result);
    });
  });

  describe('createPlan', () => {
    it('should create a new plan', async () => {
      // given
      const newPlan = { ...mockedPlan, id: undefined };
      const createdPlan = { ...mockedPlan };
      const planRepoSpy = jest
        .spyOn(planRepository, 'createPlan')
        .mockResolvedValue(createdPlan);

      // when
      const plan = await planService.createPlan(newPlan);

      // then
      expect(planRepoSpy).toHaveBeenCalledWith(newPlan);
      expect(plan).toEqual(createdPlan);
    });
  });

  describe('update', () => {
    it('should update an existing plan', async () => {
      // given
      const id = mockedPlan.id;
      const changedOption = { title: 'YourPlan' };
      const changedPlan = { ...mockedPlan, ...changedOption };
      const planRepoSpy = jest
        .spyOn(planRepository, 'updatePlan')
        .mockResolvedValue({ ...changedPlan });

      // when
      const plan = await planService.updatePlan(id, changedOption);

      // then
      expect(planRepoSpy).toHaveBeenCalledWith(id, changedOption);
      expect(plan).toEqual(changedPlan);
    });
  });

  describe('remove', () => {
    it('should delete an existing plan', async () => {
      // given
      const id = 1;
      const result = true;
      const planRepoSpy = jest
        .spyOn(planRepository, 'removePlan')
        .mockResolvedValue(result);

      // when
      const removed = await planService.removePlan(id);

      // then
      expect(planRepoSpy).toHaveBeenCalled();
      expect(removed).toEqual(result);
    });
  });
});
