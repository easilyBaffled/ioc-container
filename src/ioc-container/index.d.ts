export interface ServiceInterface {}

export interface Type extends Function {
  new (...args: any[]): unknown;
}

export type ServiceKey = Class | Function | String | Number;

type LazyConstructor = (c: Container) => unknown;

export interface ContainerDef {
  [service: string]: unknown;
  // registrationMap: Map<string, unknown>;
  // serviceMap: Map<string, ServiceInterface>;
  register(service: ServiceKey, lazyConstructor?: LazyConstructor): Container;
  isRegistered(service: ServiceKey): boolean;
  inject<T>(target: T, injector: (c: ContainerDef) => T): T;
}
