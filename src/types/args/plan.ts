import { PlanCreateReqDto, PlanUpdateReqDto } from '@/dto/plan';

interface IGetPlansArgs {
  userId: number;
  timeMin: Date;
  timeMax: Date;
}

interface ICreatePlanArgs extends PlanCreateReqDto {
  userId: number;
}

interface IUpdatePlanArgs extends Omit<PlanUpdateReqDto, 'tags'> {
  id: number;
}

interface IUpdatePlanWithTagsArgs extends PlanUpdateReqDto {
  userId: number;
  planId: number;
}

export {
  IGetPlansArgs,
  ICreatePlanArgs,
  IUpdatePlanArgs,
  IUpdatePlanWithTagsArgs,
};
