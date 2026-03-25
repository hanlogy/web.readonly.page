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

export type StoreConfigs<SchemaT extends { [K in keyof SchemaT]: object }> = {
  [K in keyof SchemaT]: StoreConfig<SchemaT[K]>;
};
