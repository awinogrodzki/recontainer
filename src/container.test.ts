import { createContainer, Container, ContainerConfig } from './container';

const config = {
  service: () => 'string',
};

describe('container', () => {
  it('should throw error if user tries to create container without config', () => {
    expect(() => createContainer(undefined as any)).toThrowError();
  });

  it('should return value of provided factory function', () => {
    const container = createContainer(config);
    const value = container.get('service');

    expect(value).toBe('string');
  });

  it('should throw error if there is no factory under given identifier', () => {
    const container = createContainer({
        service: undefined as any,
    });

    expect(() => container.get('service')).toThrowError();
  });

  it('should throw error if provided factory is other type than function', () => {
    const container = createContainer({
        service: 12 as any
    });

    expect(() => container.get('service')).toThrowError();
  });

  it('should be able to inject other defined dependencies', () => {
      enum ContainerKey {
          movieService = 'movieService',
          userService = 'userService',
      };
      type Config = ContainerConfig<{
          [ContainerKey.movieService]: (container: Container<Config>) => string;
          [ContainerKey.userService]: () => string;
      }>;
      const config: Config = {
          movieService: (container) => {
              return container.get(ContainerKey.userService);
          },
          userService: () => 'Hello from userService!'
      }
      const container = createContainer(config);

      expect(container.get(ContainerKey.movieService)).toBe('Hello from userService!');
  });

    it('should not create the same instance of object twice', () => {
        enum ContainerKey {
            movieService = 'movieService',
            userService = 'userService',
            imageService = 'imageService',
        };
        type Config = ContainerConfig<{
            [ContainerKey.imageService]: (container: Container<Config>) => string;
            [ContainerKey.movieService]: (container: Container<Config>) => string;
            [ContainerKey.userService]: () => string;
        }>;
        const userServiceFactory = jest.fn(() => 'Hello from userService!');
        const config: Config = {
            imageService: (container) => container.get(ContainerKey.userService),
            movieService: (container) => container.get(ContainerKey.userService),
            userService: userServiceFactory,
        }
        const container = createContainer(config);
        container.get(ContainerKey.imageService);
        container.get(ContainerKey.movieService);
        
        expect(userServiceFactory).not.toHaveBeenCalledTimes(2);
    })
});
