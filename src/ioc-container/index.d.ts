export interface ServiceInterface {}

export interface Type extends Function {
  new (...args: any[]): unknown;
}

export type Key = ServiceKey | Function | String | Number;

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
