import { InjectionToken, ModuleMetadata } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

export default async function createTestingModule(
  metadata: ModuleMetadata,
  callback?: (token: InjectionToken) => unknown,
) {
  callback = callback ?? (() => undefined);
  const moduleMocker = new ModuleMocker(global);

  return await Test.createTestingModule(metadata)
    .useMocker((token) => {
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
    })
    .compile();
}
