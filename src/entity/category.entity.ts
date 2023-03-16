import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
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
  @Column({
    type: 'binary',
    length: 3,
    default: Buffer.from('0x52d681'),
  })
  @IsNumber()
  @IsNotEmpty()
  color!: number;

  @ApiProperty()
  @ManyToOne(() => User, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ApiProperty()
  @OneToMany(() => Plan, (plan) => plan.category)
  plans?: Plan;
}
