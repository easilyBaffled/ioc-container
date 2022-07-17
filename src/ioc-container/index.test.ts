import { expect, describe, it } from 'vitest';
import { Container, ContainerDef, ServiceConstructor } from './';
// Edit an assertion and save to see HMR in action

class A implements ServiceConstructor {
  constructor(dependencies: {}) {
    return Object.assign(this, dependencies);
  }
}

class B implements ServiceConstructor {}

describe('IOC Container', () => {
  let c: ContainerDef;
  beforeEach(() => {
    c = new Container();
  });
  describe('Happy Path', () => {
    it.concurrent('should register A', () => {
      const actual = c.register(A).isRegistered(A);
      const expected = true;

      expect(actual).toEqual(expected);
    });
    it.concurrent.todo('should register A with lazy builder', () => {
      const actual = null;
      const expected = null;

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
