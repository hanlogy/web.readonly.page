import { useContext } from 'react';
import { LocationContext, NavigateContext } from './contexts';
import type { Path } from './types';

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

export function useNavigateBack() {
  const navigate = useNavigate();

  return (path: Path) => {
    if (window.history.state && window.history.state.index > 0) {
      navigate(-1);
    } else {
      navigate(path, { replace: true });
    }
  };
}
