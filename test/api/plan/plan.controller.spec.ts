import {
  INestApplication,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common';
import * as testRequest from 'supertest';

import { PlanController } from '@/api/plan/plan.controller';
import { PlanService } from '@/api/plan/plan.service';
import { HttpExceptionFilter } from '@/common/filters';
import { SuccessInterceptor } from '@/common/interceptors';
import { getBetweenDate } from '@/utils/getBetweenDate';
import createTestingModule from 'test/utils/create-testing-module';
import { omitKey } from 'test/utils/omit-key';

import { PLAN_STUB, PLAN_TIME_MAX_STUB, PLAN_TIME_MIN_STUB } from './stub';
import { USER_STUB } from '../user/stub';

describe('PlanController', () => {
  let app: INestApplication;
  let planService: PlanService;

  beforeEach(async () => {
    const moduleRef = await createTestingModule({
      controllers: [PlanController],
    });

    app = moduleRef.createNestApplication();

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new SuccessInterceptor());
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );

    await app.init();
    planService = await app.resolve<PlanService>(PlanService);
  });

  it('Check defining Modules', () => {
    expect(planService).toBeDefined();
  });

  describe('GET /plan', () => {
    it('expect success response - plans', async () => {
      const date = new Date();
      const [timeMin, timeMax] = getBetweenDate(date);

      const plans = [{ ...PLAN_STUB }];
      const planServSpy = jest
        .spyOn(planService, 'getPlans')
        .mockResolvedValue(plans);
      const result = {
        success: true,
        data: plans,
      };

      const request = await testRequest(app.getHttpServer())
        .get(`/plan`)
        .query({ date: timeMin })
        .expect(200);

      expect(planServSpy).toHaveBeenCalledWith({
        timeMin,
        timeMax,
        userId: USER_STUB.id,
      });
      expect(request.body).toEqual(result);
    });

    it('expect failure response with invalid date query (Empty)', async () => {
      const planServSpy = jest
        .spyOn(planService, 'getPlans')
        .mockRejectedValue(
          new InternalServerErrorException(
            'Service의 getPlans가 실행되어선 안됩니다.',
          ),
        );
      const result = {
        error: 'Bad Request',
        statusCode: 400,
        success: false,
        message: 'Validation failed (Date string is expected)',
      };

      const request = await testRequest(app.getHttpServer())
        .get(`/plan`)
        .query({})
        .expect(400);

      expect(planServSpy).toHaveBeenCalledTimes(0);
      expect(request.body).toEqual({
        ...result,
        timestamp: request.body.timestamp,
      });
    });
  });

  describe('GET /plan/between', () => {
    it('expect success response - plans (Query with between time)', async () => {
      const timeMin = PLAN_TIME_MIN_STUB;
      const timeMax = PLAN_TIME_MAX_STUB;
      const plans = [{ ...PLAN_STUB }];
      const planServSpy = jest
        .spyOn(planService, 'getPlans')
        .mockResolvedValue(plans);
      const result = {
        success: true,
        data: plans,
      };

      const request = await testRequest(app.getHttpServer())
        .get(`/plan/between`)
        .query({ timemin: timeMin, timemax: timeMax })
        .expect(200);

      expect(planServSpy).toHaveBeenCalledWith({
        timeMin,
        timeMax,
        userId: USER_STUB.id,
      });
      expect(request.body).toEqual(result);
    });

    it('expect failure response with invalid time query (timeMin > timeMax)', async () => {
      const timeMin = PLAN_TIME_MIN_STUB;
      const timeMax = PLAN_TIME_MAX_STUB;
      const planServSpy = jest
        .spyOn(planService, 'getPlans')
        .mockRejectedValue(
          new InternalServerErrorException(
            'Service의 getPlans가 실행되어선 안됩니다.',
          ),
        );
      const result = {
        error: 'Bad Request',
        statusCode: 400,
        success: false,
        message: '일정을 요구하는 시간 순서가 올바르지 않습니다.',
      };

      const request = await testRequest(app.getHttpServer())
        .get(`/plan/between`)
        .query({ timemin: timeMax, timemax: timeMin })
        .expect(400);

      expect(planServSpy).toHaveBeenCalledTimes(0);
      expect(request.body).toEqual({
        ...result,
        timestamp: request.body.timestamp,
      });
    });

    it('expect failure response with invalid time query (Empty)', async () => {
      const planServSpy = jest
        .spyOn(planService, 'getPlans')
        .mockRejectedValue(
          new InternalServerErrorException(
            'Service의 getPlans가 실행되어선 안됩니다.',
          ),
        );
      const result = {
        error: 'Bad Request',
        statusCode: 400,
        success: false,
        message: 'Validation failed (Date string is expected)',
      };

      const request = await testRequest(app.getHttpServer())
        .get(`/plan/between`)
        .query({})
        .expect(400);

      expect(planServSpy).toHaveBeenCalledTimes(0);
      expect(request.body).toEqual({
        ...result,
        timestamp: request.body.timestamp,
      });
    });
  });

  describe('Post /plan', () => {
    it('expect success response with creating a plan', async () => {
      const createPlanReq = omitKey(
        {
          ...PLAN_STUB,
          startTime: new Date(PLAN_STUB.startTime),
          endTime: new Date(PLAN_STUB.endTime),
          tags: PLAN_STUB.tags.map(({ name }) => name),
        },
        ['id'],
      );
      const planRes = { ...PLAN_STUB };
      const planServSpy = jest
        .spyOn(planService, 'createPlan')
        .mockResolvedValue(planRes);
      const result = {
        success: true,
        data: planRes,
      };

      const request = await testRequest(app.getHttpServer())
        .post(`/plan`)
        .send(createPlanReq)
        .expect(201);

      expect(planServSpy).toHaveBeenCalledWith({
        ...createPlanReq,
        userId: USER_STUB.id,
      });
      expect(request.body).toEqual(result);
    });

    it('expect failure response with invalid body', async () => {
      const invalidPlan = {};
      const planServSpy = jest
        .spyOn(planService, 'createPlan')
        .mockRejectedValue(
          new InternalServerErrorException(
            'Service의 createPlan이 실행되어선 안됩니다.',
          ),
        );
      const result = {
        error: 'Bad Request',
        statusCode: 400,
        success: false,
      };

      const request = await testRequest(app.getHttpServer())
        .post(`/plan`)
        .send(invalidPlan)
        .expect(400);

      const { message, ...body } = request.body;
      expect(planServSpy).toHaveBeenCalledTimes(0);
      expect(body).toEqual({
        ...result,
        timestamp: request.body.timestamp,
      });
      expect(message).toBeInstanceOf(Array);
    });
  });

  describe('Put /plan/:planId', () => {
    it('expect success response with updating a plan', async () => {
      const updatePlanReq = omitKey(
        {
          ...PLAN_STUB,
          tags: PLAN_STUB.tags.map(({ name }) => name),
          startTime: new Date(PLAN_STUB.startTime),
        },
        ['id'],
      );
      const planRes = { ...PLAN_STUB };
      const planServSpy = jest
        .spyOn(planService, 'updatePlan')
        .mockResolvedValue(planRes);
      const result = {
        success: true,
        data: planRes,
      };

      const request = await testRequest(app.getHttpServer())
        .put(`/plan/${PLAN_STUB.id}`)
        .send(updatePlanReq)
        .expect(200);

      expect(planServSpy).toHaveBeenCalledWith({
        ...updatePlanReq,
        id: PLAN_STUB.id,
        userId: USER_STUB.id,
      });
      expect(request.body).toEqual(result);
    });

    it('expect failure response with invalid body (empty Body - nothing match)', async () => {
      const planServSpy = jest
        .spyOn(planService, 'updatePlan')
        .mockRejectedValue(
          new InternalServerErrorException(
            'Service의 updatePlan이 실행되어선 안됩니다.',
          ),
        );
      const result = {
        error: 'Bad Request',
        statusCode: 400,
        success: false,
        message: '일정을 수정하려면 적어도 유효한 값이 하나라도 있어야 합니다.',
      };

      const request = await testRequest(app.getHttpServer())
        .put(`/plan/${PLAN_STUB.id}`)
        .send({})
        .expect(400);

      expect(planServSpy).toHaveBeenCalledTimes(0);
      expect(request.body).toEqual({
        ...result,
        timestamp: request.body.timestamp,
      });
    });
  });

  describe('Delete /plan/:planId', () => {
    it('expect success response with deleting a plan', async () => {
      const planRes = { ...PLAN_STUB };
      const planServSpy = jest
        .spyOn(planService, 'deletePlan')
        .mockResolvedValue(planRes);
      const result = {
        success: true,
        data: planRes,
      };

      const request = await testRequest(app.getHttpServer())
        .delete(`/plan/${PLAN_STUB.id}`)
        .expect(200);

      expect(planServSpy).toHaveBeenCalledWith({
        planId: PLAN_STUB.id,
        userId: USER_STUB.id,
      });
      expect(request.body).toEqual(result);
    });
  });
});
