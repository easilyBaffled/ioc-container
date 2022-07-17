export interface ServiceInterface {}

export interface Type<T> extends Function {
  new (...args: any[]): T;
}

export type Key = ServiceKey | Function | string | number;

export interface ServiceKey extends Function {
  constructor?: { name: string };
}

type LazyConstructor = (c: Container) => ServiceInterface;

export interface ContainerDef {
  [service: string]: unknown;
  register(service: ServiceKey, lazyConstructor?: LazyConstructor): Container;
  isRegistered(service: ServiceKey): boolean;
}
