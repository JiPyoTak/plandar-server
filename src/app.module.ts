import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { UserModule } from '@/api/user/user.module';
import { Plan } from '@/entity/plan.entity';
import { User } from '@/entity/user.entity';

import { CategoryModule } from './api/category/category.module';
import { PlanModule } from './api/plan/plan.module';
import { TagModule } from './api/tag/tag.module';
import { Category } from './entity/category.entity';
import { Tag } from './entity/tag.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        port: 3306,
        host: config.get('DB_HOST'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_SCHEMA'),
        entities: [Plan, User, Category, Tag],
        // synchronize: config.get('NODE_ENV') === 'development', // true 시 테이블이 이미 존재하면 에러 발생
        // synchronize: true,
        logging: config.get('NODE_ENV') === 'development',
        namingStrategy: new SnakeNamingStrategy(),
      }),
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    UserModule,
    PlanModule,
    TagModule,
    CategoryModule,
  ],
})
export class AppModule {}
