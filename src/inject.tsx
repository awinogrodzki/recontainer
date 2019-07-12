import * as React from 'react';
import { Container, StateFromContainer } from './container';
import { ContainerContextValue, ContainerContext } from './ContainerContext';

type PropsFromKeys<S, K extends keyof S> = {
  [P in K]: S[P];
};

interface Dependencies {
  config: string;
  test: number;
}

interface Props extends Dependencies {
  fromProps: string;
}

type Test = PropsFromKeys<Dependencies, 'config' | 'test'>;

type Test2 = WithoutProps<Test & Props, 'config' | 'test'>;

type WithoutProps<P, K> = Pick<P, Exclude<keyof P, K>>;

export const createInject = <T extends object>() => <K extends keyof T>(
  ...keys: K[]
) => <P extends PropsFromKeys<T, K>>(Component: React.ComponentType<P>) => (
  props: WithoutProps<P, K>
) => {
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

  return <Component {...(props as P)} {...values} />;
};
