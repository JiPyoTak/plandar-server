import { applyDecorators } from '@nestjs/common';
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

import { PlanResDto } from '@/dto/plan';

const GetPlansSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '원하는 달의 일정 조회',
    }),
    ApiQuery({
      name: 'date',
      type: Date,
      example: '2023-04',
      required: true,
    }),
    ApiOkResponse({
      description: '일정 조회 성공',
      type: PlanResDto,
      isArray: true,
    }),
  );
};

const GetBetweenPlansSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '원하는 날짜 사이의 일정 조회',
    }),
    ApiQuery({
      name: 'timemin',
      type: Date,
      example: '2023-04-01T00:00:00.000Z',
      required: true,
    }),
    ApiQuery({
      name: 'timemax',
      type: Date,
      example: '2023-05-01T00:00:00.000Z',
      required: true,
    }),
    ApiOkResponse({
      description: '일정 조회 성공',
      type: PlanResDto,
      isArray: true,
    }),
    ApiBadRequestResponse({
      description: 'timemin query 값이 timemax query 값보다 이후일 때',
    }),
  );
};

const CreatePlanSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '새로운 일정 추가',
    }),
    ApiCreatedResponse({
      description: '일정 생성 성공',
      type: PlanResDto,
    }),
    ApiConflictResponse({
      description: '연결하고자 하는 카테고리 아이디가 존재하지 않는 경우',
    }),
  );
};

const UpdatePlanSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '일정 수정',
    }),
    ApiOkResponse({
      description: '일정 수정 성공',
      type: PlanResDto,
    }),
    ApiBadRequestResponse({
      description: '바꾸려는 일정 값이(Body 혹은 planId 값) 존재하지 않을 때',
    }),
    ApiConflictResponse({
      description:
        '일정 아이디가 존재하지 않거나 카테고리 아이디가 존재하지 않는 경우',
    }),
    ApiForbiddenResponse({
      description: '일정 혹은 카테고리가 유저가 소유한 것이 아닐 경우',
    }),
  );
};

const DeletePlanSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '일정 삭제',
    }),
    ApiOkResponse({
      description: '일정 삭제 성공',
      type: PlanResDto,
    }),
    ApiConflictResponse({
      description: '일정 아이디가 존재하지 않을 경우',
    }),
    ApiForbiddenResponse({
      description: '일정이 유저가 소유한 것이 아닐 경우',
    }),
    ApiInternalServerErrorResponse({
      description: '일정 삭제가 데이터베이스 오류로 실패된 경우',
    }),
  );
};

export {
  GetPlansSwagger,
  GetBetweenPlansSwagger,
  CreatePlanSwagger,
  UpdatePlanSwagger,
  DeletePlanSwagger,
};
