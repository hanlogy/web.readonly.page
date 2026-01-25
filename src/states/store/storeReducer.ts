import type { Resource } from '@/definitions/types';
import type { StoreState } from './types';

export type StoreAction =
  | {
      type: 'upsertResource';
      payload: Resource;
    }
  | {
      type: 'deleteResource';
      payload: string;
    }
  | {
      type: 'importResource';
      payload: readonly Resource[];
    };

export function storeReducer(
  state: StoreState,
  { type, payload }: StoreAction
): StoreState {
  const { resources } = state;
  switch (type) {
    case 'upsertResource': {
      if (resources.some((e) => e.id === payload.id)) {
        return {
          ...state,
          resources: resources.map((e) => (e.id === payload.id ? payload : e)),
        };
      } else {
        return {
          ...state,
          resources: [payload, ...resources],
        };
      }
    }
    case 'deleteResource': {
      return {
        ...state,
        resources: resources.filter((e) => e.id !== payload),
      };
    }
    case 'importResource': {
      return {
        ...state,
        resources: payload,
      };
    }
  }
}
