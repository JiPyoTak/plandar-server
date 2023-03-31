function omitKey(target: object, strs: string[]) {
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
