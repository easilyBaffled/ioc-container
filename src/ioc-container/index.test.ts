import { expect, describe, it, beforeEach } from 'vitest';
import { Container, ContainerDef, ServiceKey } from './';
// Edit an assertion and save to see HMR in action

class A implements ServiceKey {
  constructor(dependencies?: {}) {
    return Object.assign(this, dependencies);
  }
}

class B implements ServiceKey {}

describe('IOC Container', () => {
  let c: ContainerDef;
  beforeEach(() => {
    c = new Container();
  });
  describe('Happy Path', () => {
    it.concurrent('should register A', () => {
      const actual = c.register(A as ServiceKey).isRegistered(A as ServiceKey);
      const expected = true;

      expect(actual).toEqual(expected);
    });
    it.concurrent('should register A and use A', () => {
      const actual = c.register(A as ServiceKey).A;
      const expected = new A();

      expect(actual).toEqual(expected);
    });
    it.concurrent('should register A with lazy builder', () => {
      const actual = c
        .register(A as ServiceKey, () => new A())
        .isRegistered(A as ServiceKey);
      const expected = true;

      expect(actual).toEqual(expected);
    });
    it.concurrent('should register A with lazy builder and use A', () => {
      const actual = c.register(A as ServiceKey, () => new A({ id: 0 })).A.id;
      const expected = new A({ id: 0 }).id;

      expect(actual).toEqual(expected);
    });
    it.concurrent.todo('should register A(B) and B', () => {
      const actual = null;
      const expected = null;

      expect(actual).toEqual(expected);
    });
    it.concurrent.todo('should be able to use A(B)', () => {
      const actual = null;
      const expected = null;

      expect(actual).toEqual(expected);
    });
    it.concurrent.todo('should be able to inject A(B) and use A(B)', () => {
      const actual = null;
      const expected = null;

      expect(actual).toEqual(expected);
    });
  });
  describe('Error Handling', () => {
    it.concurrent.todo(
      'should fail when getting A without registering it first',
      () => {
        const actual = null;
        const expected = null;

        expect(actual).toEqual(expected);
      }
    );
    it.concurrent.todo('should fail when registering A twice', () => {
      const actual = null;
      const expected = null;

      expect(actual).toEqual(expected);
    });
    it.concurrent.todo(
      'should fail when using A(B) without registering B',
      () => {
        const actual = null;
        const expected = null;

        expect(actual).toEqual(expected);
      }
    );
  });
});
