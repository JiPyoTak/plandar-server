import { Module } from '@nestjs/common';

import { PlanRepository } from '@/api/plan/plan.repository';
import { UserRepository } from '@/api/user/user.repository';
import { TypeOrmExModule } from '@/common/typeOrmEx.module';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmExModule.forFeature([UserRepository, PlanRepository])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
