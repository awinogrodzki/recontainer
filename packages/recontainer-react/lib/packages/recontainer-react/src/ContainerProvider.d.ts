import * as React from 'react';
import { Container } from '../../../src/container';
export interface ContainerProviderProps {
    container: Container<any>;
    children: React.ReactNode;
}
export declare const ContainerProvider: React.FunctionComponent<ContainerProviderProps>;
