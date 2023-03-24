import {
  Injectable,
  ConflictException,
  NotFoundException,
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
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }

    return user;
  }

  async createUser(userInfo: CreateUserRetDto): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { email: userInfo.email },
    });

    if (user) {
      throw new ConflictException('이미 존재하는 유저입니다.');
    }

    return this.userRepo.createUser(userInfo);
  }
}
