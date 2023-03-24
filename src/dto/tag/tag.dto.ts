import { PickType } from '@nestjs/swagger';

import { Tag } from '@/entity/tag.entity';

class TagReqDto extends PickType(Tag, ['name'] as const) {}
class TagResDto extends PickType(Tag, ['name', 'id'] as const) {}

interface CreateTagArgs {
  userId: number;
  tagName: string;
}

interface UpdateTagArgs extends CreateTagArgs {
  tagId: number;
}

interface DeleteTagArgs {
  userId: number;
  tagId: number;
}

export { TagReqDto, TagResDto, CreateTagArgs, UpdateTagArgs, DeleteTagArgs };
