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
import { ApiTags } from '@nestjs/swagger';

import {
  CreatePlanSwagger,
  DeletePlanSwagger,
  GetBetweenPlansSwagger,
  GetPlansSwagger,
  UpdatePlanSwagger,
} from '@/common/decorators/swagger/swagger-plan.decorator';
import { User } from '@/common/decorators/user.decorator';
import { ParseDatePipe } from '@/common/pipes';
import { PlanCreateReqDto, PlanUpdateReqDto } from '@/dto/plan';
import { TTokenUser } from '@/types';
import {
  getStartTimeDate,
  getEndTimeDate,
  getMonthRangeDate,
} from '@/utils/date';

import { PlanService } from './plan.service';

@ApiTags('plan')
@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @GetPlansSwagger()
  @Get('/')
  async getPlans(
    @Query('date', ParseDatePipe) date: Date,
    @User() user: TTokenUser,
  ) {
    const [timeMin, timeMax] = getMonthRangeDate(date);

    const data = await this.planService.getPlans({
      timeMin,
      timeMax,
      userId: user.id,
    });

    return data;
  }

  @GetBetweenPlansSwagger()
  @Get('/between')
  async getBetweenPlans(
    @Query('timemin', ParseDatePipe) timeMin: Date,
    @Query('timemax', ParseDatePipe) timeMax: Date,
    @User() user: TTokenUser,
  ) {
    if (timeMin > timeMax) {
      throw new BadRequestException(
        '일정을 요구하는 시간 순서가 올바르지 않습니다.',
      );
    }

    return this.planService.getPlans({
      timeMin: getStartTimeDate(timeMin),
      timeMax: getEndTimeDate(timeMax),
      userId: user.id,
    });
  }

  @CreatePlanSwagger()
  @Post('/')
  async createPlan(
    @Body() createPlanReqDto: PlanCreateReqDto,
    @User() user: TTokenUser,
  ) {
    return this.planService.createPlan({
      ...createPlanReqDto,
      userId: user.id,
    });
  }

  @UpdatePlanSwagger()
  @Put('/:planId')
  async updatePlan(
    @Param('planId', ParseIntPipe) planId: number,
    @Body() updatePlanReqDto: PlanUpdateReqDto,
    @User() user: TTokenUser,
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

  @DeletePlanSwagger()
  @Delete('/:planId')
  async deletePlan(
    @Param('planId', ParseIntPipe) planId: number,
    @User() user: TTokenUser,
  ) {
    return this.planService.deletePlan({ planId, userId: user.id });
  }
}
