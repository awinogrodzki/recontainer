import * as React from 'react';
import { createInject } from './inject';
import { createContainer, ContainerConfig } from './container';
import { mount, shallow } from 'enzyme';
import { ContainerProvider } from './ContainerProvider';

describe('inject', () => {
  it('should inject container elements to component as props', () => {
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
    interface DummyComponentProps {
      greeting: Container['greeting'];
    }

    const config: ContainerConfig<Container> = {
      config: () => ({ apiKey: 'apiKey' }),
      user: () => ({ name: 'John Doe', email: 'john@doe.com' }),
      greeting: container => `Hello ${container.get('user').name}!`,
    };
    const container = createContainer(config);
    const inject = createInject<Container>();
    const DummyComponent: React.FunctionComponent<DummyComponentProps> = ({
      greeting,
    }) => <span>{greeting}</span>;
    const DummyComponentWithGreeting = inject('greeting')(DummyComponent);

    const wrapper = mount(
      <ContainerProvider container={container}>
        <DummyComponentWithGreeting />
      </ContainerProvider>
    );

    expect(wrapper.text()).toBe('Hello John Doe!');
  });

  it('should throw descriptive error if inject is used outside of container context', () => {
    const inject = createInject<{
      test: string;
    }>();
    const DummyComponent: React.FunctionComponent<{ test: string }> = ({
      test,
    }) => <span>{test}</span>;
    const DummyComponentWithGreeting = inject('test')(DummyComponent);

    expect(() => shallow(<DummyComponentWithGreeting />)).toThrowError(
      'Recontainer: inject higher order component used outside of the ContainerContext provider. Please make sure that you have wrapped DummyComponent component with ContainerProvider.'
    );
  });
});
