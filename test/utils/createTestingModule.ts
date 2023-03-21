import { InjectionToken, ModuleMetadata } from '@nestjs/common';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

export default async function createTestingModule(
  metadata: ModuleMetadata,
  callback?: (token: InjectionToken) => unknown,
  builderCb?: (builder: TestingModuleBuilder) => unknown,
) {
  callback = callback ?? (() => undefined);
  const moduleMocker = new ModuleMocker(global);

  const testingModuleBuilder = await Test.createTestingModule(
    metadata,
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
