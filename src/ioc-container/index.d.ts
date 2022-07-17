export interface ServiceInterface {}

export interface Type<T> extends Function {
  new (...args: any[]): T;
}

export type Key = ServiceKey | Function | unknown;

export interface ServiceKey extends Function {
  constructor?: { name: string };
}

type LazyConstructor = (c: Container) => ServiceInterface;

export interface ContainerDef {
  // [service: string]: unknown;
  registrationMap: Map<string, unknown>;
  serviceMap: Map<string, ServiceInterface>;
  register(service: ServiceKey, lazyConstructor?: LazyConstructor): Container;
  isRegistered(service: ServiceKey): boolean;
}
