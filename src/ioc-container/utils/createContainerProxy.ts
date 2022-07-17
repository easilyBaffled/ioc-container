import { ContainerDef } from '../index.d';

export function createContainerProxy(obj: ContainerDef) {
  return new Proxy(obj, {
    get(target: ContainerDef, prop: string, prox) {
      if (prop in target) return target[prop];
      else if (target.serviceMap.has(prop)) return target.serviceMap.get(prop);
      else if (target.registrationMap.has(prop)) {
        const builder = target.registrationMap.get(prop);

        const service = builder ? builder(prox) : prop;
        target.serviceMap.set(prop, service);
        return service;
      } else {
        throw new Error(`${prop} has not been registered`);
      }
    },
  });
}
