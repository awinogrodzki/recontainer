import * as React from 'react';
import { withContainer, ContainerProps } from './withContainer';
import { shallow, mount } from 'enzyme';
import { ContainerProvider } from './ContainerProvider';
import { createContainer } from '../container';

describe('withContainer', () => {
  it('should throw descriptive error if component is rendered not in ContainerContext provider', () => {
    const MockComponent = () => <div />;
    const MockComponentWithContainer = withContainer(MockComponent);

    expect(() => shallow(<MockComponentWithContainer />)).toThrow(
      'Recontainer: withContainer higher order component used outside of the ContainerContext provider. Please make sure that you have wrapped MockComponent component with ContainerProvider.'
    );
  });

  it('should receive container from container provider', () => {
    const MockComponent: React.FunctionComponent<
      ContainerProps<{ movieService: string }>
    > = ({ container }) => <div>{container.get('movieService')}</div>;
    const MockComponentWithContainer = withContainer(MockComponent);
    const container = createContainer({
      movieService: () => 'Hello from movieService!',
    });

    const wrapper = mount(
      <ContainerProvider container={container}>
        <MockComponentWithContainer />
      </ContainerProvider>
    );

    expect(wrapper.text()).toBe('Hello from movieService!');
  });
});
