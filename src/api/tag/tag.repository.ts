import { Repository } from 'typeorm';

import { CustomRepository } from '@/common/customRepository.decorator';
import {
  CreateTagArgs,
  DeleteTagArgs,
  TagResDto,
  UpdateTagArgs,
} from '@/dto/tag';
import { Tag } from '@/entity/tag.entity';

@CustomRepository(Tag)
export class TagRepository extends Repository<Tag> {
  async findTagById({
    tagId,
    userId,
  }: {
    tagId: number;
    userId: number;
  }): Promise<TagResDto> {
    return this.findOne({
      where: {
        id: tagId,
        user: { id: userId },
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async findTagByName({
    tagName,
    userId,
  }: {
    tagName: string;
    userId: number;
  }): Promise<TagResDto> {
    return this.findOne({
      where: {
        name: tagName,
        user: { id: userId },
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async createTag({ tagName, userId }: CreateTagArgs): Promise<TagResDto> {
    const {
      identifiers: [{ id }],
    } = await this.insert({ name: tagName, user: { id: userId } });
    return this.findTagById({ tagId: id, userId });
  }

  async updateTag({
    tagName,
    userId,
    tagId,
  }: UpdateTagArgs): Promise<TagResDto> {
    await this.update({ id: tagId, user: { id: userId } }, { name: tagName });
    return this.findTagById({ tagId, userId });
  }

  async deleteTag({ tagId, userId }: DeleteTagArgs): Promise<boolean> {
    const { affected } = await this.delete({ id: tagId, user: { id: userId } });
    return !!affected;
  }
}
