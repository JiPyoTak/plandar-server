import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Entity, Column, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';

import { DefaultEntity } from '@/entity/default.entity';

import { Plan } from './plan.entity';
import { User } from './user.entity';

@Entity('tag_tb')
export class Tag extends DefaultEntity {
  @Column({ type: 'varchar', length: 20 })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @ApiProperty()
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ApiProperty()
  @ManyToMany(() => Plan, (plan) => plan.tags)
  plans!: Plan[];
}
