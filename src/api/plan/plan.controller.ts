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
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';

import { User } from '@/common/decorators/user.decorator';
import { ParseDatePipe } from '@/common/pipes';
import { PlanCreateReqDto, PlanResDto, PlanUpdateReqDto } from '@/dto/plan';
import { TTokenUser } from '@/types';

import { PlanService } from './plan.service';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @ApiOperation({
    summary: '원하는 날짜 사이의 일정 조회',
  })
  @ApiQuery({
    name: 'timemin',
    type: Date,
    example: '2023-04-01T00:00:00.000Z',
    required: true,
  })
  @ApiQuery({
    name: 'timemax',
    type: Date,
    example: '2023-05-01T00:00:00.000Z',
    required: true,
  })
  @ApiOkResponse({
    description: '일정 조회 성공',
    type: PlanResDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'timemin query 값이 timemax query 값보다 이후일 때',
  })
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

    return this.planService.getPlans({ timeMin, timeMax, userId: user.id });
  }

  @ApiOperation({
    summary: '새로운 일정 추가',
  })
  @ApiCreatedResponse({
    description: '일정 생성 성공',
    type: PlanResDto,
  })
  @ApiConflictResponse({
    description: '연결하고자 하는 카테고리 아이디가 존재하지 않는 경우',
  })
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

  @ApiOperation({
    summary: '일정 수정',
  })
  @ApiOkResponse({
    description: '일정 수정 성공',
    type: PlanResDto,
  })
  @ApiBadRequestResponse({
    description: '바꾸려는 일정 값이(Body 혹은 planId 값) 존재하지 않을 때',
  })
  @ApiConflictResponse({
    description:
      '일정 아이디가 존재하지 않거나 카테고리 아이디가 존재하지 않는 경우',
  })
  @ApiForbiddenResponse({
    description: '일정 혹은 카테고리가 유저가 소유한 것이 아닐 경우',
  })
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

  @ApiOperation({
    summary: '일정 삭제',
  })
  @ApiOkResponse({
    description: '일정 삭제 성공',
    type: PlanResDto,
  })
  @ApiConflictResponse({
    description: '일정 아이디가 존재하지 않을 경우',
  })
  @ApiForbiddenResponse({
    description: '일정이 유저가 소유한 것이 아닐 경우',
  })
  @ApiInternalServerErrorResponse({
    description: '일정 삭제가 데이터베이스 오류로 실패된 경우',
  })
  @Delete('/:planId')
  async deletePlan(
    @Param('planId', ParseIntPipe) planId: number,
    @User() user: TTokenUser,
  ) {
    return this.planService.deletePlan({ planId, userId: user.id });
  }
}
