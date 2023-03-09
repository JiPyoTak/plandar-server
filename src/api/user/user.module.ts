import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlanRepository } from '@/api/plan/plan.repository';
import { UserRepository } from '@/api/user/user.repository';
import { Plan } from '@/entity/plan.entity';
import { User } from '@/entity/user.entity';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Plan])],
  controllers: [UserController],
  providers: [UserService, UserRepository, PlanRepository],
})
export class UserModule {}
