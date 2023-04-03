function omitKey<TType extends object, TKey extends keyof TType>(
  target: TType,
  strs: TKey[],
): Omit<TType, TKey> {
  return strs.reduce(
    (obj, key) => {
      if (Object.hasOwnProperty.call(target, key)) {
        delete obj[key];
      }
      return obj;
    },
    { ...target },
  );
}

export { omitKey };
