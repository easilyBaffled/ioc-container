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

export class Container implements ContainerDef {
  private registrationMap: Map<string, unknown> = new Map();
  private serviceMap: Map<string, ServiceInterface> = new Map();

  constructor() {
    return this.createContainerProxy(this);
  }

  createContainerProxy(obj: ContainerDef) {
    return new Proxy(obj, {
      get(target: ContainerDef, prop: string, prox) {
        if (prop in target) return target[prop];
        else if (target.serviceMap.has(prop))
          return target.serviceMap.get(prop);
        else if (target.registrationMap.has(prop)) {
          const builder = target.registrationMap.get(prop);

          const service = builder ? builder(prox) : prop;
          target.serviceMap.set(prop, service);
          return service;
        }
      },
    });
  }

  register(service: Key, lazyConstructor?: LazyConstructor) {
    if (this.isRegistered(service))
      throw Error(
        service?.constructor?.name ??
          service?.name ??
          service + ' has already been registered'
      );

    const constuctor =
      lazyConstructor ??
      {
        [true as any]: () => service,
        [!!service?.name as any]: () => service(),
        [!!service?.constructor as any]: () => new service(),
      }[true as any];

    this.registrationMap.set(service?.name ?? service, constuctor);
    return this.createContainerProxy(this);
  }
  isRegistered(service: Key) {
    return this.registrationMap.has(service?.name ?? service);
  }

  inject(target: {}, injector: (c: ContainerDef) => {}) {
    return Object.assign(target, injector(this));
  }
}
