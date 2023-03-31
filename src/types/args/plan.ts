import { PlanCreateReqDto } from '@/dto/plan';

interface IGetPlansArgs {
  userId: number;
  timeMin: Date;
  timeMax: Date;
}

interface ICreatePlanArgs extends PlanCreateReqDto {
  userId: number;
}

export { IGetPlansArgs, ICreatePlanArgs };
