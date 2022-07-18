/**
 * Because `typeof` just doesn't do it for us
 */
export function isPrimitive(test: unknown): boolean {
  return test !== Object(test);
}
