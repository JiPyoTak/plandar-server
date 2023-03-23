import { Injectable } from '@nestjs/common';

import { TagRepository } from '@/api/tag/tag.repository';
import { CreateTagArgs, DeleteTagArgs, UpdateTagArgs } from '@/dto/tag/tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly tagRepo: TagRepository) {}

  async createTag({ userId, tagName }: CreateTagArgs) {
    return Promise.resolve(undefined);
  }

  async updateTag({ userId, tagName, tagId }: UpdateTagArgs) {
    return Promise.resolve(undefined);
  }

  deleteTag({ tagName, userId }: DeleteTagArgs) {
    return Promise.resolve(undefined);
  }
}
