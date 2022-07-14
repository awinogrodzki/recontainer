import { createContext } from 'react';
import { Container } from '../container';

export interface ContainerContextValue<T> {
  container: Container<T> | null;
}
export const ContainerContext = createContext<ContainerContextValue<any>>({
  container: null,
});
