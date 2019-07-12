import * as React from 'react';
import { Container, StateFromContainer } from './container';
declare type PropsFromKeys<S, K extends keyof S> = {
    [P in K]: S[P];
};
export declare const createInject: <C extends Container<S>, S extends object = StateFromContainer<C>>(container: C) => <K extends keyof S>(...keys: K[]) => <P extends PropsFromKeys<S, K>>(Component: React.ComponentType<P>) => (props: Pick<P, Exclude<keyof P, K>>) => JSX.Element;
export {};
