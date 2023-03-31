import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsNumber,
} from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

import {
  IsDateType,
  TransformDate,
} from '@/common/decorators/date-type.decorator';
import { DefaultEntity } from '@/entity/default.entity';
import { User } from '@/entity/user.entity';

import { Category } from './category.entity';
import { Tag } from './tag.entity';

export enum PLAN_TYPE {
  EVENT = 'event',
  TASK = 'task',
  ALARM = 'alarm',
}

@Entity('plan_tb')
export class Plan extends DefaultEntity {
  @ApiProperty()
  @Column({ type: 'varchar', length: 30 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  title!: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

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
  @Column({ type: 'boolean', default: true })
  @IsNotEmpty()
  @IsBoolean()
  isAllDay: boolean;

  @ApiProperty()
  @Column({ type: 'enum', enum: PLAN_TYPE })
  @IsNotEmpty()
  @IsEnum(PLAN_TYPE)
  type!: PLAN_TYPE;

  @ApiProperty()
  @Column({ type: 'datetime' })
  @IsNotEmpty()
  @IsDateType()
  @TransformDate()
  startTime!: Date;

  @ApiProperty()
  @Column({ type: 'datetime', nullable: true })
  @IsOptional()
  @IsDateType()
  @TransformDate()
  endTime?: Date;

  @ApiProperty()
  @ManyToOne(() => User, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'int' })
  @IsNumber()
  categoryId!: number;

  @ApiProperty()
  @ManyToOne(() => Category, (category) => category.plans, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'categoryId' })
  category!: Category;

  @ApiProperty()
  @ManyToMany(() => Tag, (tag) => tag.plans, { cascade: true })
  @JoinTable({
    joinColumn: { name: 'plan_id' },
    inverseJoinColumn: { name: 'tag_id' },
    name: 'plan_tag_tb',
  })
  tags?: Tag[];
}
