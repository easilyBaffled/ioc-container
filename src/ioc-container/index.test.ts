import { expect, describe, it, beforeEach } from 'vitest';
import { Container, ContainerDef, Klass } from './';
// Edit an assertion and save to see HMR in action

class A {
  constructor(dependencies?: {}) {
    return Object.assign(this, dependencies);
  }
}

class B {}

const AWithB = new A({ B: new B() });

function catchAndReturn(toxicFn: Function) {
  try {
    return toxicFn();
  } catch (e) {
    return e.message;
  }
}

describe('IOC Container', () => {
  let c: ContainerDef;
  beforeEach(() => {
    c = new Container();
  });
  it('A full Example, should not fail', () => {
    const Analytics = {
      init(id: string, ...middleWare: Function[]) {
        return {
          triggerEvent(event: string) {
            middleWare.forEach((fn) => {
              console.log(fn);
              fn(event);
            });
            return event;
          },
        };
      },
    };

    function Logger(...input: unknown[]) {
      console.log(...input);
    }

    c.register(Logger, () => Logger)
      .register('Analytics', (c: ContainerDef) =>
        Analytics.init(c.SECURE_ID, c.Logger)
      )
      .register('SECURE_ID');

    const analyticsAbstraction = c.inject({}, (c) => ({
      sendEvent: c.Analytics.triggerEvent,
    }));

    analyticsAbstraction.sendEvent('test');
  });
  describe('Happy Path', () => {
    it('should register A', () => {
      const actual = c.register(A).isRegistered(A);
      const expected = true;

      expect(actual).toEqual(expected);
    });
    it('should register A and use A', () => {
      const actual = c.register(A).A;
      const expected = new A();

      expect(actual).toEqual(expected);
    });
    it('should register A with lazy builder', () => {
      const actual = c.register(A, () => new A()).isRegistered(A);
      const expected = true;

      expect(actual).toEqual(expected);
    });
    it('should register A with lazy builder and use A', () => {
      const actual = c.register(A, () => new A({ id: 0 })).A.id;
      const expected = new A({ id: 0 }).id;

      expect(actual).toEqual(expected);
    });
    it('should register A(B) and B', () => {
      const actual = c
        .register(A, (c) => new A({ B: c.B }))
        .register(B)
        .isRegistered(B);
      const expected = true;

      expect(actual).toEqual(expected);
    });
    it('should be able to use A(B)', () => {
      const actual = c.register(A, (c) => new A({ B: c.B })).register(B).A.B;
      const expected = AWithB.B;

      expect(actual).toEqual(expected);
    });
    it('should be able to inject A(B) and use A(B)', () => {
      const actual = c
        .register(A, (c) => new A({ B: c.B }))
        .register(B)
        .inject({}, (c: ContainerDef) => ({
          a: c.A,
          b: c.B,
        })).a.B;
      const expected = AWithB.B;

      expect(actual).toEqual(expected);
    });
  });
  describe('Error Handling', () => {
    it('should fail when getting A without registering it first', () => {
      const actual = catchAndReturn(() => c.A);
      const expected = 'A has not been registered';

      expect(actual).toEqual(expected);
    });
    it('should fail when registering A twice', () => {
      const actual = catchAndReturn(() => c.register(A).register(A));
      const expected = 'A has already been registered';

      expect(actual).toEqual(expected);
    });
    it('should fail when using A(B) without registering B', () => {
      const actual = catchAndReturn(
        () => c.register(A, (c) => new A({ B: c.B })).A
      );
      const expected = 'B has not been registered';

      expect(actual).toEqual(expected);
    });
  });
});
