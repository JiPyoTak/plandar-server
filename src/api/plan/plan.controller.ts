import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { User } from '@/common/decorators/user.decorator';
import { ParseDatePipe } from '@/common/pipes';
import { PlanCreateReqDto, PlanUpdateReqDto } from '@/dto/plan';
import { UserEntity } from '@/entities';

import { PlanService } from './plan.service';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get('/')
  async getPlans(
    @Query('timemin', ParseDatePipe) timeMin: Date,
    @Query('timemax', ParseDatePipe) timeMax: Date,
    @User() user: UserEntity,
  ) {
    if (timeMin > timeMax) {
      throw new BadRequestException(
        '일정을 요구하는 시간 순서가 올바르지 않습니다.',
      );
    }

    return this.planService.getPlans({ timeMin, timeMax, userId: user.id });
  }

  @Post('/')
  async createPlan(
    @Body() createPlanReqDto: PlanCreateReqDto,
    @User() user: UserEntity,
  ) {
    return this.planService.createPlan({
      ...createPlanReqDto,
      userId: user.id,
    });
  }

  @Put('/:planId')
  async updatePlan(
    @Param('planId', ParseIntPipe) planId: number,
    @Body() updatePlanReqDto: PlanUpdateReqDto,
    @User() user: UserEntity,
  ) {
    if (Object.keys(updatePlanReqDto).length === 0) {
      throw new BadRequestException(
        '일정을 수정하려면 적어도 유효한 값이 하나라도 있어야 합니다.',
      );
    }
    return this.planService.updatePlan({
      ...updatePlanReqDto,
      id: planId,
      userId: user.id,
    });
  }

  @Delete('/:planId')
  async deletePlan(
    @Param('planId', ParseIntPipe) planId: number,
    @User() user: UserEntity,
  ) {
    return this.planService.deletePlan({ planId, userId: user.id });
  }
}
