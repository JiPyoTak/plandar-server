import { User } from '@/entity/user.entity';

const USER_MOCK: User = {
  id: 1,
  email: 'test@test.com',
  username: '테스트',
  profileImage: '이미지',
  createdAt: new Date('2023-03-07 15:38:06.785155'),
  updatedAt: new Date('2023-03-07 15:38:06.785155'),
};

export { USER_MOCK };
