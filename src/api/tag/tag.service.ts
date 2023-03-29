import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { TagRepository } from '@/api/tag/tag.repository';
import { TagResDto } from '@/dto/tag';
import { CreateTagArgs, DeleteTagArgs, UpdateTagArgs } from '@/types/args';

@Injectable()
export class TagService {
  constructor(private readonly tagRepo: TagRepository) {}

  async createTag(createTagArgs: CreateTagArgs): Promise<TagResDto> {
    const tag = await this.tagRepo.findTagByName(createTagArgs);
    if (tag) {
      throw new ConflictException('Tag already exists');
    }
    return this.tagRepo.createTag(createTagArgs);
  }

  async updateTag(updateTagArgs: UpdateTagArgs): Promise<TagResDto> {
    const tag = await this.tagRepo.findTagById({
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

  async deleteTag(deleteTagArgs: DeleteTagArgs): Promise<TagResDto> {
    const tag = await this.tagRepo.findTagById(deleteTagArgs);
    if (!tag) {
      throw new ConflictException('Tag does not exist');
    }

    if (!(await this.tagRepo.deleteTag(deleteTagArgs))) {
      throw new InternalServerErrorException(
        'There is an error in deleting tag',
      );
    }
    return tag;
  }
}
