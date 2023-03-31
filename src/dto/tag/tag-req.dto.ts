import { PickType } from '@nestjs/swagger';

import { TagEntity } from '@/entities';

class TagReqDto extends PickType(TagEntity, ['name'] as const) {}

export { TagReqDto };
