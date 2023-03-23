import { PickType } from '@nestjs/swagger';

import { Tag } from '@/entity/tag.entity';

export class TagReqDto extends PickType(Tag, ['name'] as const) {}
export class TagDeleteReqDto extends PickType(Tag, ['id'] as const) {}
export class TagResDto extends PickType(Tag, ['name', 'id'] as const) {}

export interface CreateTagArgs {
  userId: number;
  tagName: string;
}

export interface UpdateTagArgs extends CreateTagArgs {
  tagId: number;
}

export type DeleteTagArgs = CreateTagArgs;
