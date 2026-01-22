/**
 * Inspired by https://github.com/lukeed/clsx
 */

type Value =
  | string
  | number
  | boolean
  | null
  | undefined
  | Value[]
  | Record<string, unknown>;

export function clsx(...args: Value[]): string {
  const result: string[] = [];

  const walk = (value: Value): void => {
    if (!value) {
      return;
    }

    if (typeof value === 'string' || typeof value === 'number') {
      result.push(String(value));
      return;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        walk(item);
      }
      return;
    }

    if (typeof value === 'object') {
      for (const key of Object.keys(value)) {
        if (value[key]) {
          result.push(key);
        }
      }
    }
  };

  for (const arg of args) {
    walk(arg);
  }

  return result.join(' ');
}
