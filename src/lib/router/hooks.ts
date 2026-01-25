import { useContext } from 'react';
import { PathContext, NavigateContext } from './contexts';
import { parsePathHash } from './helpers';
import type { PartialPath } from './types';

export function usePath() {
  const value = useContext(PathContext);

  if (!value) {
    throw new Error('No PathContext is provided');
  }

  return value;
}

// TODO: Parse search into Record when needed.
export function useParsedPath() {
  const { hash, ...rest } = usePath();

  return { ...rest, hash: parsePathHash(hash) };
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

  return (path: PartialPath) => {
    if (window.history.state && window.history.state.index > 0) {
      navigate(-1);
    } else {
      navigate(path, { replace: true });
    }
  };
}
