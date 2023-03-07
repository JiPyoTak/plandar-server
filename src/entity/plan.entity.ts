import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { DefaultEntity } from '@/entity/default.entity';
import { User } from '@/entity/user.entity';

@Entity('PLAN_TB')
export class Plan extends DefaultEntity {
  @ApiProperty()
  @Column({
    name: 'plan_name',
    type: 'varchar',
    length: 30,
  })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  planName: string;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.plans, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
