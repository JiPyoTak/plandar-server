import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { TagService } from '@/api/tag/tag.service';
import { User } from '@/common/decorators';
import { TagReqDto, TagResDto } from '@/dto/tag';
import { UserEntity } from '@/entities';

@ApiTags('tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOperation({
    summary: '태그 생성',
  })
  @ApiCreatedResponse({
    description: '태그 생성 성공',
    type: TagResDto,
  })
  @ApiConflictResponse({
    description: '이미 태그가 존재함',
  })
  @Post()
  @HttpCode(201)
  async createTag(
    @Body() { name: tagName }: TagReqDto,
    @User() user: UserEntity,
  ) {
    return this.tagService.createTag({ userId: user.id, tagName });
  }

  @ApiOperation({
    summary: '태그 수정',
  })
  @ApiOkResponse({
    description: '태그 수정 성공',
    type: () => TagResDto,
  })
  @ApiConflictResponse({
    description: '태그가 존재하지 않거나 동일한 이름으로 수정하려고 하는 경우',
  })
  @Put(':tagId')
  async updateTag(
    @Param('tagId', ParseIntPipe) tagId: number,
    @Body() { name: tagName }: TagReqDto,
    @User() user: UserEntity,
  ) {
    return this.tagService.updateTag({ userId: user.id, tagId, tagName });
  }

  @ApiOperation({
    summary: '태그 삭제',
  })
  @ApiOkResponse({
    description: '태그 삭제 결과 (true: 삭제 성공 / false: 존재하지 않는 태그)',
    type: () => true,
  })
  @Delete(':tagId')
  async deleteTag(
    @Param('tagId', ParseIntPipe) tagId: number,
    @User() user: UserEntity,
  ) {
    return this.tagService.deleteTag({ userId: user.id, tagId });
  }
}
