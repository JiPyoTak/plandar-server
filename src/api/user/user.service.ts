import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { UserRepository } from '@/api/user/user.repository';
import { UserCreateDto } from '@/dto/user';
import { UserEntity } from '@/entities';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async validateUser(userInfo: UserCreateDto) {
    const user = await this.userRepo.getUserByEmail(userInfo.email);

    if (user) {
      return user;
    }

    const newUser = await this.createUser(userInfo);

    return newUser;
  }

  async getUser(id: number): Promise<UserEntity> {
    const user = await this.userRepo.getUserById(id);

    if (!user) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }

    return user;
  }

  async createUser(userInfo: UserCreateDto): Promise<UserEntity> {
    const user = await this.userRepo.getUserByEmail(userInfo.email);

    if (user) {
      throw new ConflictException('이미 존재하는 유저입니다.');
    }

    return this.userRepo.createUser(userInfo);
  }
}
