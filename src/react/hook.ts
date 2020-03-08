import { ContainerContextValue, ContainerContext } from "./ContainerContext";
import { useContext } from "react";

export const createContainerHook = <T extends object>() => <K extends keyof T>(...keys: K[]) => {
  const { container } = useContext<ContainerContextValue<T>>(
    ContainerContext
  );

  if (!container) {
    throw new Error(
      `Recontainer: container hook cannot be used outside of the ContainerContext provider.`
    );
  }

  return keys.reduce((dependencies, key) => ({ ...dependencies, [key]: container.get(key) }), {}) as T;
};
