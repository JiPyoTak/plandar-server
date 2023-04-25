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
import { ApiTags } from '@nestjs/swagger';

import { TagService } from '@/api/tag/tag.service';
import { User } from '@/common/decorators';
import {
  CreateTagSwagger,
  DeleteTagSwagger,
  UpdateTagSwagger,
} from '@/common/decorators/swagger/swagger-tag.decorator';
import { TagReqDto } from '@/dto/tag';
import { UserEntity } from '@/entities';

@ApiTags('tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @CreateTagSwagger()
  @Post()
  @HttpCode(201)
  async createTag(
    @Body() { name: tagName }: TagReqDto,
    @User() user: UserEntity,
  ) {
    return this.tagService.createTag({ userId: user.id, tagName });
  }

  @UpdateTagSwagger()
  @Put(':tagId')
  async updateTag(
    @Param('tagId', ParseIntPipe) tagId: number,
    @Body() { name: tagName }: TagReqDto,
    @User() user: UserEntity,
  ) {
    return this.tagService.updateTag({ userId: user.id, tagId, tagName });
  }

  @DeleteTagSwagger()
  @Delete(':tagId')
  async deleteTag(
    @Param('tagId', ParseIntPipe) tagId: number,
    @User() user: UserEntity,
  ) {
    return this.tagService.deleteTag({ userId: user.id, tagId });
  }
}
