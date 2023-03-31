import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as testRequest from 'supertest';

import { PlanController } from '@/api/plan/plan.controller';
import { PlanService } from '@/api/plan/plan.service';
import { HttpExceptionFilter } from '@/common/filters';
import { SuccessInterceptor } from '@/common/interceptors';
import createTestingModule from 'test/utils/create-testing-module';

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
  });
});
