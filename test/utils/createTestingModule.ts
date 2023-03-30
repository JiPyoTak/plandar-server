import { InjectionToken, ModuleMetadata } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

import { USER_STUB } from 'test/api/user/mock';

import { createMockAuthGuard } from './createMockJwtAuthGuard';

export default async function createTestingModule(
  metadata: ModuleMetadata,
  callback?: (token: InjectionToken) => unknown,
  builderCb?: (builder: TestingModuleBuilder) => unknown,
) {
  callback = callback ?? (() => undefined);
  const moduleMocker = new ModuleMocker(global);
  const mockUser = Object.assign({}, USER_STUB);
  const mockJwtAuthGuard = createMockAuthGuard(mockUser);

  const customMetadata = {
    ...metadata,
    providers: [
      ...(metadata.providers ?? []),
      { provide: APP_GUARD, useValue: mockJwtAuthGuard },
    ],
  };

  const testingModuleBuilder = await Test.createTestingModule(
    customMetadata,
  ).useMocker((token) => {
    const callbackResult = callback(token);

    if (callbackResult) {
      return callbackResult;
    }

    if (typeof token === 'function') {
      const mockMetadata = moduleMocker.getMetadata(
        token,
      ) as MockFunctionMetadata<any, any>;
      const Mock = moduleMocker.generateFromMetadata(mockMetadata);
      return new Mock();
    }
  });

  if (builderCb) {
    builderCb(testingModuleBuilder);
  }

  return await testingModuleBuilder.compile();
}
