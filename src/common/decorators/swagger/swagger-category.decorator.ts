import { applyDecorators } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { CategoryResDto } from '@/dto/category';

const ReadCategorySwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '카테고리 조회',
    }),
    ApiOkResponse({
      description: '카테고리 조회 성공',
      type: CategoryResDto,
      isArray: true,
    }),
  );
};

const CreateCategorySwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '카테고리 생성',
    }),
    ApiCreatedResponse({
      description: '카테고리 생성 성공',
      type: CategoryResDto,
    }),
    ApiConflictResponse({
      description: '이미 카테고리가 존재함',
    }),
  );
};

const UpdateCategorySwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '카테고리 수정',
    }),
    ApiOkResponse({
      description: '카테고리 수정 성공',
      type: CategoryResDto,
    }),
    ApiConflictResponse({
      description:
        '카테고리가 존재하지 않거나 동일한 이름으로 수정하려고 하는 경우',
    }),
    ApiUnprocessableEntityResponse({
      description: 'Request Body에 name, color가 모두 없는 경우',
    }),
  );
};

const DeleteCategorySwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '카테고리 삭제',
    }),
    ApiOkResponse({
      description: '카테고리 삭제 성공',
      type: CategoryResDto,
    }),
    ApiConflictResponse({
      description: '카테고리가 존재하지 않는 경우',
    }),
  );
};

export {
  ReadCategorySwagger,
  CreateCategorySwagger,
  UpdateCategorySwagger,
  DeleteCategorySwagger,
};
