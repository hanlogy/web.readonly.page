export type ResourceType = 'file' | 'collection';

interface ResourceBase {
  readonly id: string;
  readonly type: ResourceType;
  readonly name: string;
  readonly description?: string;
  readonly requiresAuth: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface FileResource extends ResourceBase {
  readonly url: string;
}

export interface CollectionResource extends ResourceBase {
  readonly baseUrl: string;
  readonly entryFile: string;
}

export type Resource = FileResource | CollectionResource;
