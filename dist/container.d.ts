export declare type Container<T extends ContainerConfig<any>, K extends keyof T = keyof T> = {
    get(identifier: K): ReturnType<T[K]>;
};
export declare type Factory<T extends ContainerConfig<any>, K extends keyof T> = (container: Container<T>) => ReturnType<T[K]>;
export declare type ContainerConfig<T extends ContainerConfig<any>> = {
    [K in keyof T]: Factory<T, K>;
};
export declare const createContainer: <T extends ContainerConfig<any>>(config: T) => {
    get: <K extends keyof T>(identifier: keyof T) => ReturnType<T[K]>;
};
