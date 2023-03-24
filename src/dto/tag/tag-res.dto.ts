import { PickType } from '@nestjs/swagger';

import { Tag } from '@/entity/tag.entity';

class TagResDto extends PickType(Tag, ['name', 'id'] as const) {}

export { TagResDto };
