import * as React from 'react';
import { Container } from '../container';
export interface ContainerProps<T> {
    container: Container<T>;
}
export declare const withContainer: <T, P extends ContainerProps<T>>(Component: React.ComponentType<P>) => React.ForwardRefExoticComponent<React.PropsWithoutRef<Pick<P, Exclude<keyof P, "container">>> & React.RefAttributes<unknown>>;
