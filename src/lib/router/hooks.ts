import { useContext } from 'react';
import { LocationContext, NavigateContext } from './contexts';

export function useLocation() {
  const value = useContext(LocationContext);

  if (!value) {
    throw new Error('No LocationContext is provided');
  }

  return value;
}

export function useNavigate() {
  const value = useContext(NavigateContext);

  if (!value) {
    throw new Error('No NavigateContext is provided');
  }

  return value;
}
