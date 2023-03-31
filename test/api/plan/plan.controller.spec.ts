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
        .get(`/plan`)
        .query({ timeMin, timeMax })
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
        .get(`/plan`)
        .query({ timeMin: timeMax, timeMax: timeMin })
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
});
