import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { DefaultEntity } from '@/entity/default.entity';

import { Plan } from './plan.entity';
import { User } from './user.entity';

@Entity('category_tb')
export class Category extends DefaultEntity {
  @Column({ type: 'varchar', length: 20 })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name!: string;

  @ApiProperty()
  @Column({ type: 'binary', length: 3, default: '0x52d681' })
  @IsString()
  @IsNotEmpty()
  color!: string;

  @ApiProperty()
  @ManyToOne(() => User, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ApiProperty()
  @OneToMany(() => Plan, (plan) => plan.category)
  plans?: Plan;
}
