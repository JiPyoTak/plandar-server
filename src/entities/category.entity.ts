import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { DefaultEntity } from '@/entities/default.entity';

import { PlanEntity } from './plan.entity';
import { UserEntity } from './user.entity';

@Entity('category_tb')
export class CategoryEntity extends DefaultEntity {
  @ApiProperty()
  @Column({ type: 'varchar', length: 20 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  name!: string;

  @ApiProperty()
  @Column({
    type: 'char',
    length: 6,
    default: '52d681',
  })
  @IsNotEmpty()
  @IsString()
  color!: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @ApiProperty()
  @OneToMany(() => PlanEntity, (plan) => plan.category)
  plans?: PlanEntity;
}
