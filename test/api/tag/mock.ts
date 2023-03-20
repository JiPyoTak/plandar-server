import { User } from '@/entity/user.entity';

const MOCK_TAG = {
  id: 1,
  name: 'test tag',
  createdAt: new Date(),
  updatedAt: new Date(),
  user: {} as User,
};

export { MOCK_TAG };
