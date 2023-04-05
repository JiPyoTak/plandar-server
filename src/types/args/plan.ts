import { PlanCreateReqDto, PlanUpdateReqDto } from '@/dto/plan';

interface ICheckUserOwnPlan {
  userId: number;
  planId: number;
}

interface IGetPlansArgs {
  userId: number;
  timeMin: Date;
  timeMax: Date;
}

interface ICreatePlanArgs extends PlanCreateReqDto {
  userId: number;
}

interface IUpdatePlanArgs extends PlanUpdateReqDto {
  id: number;
}

interface IUpdatePlanWithTagsArgs extends PlanUpdateReqDto {
  userId: number;
  id: number;
}

interface IDeletePlanArgs {
  userId: number;
  planId: number;
}

export {
  ICheckUserOwnPlan,
  IGetPlansArgs,
  ICreatePlanArgs,
  IUpdatePlanArgs,
  IUpdatePlanWithTagsArgs,
  IDeletePlanArgs,
};
