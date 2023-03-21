import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { TagService } from '@/api/tag/tag.service';
import { TagDeleteReqDto, TagReqDto, TagResDto } from '@/dto/tag/tag.dto';

const USER_ID = 1;

@ApiTags('tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOperation({
    summary: '태그 생성',
  })
  @ApiCreatedResponse({
    status: 201,
    description: '태그 생성 성공',
    type: TagResDto,
  })
  @Post()
  async createTag(@Body() { name: tagName }: TagReqDto) {
    return this.tagService.createTag({ userId: USER_ID, tagName });
  }

  @ApiOperation({
    summary: '태그 수정',
  })
  @ApiOkResponse({
    description: '태그 수정 성공',
    type: () => TagResDto,
  })
  @Put('/:tagId')
  async updateTag(
    @Param('tagId', ParseIntPipe) tagId: number,
    @Body() { name: tagName }: TagReqDto,
  ) {
    return this.tagService.updateTag({ userId: USER_ID, tagId, tagName });
  }

  @ApiOperation({
    summary: '태그 삭제',
  })
  @ApiOkResponse({
    description: '태그 삭제 성공',
    type: () => true,
  })
  @Delete('/:tagId')
  async deleteTag(@Param() { id: tagId }: TagDeleteReqDto) {
    return this.tagService.deleteTag({ userId: USER_ID, tagId });
  }
}
