export type Container<
  T extends ContainerConfig<any>,
  K extends keyof T = keyof T
> = {
  get(identifier: K): ReturnType<T[K]>;
};

export type Factory<T extends ContainerConfig<any>, K extends keyof T> = (container: Container<T>) => ReturnType<T[K]>;

export type ContainerConfig<T extends ContainerConfig<any>> = {
  [K in keyof T]: Factory<T, K>;
};

export const createContainer = <T extends ContainerConfig<any>>(config: T) => {
  if (!config) {
    throw new Error('Recontainer: No config provided.');
  }

  const cache = new Map<string | number | symbol, any>();
  const container = {
    get: <K extends keyof T>(identifier: keyof T): ReturnType<T[K]> => {
      const factory = config[identifier];

      if (!factory) {
        throw new Error(
          `Recontainer: Error while getting factory from container. No factory registered for identifier "${identifier}". Consider adding a function described by "${identifier}" property in ContainerConfig object`
        );
      }

      if (typeof factory !== 'function') {
        throw new Error(
          `Recontainer: Incorrect factory provided. Check the value provided as factory in ContainerConfig object. It should be of type`
        );
      }

      const valueFromCache = cache.get(identifier);

      if (valueFromCache) {
        return valueFromCache;
      }

      const value = factory(container);

      cache.set(identifier, value);

      return value;
    },
  };

  return container;
};
