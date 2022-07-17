export interface ServiceInterface {}

export interface ServiceKey {
  constructor?: { name: string };
  name?: string;
}

type LazyConstructor = (c: Container) => ServiceInterface;

export interface ContainerDef {
  register(service: ServiceKey, lazyConstructor?: LazyConstructor): Container;
  isRegistered(service: ServiceKey): boolean;
}

export class Container implements ContainerDef {
  private registrationMap: Map<ServiceKey, unknown> = new Map();
  private serviceMap: Map<LazyConstructor, ServiceInterface> = new Map();
  register(service: ServiceKey, lazyConstructor?: LazyConstructor) {
    if (this.isRegistered(service))
      throw Error(
        service?.constructor?.name ??
          service?.name ??
          service + ' has already been registered'
      );

    this.registrationMap.set(service, lazyConstructor);
    return this;
  }
  isRegistered(service: ServiceKey) {
    return this.registrationMap.has(service);
  }
}
