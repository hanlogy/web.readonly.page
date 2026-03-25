import { requestToPromise, transactionDone } from './helpers';
import type { StoreConfigs } from './types';

export class IndexedDB<SchemaT extends { [K in keyof SchemaT]: object }> {
  private constructor(db: IDBDatabase) {
    this.db = db;

    // Close cleanly if another tab upgrades the DB
    this.db.onversionchange = () => this.db.close();
  }

  private db: IDBDatabase;

  static async open<SchemaT extends { [K in keyof SchemaT]: object }>({
    name,
    version,
    configs,
    onBlocked,
    onUpgrade,
  }: {
    name: string;
    version: number;
    configs: StoreConfigs<SchemaT>;
    onBlocked?: () => void;
    onUpgrade?: (ctx: {
      db: IDBDatabase;
      transaction: IDBTransaction;
      oldVersion: number;
      newVersion: number | null;
    }) => void;
  }): Promise<IndexedDB<SchemaT>> {
    const request = indexedDB.open(name, version);

    request.onupgradeneeded = (event) => {
      const db = request.result;

      for (const storeName in configs) {
        const config = configs[storeName];

        let store: IDBObjectStore;
        if (db.objectStoreNames.contains(storeName)) {
          store = request.transaction!.objectStore(storeName);
        } else {
          store = db.createObjectStore(storeName, {
            keyPath: config.keyPath,
            autoIncrement: config.autoIncrement,
          });
        }

        for (const index of config.indexes ?? []) {
          if (!store.indexNames.contains(index.name)) {
            const keyPath = Array.isArray(index.keyPath)
              ? [...index.keyPath]
              : index.keyPath;
            store.createIndex(index.name, keyPath, index.options);
          }
        }
      }

      onUpgrade?.({
        db,
        transaction: request.transaction!,
        oldVersion: event.oldVersion,
        newVersion: event.newVersion,
      });
    };

    if (onBlocked) {
      request.onblocked = () => onBlocked!();
    }

    const db = await requestToPromise(request);
    return new IndexedDB<SchemaT>(db);
  }

  close() {
    this.db.close();
  }

  private async withStore<K extends keyof SchemaT, R>(
    store: K,
    mode: IDBTransactionMode,
    operation: (objectStore: IDBObjectStore) => IDBRequest<R>
  ): Promise<R> {
    const transaction = this.db.transaction(String(store), mode);
    const objectStore = transaction.objectStore(String(store));

    try {
      const result = await requestToPromise(operation(objectStore));
      await transactionDone(transaction);
      return result;
    } catch (error) {
      try {
        transaction.abort();
      } catch {
        //
      }
      throw error;
    }
  }

  async get<K extends keyof SchemaT>(
    store: K,
    key: IDBValidKey
  ): Promise<SchemaT[K] | undefined> {
    const value = await this.withStore<K, SchemaT[K]>(
      store,
      'readonly',
      (store) => store.get(key)
    );

    return value ?? undefined;
  }

  async put<K extends keyof SchemaT>(
    store: K,
    value: SchemaT[K]
  ): Promise<IDBValidKey> {
    return this.withStore(store, 'readwrite', (store) => store.put(value));
  }

  async delete<K extends keyof SchemaT>(
    store: K,
    key: IDBValidKey
  ): Promise<void> {
    await this.withStore(store, 'readwrite', (store) => store.delete(key));
  }

  async getAll<K extends keyof SchemaT>(store: K): Promise<SchemaT[K][]> {
    return this.withStore<K, SchemaT[K][]>(store, 'readonly', (store) =>
      store.getAll()
    );
  }

  async clear<K extends keyof SchemaT>(store: K): Promise<void> {
    await this.withStore(store, 'readwrite', (store) => store.clear());
  }
}
