import { User } from '@/entity/user.entity';

const USER_STUB: User = {
  id: 1,
  email: 'test@test.com',
  username: '테스트',
  profileImage: '이미지',
  createdAt: new Date(
    '2023-03-07 15:38:06.785155',
  ).toISOString() as unknown as Date,
  updatedAt: new Date(
    '2023-03-07 15:38:06.785155',
  ).toISOString() as unknown as Date,
};

const GET_USER_ERROR_STUB = {
  error: 'Not Found',
  message: '존재하지 않는 유저입니다.',
  statusCode: 404,
  success: false,
};

export { USER_STUB, GET_USER_ERROR_STUB };
