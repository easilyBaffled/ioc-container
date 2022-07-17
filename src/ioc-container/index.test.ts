import { assert, expect, test, describe, it } from 'vitest';

// Edit an assertion and save to see HMR in action

describe('IOC Container', () => {
  describe('Happy Path', () => {
    it.concurrent('should register A', () => {
      const actual = null;
      const expected = null;

      expect(actual).toEqual(expected);
    });
    it.concurrent('should register A(B) and B', () => {
      const actual = null;
      const expected = null;

      expect(actual).toEqual(expected);
    });
    it.concurrent('should be able to use A(B)', () => {
      const actual = null;
      const expected = null;

      expect(actual).toEqual(expected);
    });
  });
  describe('Error Handling', () => {
    it.concurrent(
      'should fail when getting A without registering it first',
      () => {
        const actual = null;
        const expected = null;

        expect(actual).toEqual(expected);
      }
    );
    it.concurrent('should fail when registering A twice', () => {
      const actual = null;
      const expected = null;

      expect(actual).toEqual(expected);
    });
    it.concurrent('should fail when using A(B) without registering B', () => {
      const actual = null;
      const expected = null;

      expect(actual).toEqual(expected);
    });
  });
});
