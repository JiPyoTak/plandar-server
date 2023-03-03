import { Entity, ManyToOne } from 'typeorm';

import { DefaultEntity } from '@/entity/default.entity';
import { User } from '@/entity/user.entity';

@Entity('PLAN_TB')
export class Plan extends DefaultEntity {
  @ManyToOne(() => User, (user) => user.plans)
  user: User;
}
