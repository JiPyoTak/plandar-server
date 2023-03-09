import type { INestApplication } from '@nestjs/common';
import * as testRequest from 'supertest';

import { PlanController } from '@/api/plan/plan.controller';
import { PlanService } from '@/api/plan/plan.service';
import type { Plan } from '@/entity/plan.entity';
import type { User } from '@/entity/user.entity';
import createTestingModule from 'test/utils/createTestingModule';

describe('PlanController', () => {
  const mockedPlan: Plan = {
    id: 4,
    planName: 'MyPlan',
    createdAt: new Date(
      '2023-03-07 15:38:06.785155',
    ).toString() as unknown as Date,
    updatedAt: new Date(
      '2023-03-07 15:38:06.785155',
    ).toString() as unknown as Date,
    user: {} as User,
  };

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

  describe('GET /plan/:id', () => {
    it('expect success response with plan', async () => {
      // given
      const id = mockedPlan.id;
      const result: Plan = { ...mockedPlan };
      delete result.user;
      const planServSpy = jest
        .spyOn(planService, 'getPlan')
        .mockResolvedValue(result);

      // when
      const request = testRequest(app.getHttpServer()).get(`/plan/${id}`);

      // then
      return request.expect(200).expect((res) => {
        expect(planServSpy).toHaveBeenCalledWith(id);
        expect(res.body).toEqual(result);
      });
    });
  });

  describe('GET /plan/all', () => {
    it('expect success response with an array of plans', async () => {
      // given
      const result: Plan[] = [{ ...mockedPlan }];
      const planServSpy = jest
        .spyOn(planService, 'getAllPlans')
        .mockResolvedValue(result);

      // when
      const request = testRequest(app.getHttpServer()).get('/plan/all');

      // then
      await request.expect(200).expect(result);
      expect(planServSpy).toHaveBeenCalled();
    });
  });

  describe('POST /plan', () => {
    it('expect success response with creating a new plan', async () => {
      // given
      const newPlan = { ...mockedPlan };
      delete newPlan.id;
      const createdPlan = { ...mockedPlan };
      const planServSpy = jest
        .spyOn(planService, 'createPlan')
        .mockResolvedValue(createdPlan);

      // when
      const request = testRequest(app.getHttpServer())
        .post(`/plan`)
        .send(newPlan);

      // then
      return request.expect(201).expect((res) => {
        expect(planServSpy).toHaveBeenCalledWith(newPlan);
        expect(res.body).toEqual(createdPlan);
      });
    });
  });

  describe('PUT /plan/:id', () => {
    it('expect success response with update an existing plan', async () => {
      // given
      const id = mockedPlan.id;
      const changedOption = { planName: 'YourPlan' };
      const changedPlan = { ...mockedPlan, ...changedOption };
      const planServSpy = jest
        .spyOn(planService, 'updatePlan')
        .mockResolvedValue({ ...changedPlan });

      // when
      const request = testRequest(app.getHttpServer())
        .put(`/plan/${id}`)
        .send(changedOption);

      // then
      return request.expect(200).expect((res) => {
        expect(planServSpy).toHaveBeenCalledWith(id, changedOption);
        expect(res.body).toEqual(changedPlan);
      });
    });
  });

  describe('DELETE /plan/:id', () => {
    it('expect success response with delete an existing plan', async () => {
      // given
      const id = 1;
      const result = true;
      const planServSpy = jest
        .spyOn(planService, 'removePlan')
        .mockResolvedValue(result);

      // when
      const request = testRequest(app.getHttpServer()).delete(`/plan/${id}`);

      // then
      await request.expect(204).expect(() => {
        expect(planServSpy).toHaveBeenCalled();
      });
    });
  });
});
