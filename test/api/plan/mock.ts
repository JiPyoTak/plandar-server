import { Category } from '@/entity/category.entity';
import { PLAN_TYPE, Plan } from '@/entity/plan.entity';
import { User } from '@/entity/user.entity';

const MOCK_PLAN: Plan = {
  id: 4,
  title: 'MyPlan',
  createdAt: new Date('2023-03-07 15:38:06.785155'),
  updatedAt: new Date('2023-03-07 15:38:06.785155'),
  user: {} as User,
  category: {} as Category,
  color: '000000',
  description: '',
  endTime: null,
  startTime: new Date('2023-03-07 15:38:06.785155'),
  type: PLAN_TYPE.TASK,
  isAllDay: true,
};

export { MOCK_PLAN };
