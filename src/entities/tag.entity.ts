import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Entity, Column, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';

import { DefaultEntity } from '@/entities/default.entity';

import { PlanEntity } from './plan.entity';
import { UserEntity } from './user.entity';

@Entity('tag_tb')
export class TagEntity extends DefaultEntity {
  @ApiProperty()
  @Column({ type: 'varchar', length: 20 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  name: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @ApiProperty()
  @ManyToMany(() => PlanEntity, (plan) => plan.tags)
  plans!: PlanEntity[];
}
