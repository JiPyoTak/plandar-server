import { PlanUpdateReqDto } from '@/dto/plan';

interface ICheckUserOwnPlan {
  userId: number;
  planId: number;
}

interface IGetPlansArgs {
  userId: number;
  timeMin: Date;
  timeMax: Date;
}

interface IUpdatePlanArgs extends Omit<PlanUpdateReqDto, 'tags'> {
  id: number;
}

interface IUpdatePlanWithTagsArgs extends PlanUpdateReqDto {
  userId: number;
  planId: number;
}

interface IDeletePlanArgs {
  userId: number;
  planId: number;
}

export {
  ICheckUserOwnPlan,
  IGetPlansArgs,
  IUpdatePlanArgs,
  IUpdatePlanWithTagsArgs,
  IDeletePlanArgs,
};
