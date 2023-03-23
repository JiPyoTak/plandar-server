import { Repository } from 'typeorm';

import { CustomRepository } from '@/common/customRepository.decorator';
import { CreateTagArgs, DeleteTagArgs, UpdateTagArgs } from '@/dto/tag/tag.dto';
import { Tag } from '@/entity/tag.entity';

@CustomRepository(Tag)
export class TagRepository extends Repository<Tag> {
  async getTagById({ tagId, userId }: { tagId: number; userId: number }) {
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

  async getTagByName({ tagName, userId }: { tagName: string; userId: number }) {
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

  async createTag({ tagName, userId }: CreateTagArgs) {
    const {
      identifiers: [{ id }],
    } = await this.insert({ name: tagName, user: { id: userId } });
    return this.getTagById({ tagId: id, userId });
  }

  async updateTag({ tagName, userId, tagId }: UpdateTagArgs) {
    await this.update({ id: tagId, user: { id: userId } }, { name: tagName });
    return this.getTagById({ tagId, userId });
  }

  async deleteTag({ tagId, userId }: DeleteTagArgs) {
    const { affected } = await this.delete({ id: tagId, user: { id: userId } });
    return !!affected;
  }
}
