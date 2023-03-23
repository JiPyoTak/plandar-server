import { ConflictException, Injectable } from '@nestjs/common';

import { TagRepository } from '@/api/tag/tag.repository';
import {
  CreateTagArgs,
  DeleteTagArgs,
  TagResDto,
  UpdateTagArgs,
} from '@/dto/tag/tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly tagRepo: TagRepository) {}

  async createTag(createTagArgs: CreateTagArgs): Promise<TagResDto> {
    const tag = await this.tagRepo.getTagByName(createTagArgs);
    if (tag) {
      throw new ConflictException('Tag already exists');
    }
    return this.tagRepo.createTag(createTagArgs);
  }

  async updateTag(updateTagArgs: UpdateTagArgs): Promise<TagResDto> {
    const tag = await this.tagRepo.getTagById({
      tagId: updateTagArgs.tagId,
      userId: updateTagArgs.userId,
    });
    if (!tag) {
      throw new ConflictException('Tag does not exist');
    } else if (tag.name === updateTagArgs.tagName) {
      throw new ConflictException('Tag name is the same');
    }
    return this.tagRepo.updateTag(updateTagArgs);
  }

  async deleteTag(deleteTagArgs: DeleteTagArgs): Promise<boolean> {
    return this.tagRepo.deleteTag(deleteTagArgs);
  }
}
