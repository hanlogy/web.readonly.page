export type ResourceType = 'file' | 'collection';

export interface Resource {
  readonly id: string;
  readonly type: ResourceType;
  readonly name: string;
  readonly url: string;
  readonly description?: string;
  readonly requiresAuth: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
