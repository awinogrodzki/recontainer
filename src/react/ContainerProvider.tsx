import * as React from 'react';
import { Container } from '../container';
import { ContainerContext } from './ContainerContext';

export interface ContainerProviderProps {
  container: Container<any>;
  children: React.ReactNode;
}

export const ContainerProvider: React.FunctionComponent<
  ContainerProviderProps
> = ({ container, children }) => (
  <ContainerContext.Provider value={{ container }}>
    {children}
  </ContainerContext.Provider>
);
