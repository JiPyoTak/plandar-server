import { UserEntity } from '@/entities';

const STUB_TAG = {
  id: 1,
  name: 'test tag',
  createdAt: new Date(),
  updatedAt: new Date(),
  user: {
    id: 1,
    username: 'test user',
    email: 'test@test.com',
    profileImage: 'test image',
    createdAt: new Date(),
    updatedAt: new Date(),
  } as UserEntity,
};

export { STUB_TAG };
