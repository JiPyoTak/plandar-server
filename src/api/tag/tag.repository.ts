import { Repository } from 'typeorm';

import { CustomRepository } from '@/common/customRepository.decorator';
import { Tag } from '@/entity/tag.entity';

@CustomRepository(Tag)
export class UserRepository extends Repository<Tag> {}
