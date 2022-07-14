/// <reference types="react" />
import { Container } from '../../../src/container';
export interface ContainerContextValue<T> {
    container: Container<T> | null;
}
export declare const ContainerContext: import("react").Context<ContainerContextValue<any>>;
