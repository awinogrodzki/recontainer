import * as React from 'react';
import { createInject } from './inject';
import { createContainer, ContainerConfig } from './container';
import { shallow } from 'enzyme';

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
      greeting: container =>
        `Hello ${container.get('user').name}!`,
    };
    const container = createContainer(config);
    const inject = createInject(container);
    const DummyComponent: React.FunctionComponent<DummyComponentProps> = ({
        greeting,
    }) => <span>{greeting}</span>;
    const DummyComponentWithGreeting = inject('greeting')(DummyComponent);
    
    const wrapper = shallow(<DummyComponentWithGreeting />);

    expect(wrapper.dive().text()).toBe('Hello John Doe!');
  });
});
