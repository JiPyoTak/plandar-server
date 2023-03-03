import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { UserRepository } from '@/api/user/user.repository';
import { Transactional } from '@/common/decorator/transaction.decorator';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  @Transactional()
  async createUser() {
    const ret = [];
    for (let i = 0; i < 3; i++) {
      const num = Math.random() * 10000;
      if (i === 2 && num > 5000) {
        throw new InternalServerErrorException('bomb!');
      }
      ret.push(await this.userRepo.createUser(`user${Math.floor(num)}`));
    }
    return ret;
  }
}
