import { PickType } from '@nestjs/swagger';

import { TagEntity } from '@/entities';

class TagResDto extends PickType(TagEntity, ['name', 'id'] as const) {}

export { TagResDto };
