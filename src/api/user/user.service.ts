import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { PlanRepository } from '@/api/plan/plan.repository';
import { UserRepository } from '@/api/user/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly planRepo: PlanRepository,
  ) {}

  @Transactional()
  async createUser(success: boolean) {
    const ret = [];
    for (let i = 0; i < 3; i++) {
      const num = Math.random() * 10000;
      const data = { user: undefined, plan: undefined };
      if (i === 2 && !success) {
        throw new InternalServerErrorException('bomb! Internal Server');
      }
      data.user = await this.userRepo.createUser(`user${Math.floor(num)}`);
      data.plan = await this.planRepo.createPlan(`plan${Math.floor(num)}`);
      ret.push(data);
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
        throw new NotFoundException('bomb! Not Found');
      } else {
        data.push(...(await this.createUser(true)));
      }
    }
    return data;
  }
}
