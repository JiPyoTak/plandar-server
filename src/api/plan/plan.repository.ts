import { Repository } from 'typeorm';

import { CustomRepository } from '@/common/customRepository.decorator';
import { Plan } from '@/entity/plan.entity';

@CustomRepository(Plan)
export class PlanRepository extends Repository<Plan> {}
