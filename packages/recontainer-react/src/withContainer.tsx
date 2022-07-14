import * as React from 'react';
import { Container } from '../../../src/container';
import { ContainerContext, ContainerContextValue } from './ContainerContext';

export interface ContainerProps<T> {
  container: Container<T>;
}

type WithoutContainerProps<T extends ContainerProps<any>> = Pick<
  T,
  Exclude<keyof T, keyof ContainerProps<any>>
>;

export const withContainer = <T, P extends ContainerProps<T>>(
  Component: React.ComponentType<P>
) =>
  React.forwardRef((props: WithoutContainerProps<P>, ref) => {
    const { container } = React.useContext<ContainerContextValue<T>>(
      ContainerContext
    );

    if (!container) {
      throw new Error(
        `Recontainer: withContainer higher order component used outside of the ContainerContext provider. Please make sure that you have wrapped ${Component.name} component with ContainerProvider.`
      );
    }

    return <Component {...(props as P)} container={container} ref={ref} />;
  });
