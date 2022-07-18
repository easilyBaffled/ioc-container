import { ContainerDef } from '../index.d';

/**
 * I wanted to obscure what exists on the IoC container, while also making it increadibly easy to use.
 * I used a Proxy to intercept all access to the container instance. If a service has been registered, this Proxy will make it acessable, without letting developers directly touching it.
 */
export function createContainerProxy(obj: ContainerDef): ContainerDef {
  return new Proxy(obj, {
    get(target: ContainerDef, prop: string, prox) {
      if (prop in target) return target[prop];
      else if (target.serviceMap.has(prop)) return target.serviceMap.get(prop);
      else if (target.registrationMap.has(prop)) {
        const builder: Function = target.registrationMap.get(prop);

        const service = builder ? builder(prox) : prop;
        target.serviceMap.set(prop, service);
        return service;
      } else {
        throw new Error(`${prop} has not been registered`);
      }
    },
  });
}
