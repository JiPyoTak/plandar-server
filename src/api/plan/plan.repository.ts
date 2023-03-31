import { Repository } from 'typeorm';

import { CustomRepository } from '@/common/decorators';
import { PlanEntity } from '@/entities';

@CustomRepository(PlanEntity)
export class PlanRepository extends Repository<PlanEntity> {}
