import { CategoryEntity } from '@/entities';

const STUB_CATEGORY: CategoryEntity[] = [
  {
    id: 1,
    name: 'category1',
    color: '111111',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      id: 1,
      username: 'test user',
      email: 'test@test.com',
      profileImage: 'test image',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  {
    id: 2,
    name: 'category2',
    color: '222222',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      id: 1,
      username: 'test user',
      email: 'test@test.com',
      profileImage: 'test image',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
];

export { STUB_CATEGORY };
