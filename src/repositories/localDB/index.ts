import type { Resource } from '@/definitions/types';
import {
  IndexedDB,
  type StoreConfigs,
} from '@/packages/react-dom-lib/indexed-db';

type Schema = {
  resources: Resource;
};

const configs: StoreConfigs<Schema> = {
  resources: {
    keyPath: 'id',
    indexes: [
      { name: 'type', keyPath: 'type' },
      { name: 'requiresAuth', keyPath: 'requiresAuth' },
      { name: 'name', keyPath: 'name' },
    ],
  },
};

let dbPromise: Promise<IndexedDB<Schema>> | null = null;

export const openDB = () =>
  (dbPromise ??= IndexedDB.open<Schema>({
    name: 'ReadonlyPage',
    version: 1,
    configs,
    onBlocked: () =>
      console.warn(
        'ReadonlyPage IndexedDB open/upgrade blocked by another tab.'
      ),
  }).catch((e) => {
    // allow retry after failure
    dbPromise = null;
    throw e;
  }));

export const closeDB = async () => {
  if (!dbPromise) {
    return;
  }

  (await dbPromise).close();
  dbPromise = null;
};

export async function upsertResource(resource: Resource): Promise<void> {
  const db = await openDB();
  await db.put('resources', resource);
}

export async function upsertManyResources(
  resources: readonly Resource[]
): Promise<void> {
  const db = await openDB();
  for (const resource of resources) {
    await db.put('resources', resource);
  }
}

export async function deleteResource(id: string): Promise<void> {
  const db = await openDB();
  await db.delete('resources', id);
}

export async function getResource(id: string): Promise<Resource | undefined> {
  const db = await openDB();
  return db.get('resources', id);
}

export async function getResources(): Promise<Resource[]> {
  const db = await openDB();
  const list = await db.getAll('resources');
  list.sort((A, B) => (A.createdAt > B.createdAt ? -1 : 1));

  return list;
}

export async function clearResources(): Promise<void> {
  const db = await openDB();
  await db.clear('resources');
}
