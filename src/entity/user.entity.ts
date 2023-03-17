import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Entity, Column, OneToMany } from 'typeorm';

import { DefaultEntity } from '@/entity/default.entity';

import { Category } from './category.entity';
import { Tag } from './tag.entity';

@Entity('user_tb')
export class User extends DefaultEntity {
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
  @OneToMany(() => Category, (category) => category.user)
  categories?: Category[];

  @ApiProperty()
  @OneToMany(() => Tag, (tag) => tag.user)
  tags?: Tag[];
}
