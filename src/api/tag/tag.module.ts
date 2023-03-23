import { Module } from '@nestjs/common';

import { TagRepository } from '@/api/tag/tag.repository';
import { TypeOrmExModule } from '@/common/typeOrmEx.module';

import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmExModule.forFeature([TagRepository])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
