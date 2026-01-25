import type { Resource } from '@/definitions/types';

export function mergeResources(
  existing: readonly Resource[],
  incoming: readonly Resource[]
): Resource[] {
  const map = new Map<string, Resource>();
  for (const e of existing) {
    map.set(e.id, e);
  }

  for (const e of incoming) {
    map.set(e.id, e);
  }
  return Array.from(map.values());
}
