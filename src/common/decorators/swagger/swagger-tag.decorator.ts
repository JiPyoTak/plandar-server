import { applyDecorators } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { TagResDto } from '@/dto/tag';

const CreateTagSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '태그 생성',
    }),
    ApiCreatedResponse({
      description: '태그 생성 성공',
      type: TagResDto,
    }),
    ApiConflictResponse({
      description: '이미 태그가 존재함',
    }),
  );
};

const UpdateTagSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '태그 수정',
    }),
    ApiOkResponse({
      description: '태그 수정 성공',
      type: () => TagResDto,
    }),
    ApiConflictResponse({
      description:
        '태그가 존재하지 않거나 동일한 이름으로 수정하려고 하는 경우',
    }),
  );
};

const DeleteTagSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '태그 삭제',
    }),
    ApiOkResponse({
      description:
        '태그 삭제 결과 (true: 삭제 성공 / false: 존재하지 않는 태그)',
      type: () => true,
    }),
  );
};

export { CreateTagSwagger, UpdateTagSwagger, DeleteTagSwagger };
