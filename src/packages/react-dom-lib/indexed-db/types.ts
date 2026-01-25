export interface IndexConfig<T> {
  readonly name: string;
  readonly keyPath: (keyof T & string) | readonly (keyof T & string)[];
  readonly options?: IDBIndexParameters;
}

export interface StoreConfig<T> {
  readonly keyPath: keyof T & string;
  readonly autoIncrement?: boolean;
  readonly indexes?: readonly IndexConfig<T>[];
}

export type StoreConfigs<S extends Record<string, unknown>> = {
  [K in keyof S]: StoreConfig<S[K]>;
};
