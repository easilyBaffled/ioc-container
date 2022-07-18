import {
  ContainerDef,
  LazyConstructor,
  Key,
  Type,
  ServiceInterface,
} from './index.d';

import { isPrimitive, createContainerProxy } from './utils';
/**
 * The purpose of this controler is to contain an organize services and their dependencies in order to remove that responsibility and mental overhead from our developer's day-to-day work.
 *
 *
 * @example
 * const container = new Container();
 * container
 *  .register(someThingWithDependancies, c => someThingWithDependancies.init( c.SOME_CONSTANT, c.SomeClass ))
 *  .register(SOME_CONSTANT)
 *  .register(SomeClass)
 *
 * container
 *  .inject(somethingThatWillGetDirectlyUsed, c => ({
 *    useful: c.someThingWithDependancies.someFunction
 *  }))
 */
export class Container implements ContainerDef {
  private registrationMap: Map<string, Function> = new Map(); // TODO: does this need to be a map?
  private serviceMap: Map<string, ServiceInterface> = new Map(); // TODO: does this need to be a map?

  constructor() {
    return createContainerProxy(this);
  }

  /**
   * A chainable function to add services to the container.
   * Note, services do not have to be registered in any particular order, even if they have dependencies
   *
   * @example
   * container
   *  .register(someThingWithDependancies, c => someThingWithDependancies.init( c.SOME_CONSTANT, c.SomeClass ))
   *  .register(SOME_CONSTANT)
   *  .register(SomeClass)
   */
  register(service: Key, lazyConstructor?: LazyConstructor): ContainerDef {
    if (this.isRegistered(service))
      throw Error(`${service?.name ?? service} has already been registered`);

    const constuctor =
      lazyConstructor ??
      // this is how I make up for a lack of pattern matching. It takes advantage of the notion of key overriding in objects, so the **last** `true` key will be the one that is used.
      {
        [true as any]: () => service,
        [!!service?.name as any]: () => (service as Function)(),
        [!!service?.constructor as any]: () => new (service as Type)(),
        [isPrimitive(service) as any]: () => service,
      }[true as any];

    this.registrationMap.set(service?.name ?? service, constuctor);
    return createContainerProxy(this); // this function is chainable, but it needs to reproxy each time to allow for some of the access magic
  }
  isRegistered(service: Key): boolean {
    return this.registrationMap.has(service?.name ?? service);
  }

  /**
   * Add service functionality to an object
   *
   * @example
   * container
   *  .inject(component, c => ({
   *    takeAction: (...payload) => c.store.dispatch( c.SOME_ACTION, payload ),
   *    ...c.store.getStore().data
   *  }))
   */
  inject<T>(target: T, injector: (c: ContainerDef) => T): T {
    return Object.assign(target, injector(this));
  }
}
