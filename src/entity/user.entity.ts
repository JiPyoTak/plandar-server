import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { Entity, Column, OneToMany } from 'typeorm';

import { DefaultEntity } from '@/entity/default.entity';
import { Plan } from '@/entity/plan.entity';

@Entity('USER_TB')
export class User extends DefaultEntity {
  @Column({ type: 'varchar', length: 20 })
  @ApiProperty()
  @IsString()
  @MaxLength(20)
  username: string;

  @OneToMany(() => Plan, (plan) => plan.user)
  plans: Plan[];
}
