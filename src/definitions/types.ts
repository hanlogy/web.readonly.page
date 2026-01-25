export type ResourceType = 'file' | 'collection';

interface ResourceBase {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly requiresAuth: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface FileResource extends ResourceBase {
  readonly type: 'file';
  readonly url: string;
}

export interface CollectionResource extends ResourceBase {
  readonly type: 'collection';
  readonly baseUrl: string;
  readonly entryFile: string;
}

export type Resource = FileResource | CollectionResource;
