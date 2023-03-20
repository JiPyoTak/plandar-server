import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { UserRepository } from '@/api/user/user.repository';
import { CreateUserRetDto } from '@/dto/user/create-user.dto';
import { User } from '@/entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async getUser(id: number): Promise<User> {
    const user = await this.userRepo.getUserById(id);

    if (!user) {
      new BadRequestException('존재하지 않는 유저입니다.');
    }

    return user;
  }

  async createUser(userInfo: CreateUserRetDto): Promise<User> {
    try {
      const user = await this.userRepo.findOne({
        where: { email: userInfo.email },
      });

      if (user) {
        new BadRequestException('이미 존재하는 유저입니다.');
      }

      return this.userRepo.createUser(userInfo);
    } catch (error) {
      new InternalServerErrorException('서버 에러입니다.');
    }
  }
}
