import * as React from 'react';
import { ContainerContextValue, ContainerContext } from './ContainerContext';

type PropsFromKeys<S, K extends keyof S> = {
  [P in K]: S[P];
};

type WithoutProps<P, K> = Pick<P, Exclude<keyof P, K>>;

export const createInject = <T extends object>() => <K extends keyof T>(
  ...keys: K[]
) => <P extends PropsFromKeys<T, K>>(Component: React.ComponentType<P>) =>
  React.forwardRef((props: WithoutProps<P, K>, ref) => {
    const { container } = React.useContext<ContainerContextValue<T>>(
      ContainerContext
    );

    if (!container) {
      throw new Error(
        `Recontainer: inject higher order component used outside of the ContainerContext provider. Please make sure that you have wrapped ${Component.name} component with ContainerProvider.`
      );
    }

    const values = keys.reduce(
      (keyValues, key) => ({
        ...keyValues,
        [key]: container.get(key),
      }),
      {}
    );

    return <Component {...(props as P)} {...values} ref={ref} />;
  });
