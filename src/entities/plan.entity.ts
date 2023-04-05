import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsNumber,
  IsHexColor,
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
import { UserEntity, CategoryEntity, TagEntity } from '@/entities';
import { DefaultEntity } from '@/entities/default.entity';

export enum PLAN_TYPE {
  EVENT = 'event',
  TASK = 'task',
  ALARM = 'alarm',
}

@Entity('plan_tb')
export class PlanEntity extends DefaultEntity {
  @ApiProperty({
    example: '제목!!',
  })
  @Column({ type: 'varchar', length: 30 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  title!: string;

  @ApiProperty({
    example: '나만의 설명',
  })
  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: '#52d681',
  })
  @Column({
    type: 'char',
    length: 6,
    default: '52d681',
  })
  @IsNotEmpty()
  @IsHexColor()
  @Transform(({ value }) => value.replace('#', ''))
  color!: string;

  @ApiProperty({
    example: true,
  })
  @Column({ type: 'boolean', default: true })
  @IsNotEmpty()
  @IsBoolean()
  isAllDay: boolean;

  @ApiProperty({
    example: 'task',
  })
  @Column({ type: 'enum', enum: PLAN_TYPE })
  @IsNotEmpty()
  @IsEnum(PLAN_TYPE)
  type!: PLAN_TYPE;

  @ApiProperty({
    example: '2023-04-05T04:41:19.933Z',
  })
  @Column({ type: 'datetime' })
  @IsNotEmpty()
  @IsDateType()
  @TransformDate()
  startTime!: Date;

  @ApiProperty({
    example: '2023-04-05T04:41:19.933Z',
  })
  @Column({ type: 'datetime', nullable: true })
  @IsOptional()
  @IsDateType()
  @TransformDate()
  endTime?: Date;

  @ApiProperty({
    example: 1,
  })
  @Column({ type: 'int' })
  @IsNumber()
  userId!: number;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;

  @ApiProperty({
    example: 1,
  })
  @Column({ type: 'int' })
  @IsNumber()
  categoryId!: number;

  @ManyToOne(() => CategoryEntity, (category) => category.plans)
  @JoinColumn({ name: 'categoryId' })
  category!: CategoryEntity;

  @ApiProperty({
    example: ['태그1', '태그2'],
  })
  @ManyToMany(() => TagEntity, (tag) => tag.plans, { cascade: true })
  @JoinTable({
    joinColumn: { name: 'plan_id' },
    inverseJoinColumn: { name: 'tag_id' },
    name: 'plan_tag_tb',
  })
  tags?: TagEntity[];
}
