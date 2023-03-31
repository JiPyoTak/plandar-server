import { PlanResDto } from '@/dto/plan';
import { TagResDto } from '@/dto/tag';
import { PLAN_TYPE, UserEntity } from '@/entities';

const PLAN_TIME_MIN_STUB = new Date('2023-03-07 00:00:00.000000');
const PLAN_TIME_MAX_STUB = new Date('2023-03-07 23:59:59.999999');

const PLAN_STUB: PlanResDto = Object.freeze({
  id: 1,
  title: 'MyPlan',
  description: '',
  color: '#123456',
  startTime: new Date(
    '2023-03-07 15:38:06.785155',
  ).toISOString() as unknown as Date,
  endTime: null,
  type: PLAN_TYPE.TASK,
  isAllDay: true,

  createdAt: new Date(
    '2023-03-07 15:38:06.785155',
  ).toISOString() as unknown as Date,
  updatedAt: new Date(
    '2023-03-07 15:38:06.785155',
  ).toISOString() as unknown as Date,

  categoryId: 1,
  tags: [
    { id: 1, name: '태그1' },
    { id: 2, name: '태그2' },
  ] as TagResDto[],
  user: {} as UserEntity,
});

export { PLAN_STUB, PLAN_TIME_MIN_STUB, PLAN_TIME_MAX_STUB };
