import { useContext } from 'react';
import { StoreDispatchContext, StoreStateContext } from './contexts';

export function useStoreState() {
  const value = useContext(StoreStateContext);
  if (!value) {
    throw new Error('No StoreStateContext found');
  }

  return value;
}

export function useStoreDispatch() {
  const value = useContext(StoreDispatchContext);
  if (!value) {
    throw new Error('No StoreDispatchContext found');
  }

  return value;
}
