import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { mount } from 'enzyme';
import { ContainerConfig, createContainer } from '../container';
import { ContainerProvider } from './ContainerProvider';
import { createContainerHook } from './hook';

describe('index', () => {
  // it('should return initial state', () => {
  //   const initialState = 'Hello world!';
  //   const  = createStore({}, initialState);
  //   const wrapper: React.FunctionComponent = ({ children }) => (
  //     <StoreProvider>{children}</StoreProvider>
  //   );
  //   const { result } = renderHook(() => useStore(), { wrapper });

  //   expect(result.current[0]).toBe('Hello world!');
  // });

  it('should inject items via use container hook', () => {
    interface User {
      name: string;
      email: string;
    }
    interface Container {
      config: {
        apiKey: string;
      };
      user: User;
      greeting: string;
    }

    const config: ContainerConfig<Container> = {
      config: () => ({ apiKey: 'apiKey' }),
      user: () => ({ name: 'John Doe', email: 'john@doe.com' }),
      greeting: container => `Hello ${container.get('user').name}!`,
    };
    const container = createContainer(config);
    const useContainer = createContainerHook<Container>()
    const DummyComponent: React.FunctionComponent<{}> = () => {
      const { greeting, user } = useContainer('greeting', 'user');

      return (
        <span>{greeting}, {user.name}</span>
      )
    };

    const wrapper = mount(
      <ContainerProvider container={container}>
        <DummyComponent />
      </ContainerProvider>
    );

    expect(wrapper.text()).toBe('Hello John Doe!, John Doe');
  });
});
