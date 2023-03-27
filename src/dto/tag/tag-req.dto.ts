import { PickType } from '@nestjs/swagger';

import { Tag } from '@/entity/tag.entity';

class TagReqDto extends PickType(Tag, ['name'] as const) {}

export { TagReqDto };
