import { Module } from '@nestjs/common';

import { PlanRepository } from '@/api/plan/plan.repository';
import { UserRepository } from '@/api/user/user.repository';
import { TransactionManager } from '@/common/transaction.manager';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PlanRepository, TransactionManager],
})
export class UserModule {}
