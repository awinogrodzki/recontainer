import { ContainerContextValue, ContainerContext } from "./ContainerContext";
import { useContext } from "react";
import { Container } from "../container";

interface UseContainer<T extends object> {
  (): Container<T>;
  <K extends keyof T>(key: K): Pick<T, K>;
  <K extends keyof T>(key: K, ...keys: K[]): Pick<T, K>;
} 

export const createContainerHook = <T extends object>(): UseContainer<T> => (...keys: any[]) => {
  const { container } = useContext<ContainerContextValue<T>>(
    ContainerContext
  );

  if (!container) {
    throw new Error(
      `Recontainer: container hook cannot be used outside of the ContainerContext provider.`
    );
  }

  if (keys.length === 0) {
    return container;
  } 

  return keys.reduce((dependencies, key) => ({ ...dependencies, [key]: container.get(key) }), {});
};