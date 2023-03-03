import { Column, Entity, ManyToOne } from 'typeorm';

import { DefaultEntity } from '@/entity/default.entity';
import { User } from '@/entity/user.entity';

@Entity('PLAN_TB')
export class Plan extends DefaultEntity {
  @Column({
    name: 'plan_name',
  })
  planName: string;

  @ManyToOne(() => User, (user) => user.plans)
  user: User;
}
