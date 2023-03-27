import { Category } from '@/entity/category.entity';

const STUB_CATEGORY: Category[] = [
  {
    id: 1,
    name: 'category1',
    color: 0x111111,
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
    color: 0x222222,
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
