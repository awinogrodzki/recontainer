/// <reference types="react" />
import { Container } from './container';
export interface ContainerContextValue<T> {
    container: Container<T> | null;
}
export declare const ContainerContext: import("react").Context<ContainerContextValue<any>>;
