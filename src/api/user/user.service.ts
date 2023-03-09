import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { UserRepository } from '@/api/user/user.repository';
import { CreateUserRetDto } from '@/dto/user/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  @Transactional()
  async createUser(success: boolean): Promise<CreateUserRetDto[]> {
    const ret = [];
    for (let i = 0; i < 3; i++) {
      const num = Math.random() * 10000;
      if (i === 2 && !success) {
        throw new InternalServerErrorException('transaction failed');
      }
      const { username, id } = await this.userRepo.createUser(
        `user${Math.floor(num)}`,
      );
      ret.push({ username, id });
    }
    return ret;
  }

  async getUsers() {
    return this.userRepo.find();
  }

  @Transactional()
  async createUserWithTime(time: number, success: boolean) {
    const data = [];
    for (let i = 0; i < time; i++) {
      if (i === time - 1 && !success) {
        throw new InternalServerErrorException('transaction failed');
      } else {
        data.push(...(await this.createUser(true)));
      }
    }
    return data;
  }
}
