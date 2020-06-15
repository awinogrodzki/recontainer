import { Container } from "../container";
interface UseContainer<T extends object> {
    (): Container<T>;
    <K extends keyof T>(key: K): Pick<T, K>;
    <K extends keyof T>(key: K, ...keys: K[]): Pick<T, K>;
}
export declare const createContainerHook: <T extends object>() => UseContainer<T>;
export {};
