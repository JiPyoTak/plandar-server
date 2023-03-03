import { Entity, Column, OneToMany } from 'typeorm';

import { DefaultEntity } from '@/entity/default.entity';
import { Plan } from '@/entity/plan.entity';

@Entity('USER_TB')
export class User extends DefaultEntity {
  @Column()
  username: string;

  @OneToMany(() => Plan, (plan) => plan.user)
  plans: Plan[];
}
