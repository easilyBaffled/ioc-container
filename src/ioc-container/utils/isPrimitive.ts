export function isPrimitive(test: unknown): boolean {
  return test !== Object(test);
}
