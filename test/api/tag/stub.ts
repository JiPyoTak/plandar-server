import { User } from '@/entity/user.entity';

const STUB_TAG = {
  id: 1,
  name: 'test tag',
  createdAt: new Date(),
  updatedAt: new Date(),
  user: {} as User,
};

export { STUB_TAG };
