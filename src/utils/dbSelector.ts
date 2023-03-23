import { InternalServerErrorException } from '@nestjs/common';

const selector = (target: object, params: string[]) => {
  const ret = {};
  for (const p of params) {
    if (p.includes('.')) {
      let tmp = ret;
      const arr = p.split('.');
      arr.forEach((path, idx) => {
        if (idx === arr.length - 1) {
          tmp[path] = target[path];
        } else {
          tmp[path] ??= {};
          tmp = tmp[path];
        }
      });
    } else {
      ret[p] = target[p];
    }
  }
  return ret;
};

const dbSelector = (target: object | object[], params: string[]) => {
  if (Array.isArray(target)) {
    return target.map((t) => selector(t, params));
  } else if (typeof target === 'object') {
    return selector(target, params);
  }

  throw new InternalServerErrorException(
    'dbSelector: result is not object or array',
  );
};

export { dbSelector };
