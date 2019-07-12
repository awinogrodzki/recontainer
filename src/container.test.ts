import { createContainer, ContainerConfig } from './container';

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
      service: 12 as any,
    });

    expect(() => container.get('service')).toThrowError();
  });

  it('should be able to inject other defined dependencies', () => {
    type Spec = {
      movieService: string;
      userService: string;
    };
    type Config = ContainerConfig<Spec>;
    const config: Config = {
      movieService: container => {
        return container.get('userService');
      },
      userService: () => 'Hello from userService!',
    };
    const container = createContainer(config);

    expect(container.get('movieService')).toBe('Hello from userService!');
  });

  it('should not create the same element twice', () => {
    interface Container {
      imageService: string;
      movieService: string;
      userService: string;
    }

    const userServiceFactory = jest.fn(() => 'Hello from userService!');
    const config: ContainerConfig<Container> = {
      imageService: container => container.get('userService'),
      movieService: container => container.get('userService'),
      userService: userServiceFactory,
    };
    const container = createContainer(config);
    container.get('imageService');
    container.get('movieService');

    expect(userServiceFactory).toHaveBeenCalledTimes(1);
  });

  it('should return all elements', () => {
    interface Container {
      imageService: string;
      movieService: string;
      userService: string;
    }

    const config: ContainerConfig<Container> = {
      imageService: () => 'image',
      movieService: () => 'movie',
      userService: () => 'user',
    };

    const container = createContainer(config);

    expect(container.getAll()).toEqual({
      imageService: 'image',
      movieService: 'movie',
      userService: 'user',
    });
  });
});
