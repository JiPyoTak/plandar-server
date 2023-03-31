import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { DefaultEntity } from '@/entity/default.entity';

import { Plan } from './plan.entity';
import { User } from './user.entity';

@Entity('category_tb')
export class Category extends DefaultEntity {
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
  @ManyToOne(() => User, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ApiProperty()
  @OneToMany(() => Plan, (plan) => plan.category)
  plans?: Plan;
}
