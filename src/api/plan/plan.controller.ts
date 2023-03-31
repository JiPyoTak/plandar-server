import { BadRequestException, Controller, Get, Query } from '@nestjs/common';

import { User } from '@/common/decorators/user.decorator';
import { ParseDatePipe } from '@/common/pipes';
import { UserEntity } from '@/entities';

import { PlanService } from './plan.service';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get('/')
  async getPlans(
    @Query('timeMin', new ParseDatePipe()) timeMin: Date,
    @Query('timeMax', new ParseDatePipe()) timeMax: Date,
    @User() user: UserEntity,
  ) {
    if (timeMin > timeMax) {
      throw new BadRequestException(
        '일정을 요구하는 시간 순서가 올바르지 않습니다.',
      );
    }

    return this.planService.getPlans({ timeMin, timeMax, userId: user.id });
  }
}
