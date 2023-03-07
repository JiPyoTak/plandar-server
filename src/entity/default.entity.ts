import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsPositive } from 'class-validator';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class DefaultEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  id: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;
}
