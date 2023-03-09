import { DynamicModule, Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import type { DataSource, EntitySchema, ObjectLiteral } from 'typeorm';

import { PLANDAR_CUSTOM_REPSOITORY } from '@/utils/constants';

export class TypeOrmExModule {
  public static forFeature<T extends new (...args: unknown[]) => any>(
    repositories: T[],
  ): DynamicModule {
    const providers: Provider[] = [];

    for (const Repository of repositories) {
      const TargetEntity = Reflect.getMetadata(
        PLANDAR_CUSTOM_REPSOITORY,
        Repository,
      ) as EntitySchema<ObjectLiteral>;

      if (!TargetEntity) {
        continue;
      }

      providers.push({
        inject: [getDataSourceToken()],
        provide: Repository,
        useFactory: (dataSource: DataSource): typeof Repository => {
          const baseRepository = dataSource.getRepository(TargetEntity);

          return new Repository(
            baseRepository.target,
            baseRepository.manager,
            baseRepository.queryRunner,
          );
        },
      });
    }

    return {
      exports: providers,
      module: TypeOrmExModule,
      providers,
    };
  }
}
