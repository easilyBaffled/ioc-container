export interface ServiceInterface {}

export interface ServiceConstructor {
  constructor?: { name: string };
  name?: string;
}

type LazyConstructor = (c: Container) => ServiceInterface;

export interface ContainerDef {
  register(
    service: ServiceConstructor,
    lazyConstructor?: LazyConstructor
  ): Container;
  isRegistered(service: ServiceConstructor): boolean;
}

export class Container implements ContainerDef {
  private registrationMap: Map<ServiceConstructor, unknown> = new Map();
  private serviceMap: Map<LazyConstructor, ServiceInterface> = new Map();
  register(service: ServiceConstructor, lazyConstructor?: LazyConstructor) {
    if (this.isRegistered(service))
      throw Error(
        service?.constructor?.name ??
          service?.name ??
          service + ' has already been registered'
      );

    this.registrationMap.set(service, lazyConstructor);
    return this;
  }
  isRegistered(service: ServiceConstructor) {
    return this.registrationMap.has(service);
  }
}
