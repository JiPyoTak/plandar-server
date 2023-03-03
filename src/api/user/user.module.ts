import { Module } from '@nestjs/common';

import { UserRepository } from '@/api/user/user.repository';
import { TransactionManager } from '@/common/transaction.manager';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, TransactionManager],
})
export class UserModule {}
