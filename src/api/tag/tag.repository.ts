import { Repository } from 'typeorm';

import { CustomRepository } from '@/common/customRepository.decorator';
import { CreateTagArgs, DeleteTagArgs, UpdateTagArgs } from '@/dto/tag/tag.dto';
import { Tag } from '@/entity/tag.entity';

@CustomRepository(Tag)
export class TagRepository extends Repository<Tag> {
  async createTag({ tagName, userId }: CreateTagArgs) {
    return this.save(this.create({ name: tagName, user: { id: userId } }));
  }

  async updateTag({ tagName, userId, tagId }: UpdateTagArgs) {
    return this.update({ id: tagId, user: { id: userId } }, { name: tagName });
  }

  async deleteTag({ tagName, userId }: DeleteTagArgs) {
    return this.delete({ name: tagName, user: { id: userId } });
  }
}
