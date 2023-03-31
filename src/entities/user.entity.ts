import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Entity, Column, OneToMany } from 'typeorm';

import { DefaultEntity } from '@/entities/default.entity';

import { CategoryEntity } from './category.entity';
import { TagEntity } from './tag.entity';

@Entity('user_tb')
export class UserEntity extends DefaultEntity {
  @Column({ type: 'varchar', length: 20 })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  username!: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  email!: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  profileImage!: string;

  @ApiProperty()
  @OneToMany(() => CategoryEntity, (category) => category.user)
  categories?: CategoryEntity[];

  @ApiProperty()
  @OneToMany(() => TagEntity, (tag) => tag.user)
  tags?: TagEntity[];
}
