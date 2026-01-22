import { createContext, type Dispatch } from 'react';
import type { StoreAction } from './storeReducer';
import type { StoreState } from './types';

export const StoreStateContext = createContext<StoreState | null>(null);
export const StoreDispatchContext = createContext<Dispatch<StoreAction> | null>(
  null
);
