import type { Resource } from '@/definitions/types';

export interface StoreState {
  readonly resources: readonly Resource[];
}
