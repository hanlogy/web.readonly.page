import type { Newable } from '../types';

export function getGlobalConstructor<TInstance>(
  name: 'AbortController' | 'FormData' | 'TextDecoder'
): Newable<TInstance> | undefined {
  const value = globalThis[name];

  if (typeof value !== 'function') {
    return undefined;
  }

  return value as Newable<TInstance>;
}

export function getGlobalFunction<
  TFunction extends (...arguments_: never[]) => unknown,
>(name: 'fetch'): TFunction | undefined {
  const record = globalThis as Record<string, unknown>;
  const value = record[name];

  if (typeof value !== 'function') {
    return undefined;
  }

  return value as TFunction;
}
