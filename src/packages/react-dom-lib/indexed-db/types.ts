export interface IndexConfig<T> {
  readonly name: string;
  readonly keyPath: (keyof T & string) | ReadonlyArray<keyof T & string>;
  readonly options?: IDBIndexParameters;
}

export interface StoreConfig<T> {
  readonly keyPath: keyof T & string;
  readonly autoIncrement?: boolean;
  readonly indexes?: ReadonlyArray<IndexConfig<T>>;
}

export type StoreConfigs<S extends Record<string, unknown>> = {
  [K in keyof S]: StoreConfig<S[K]>;
};
