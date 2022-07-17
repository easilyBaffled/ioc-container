import {
  ContainerDef,
  LazyConstructor,
  Key,
  Type,
  ServiceInterface,
} from './index.d';

import { isPrimitive, createContainerProxy } from './utils';

export class Container implements ContainerDef {
  private registrationMap: Map<string, unknown> = new Map();
  private serviceMap: Map<string, ServiceInterface> = new Map();

  constructor() {
    return createContainerProxy(this);
  }

  register(service: Key, lazyConstructor?: LazyConstructor) {
    if (this.isRegistered(service))
      throw Error(`${service?.name ?? service} has already been registered`);

    const constuctor =
      lazyConstructor ??
      {
        [true as any]: () => service,
        [!!service?.name as any]: () => service(),
        [!!service?.constructor as any]: () => new service(),
        [isPrimitive(service) as any]: () => service,
      }[true as any];

    this.registrationMap.set(service?.name ?? service, constuctor);
    return createContainerProxy(this);
  }
  isRegistered(service: Key) {
    return this.registrationMap.has(service?.name ?? service);
  }

  inject(target: {}, injector: (c: ContainerDef) => {}) {
    return Object.assign(target, injector(this));
  }
}
