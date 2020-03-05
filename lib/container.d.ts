export interface Container<T> {
    get<K extends keyof T>(identifier: K): T[K];
    getAll(): T;
}
export declare type Factory<T, R> = (container: Container<T>) => R;
export declare type ContainerConfig<T> = {
    [K in keyof T]: Factory<T, T[K]>;
};
export declare type StateFromContainer<T> = T extends Container<infer X> ? X : never;
declare type StateFromConfig<T> = T extends ContainerConfig<infer X> ? X : never;
export declare const createContainer: <C extends ContainerConfig<any>, T extends StateFromConfig<C>>(config: C) => Container<T>;
export {};
