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
import { TagReqDto, TagResDto } from '@/dto/tag/create-tag.dto';

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
    return this.tagService.createTag(tagName);
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
    return this.tagService.updateTag(tagId, tagName);
  }

  @ApiOperation({
    summary: '태그 삭제',
  })
  @ApiOkResponse({
    description: '태그 삭제 성공',
    type: () => true,
  })
  @Delete('/:tagId')
  async deleteTag(@Param('tagId', ParseIntPipe) tagId: number) {
    return this.tagService.deleteTag(tagId);
  }
}
