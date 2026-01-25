import { useReducer, type PropsWithChildren } from 'react';
import { StoreDispatchContext, StoreStateContext } from './contexts';
import { storeReducer } from './storeReducer';
import type { StoreState } from './types';

export function StoreProvider({
  children,
  resources: initialResources,
}: PropsWithChildren<StoreState>) {
  const [value, dispatch] = useReducer(storeReducer, {
    resources: initialResources,
  });

  return (
    <StoreStateContext value={value}>
      <StoreDispatchContext value={dispatch}>{children}</StoreDispatchContext>
    </StoreStateContext>
  );
}
