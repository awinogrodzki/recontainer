export interface Container<T> {
  get<K extends keyof T>(identifier: K): T[K];
  getAll(): T;
}

export type Factory<T, R> = (container: Container<T>) => R;

export type ContainerConfig<T> = {
  [K in keyof T]: Factory<T, T[K]>;
};

export type StateFromContainer<T> = T extends Container<infer X> ? X : never;
type StateFromConfig<T> = T extends ContainerConfig<infer X> ? X : never;

export const createContainer = <
  C extends ContainerConfig<any>,
  T extends StateFromConfig<C>
>(
  config: C
): Container<T> => {
  if (!config) {
    throw new Error('Recontainer: No config provided.');
  }

  const cache = new Map<keyof C, any>();
  const container = {
    get: <K extends keyof C>(identifier: keyof C): ReturnType<C[K]> => {
      const factory = config[identifier];

      if (!factory) {
        throw new Error(
          `Recontainer: Error while getting factory from container. No factory registered for identifier "${identifier}". Consider adding a function described by "${identifier}" property in ContainerConfig object.`
        );
      }

      if (typeof factory !== 'function') {
        throw new Error(
          `Recontainer: Incorrect factory provided. Check if the value provided as factory in ContainerConfig object is a function.`
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
    getAll: (): T => {
      return Object.keys(config).reduce(
        (spec, key) => ({
          ...spec,
          [key]: container.get(key),
        }),
        {}
      ) as T;
    },
  };

  return container;
};
