jest.mock('typeorm-transactional', () => ({
  Transactional: () => {
    return (target, propertyKey, descriptor) => {
      return descriptor;
    };
  },
}));
