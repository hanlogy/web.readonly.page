import {
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import { LocationContext, NavigateContext } from './contexts';
import { isSamePath, pathToUrl, readPathFromLocation } from './helpers';
import type { Path, NavigateOptions } from './types';

export function Router({ children }: PropsWithChildren) {
  const [currentPath, setCurrentPath] = useState<Path>(readPathFromLocation());

  // Ensure initial history state
  useEffect(() => {
    if (!window.history.state) {
      window.history.replaceState({ index: 0 }, '');
    }
  }, []);

  const emitPathChange = useCallback(() => {
    const next = readPathFromLocation();
    if (isSamePath(next, currentPath)) {
      return;
    }
    setCurrentPath(next);
  }, [currentPath]);

  useEffect(() => {
    window.addEventListener('popstate', emitPathChange);
    window.addEventListener('hashchange', emitPathChange);

    return () => {
      window.removeEventListener('popstate', emitPathChange);
      window.removeEventListener('hashchange', emitPathChange);
    };
  }, [emitPathChange]);

  const navigate = useCallback(
    (target: Path | number, { replace = false }: NavigateOptions = {}) => {
      if (typeof target === 'number') {
        window.history.go(target);
        return;
      }

      const url = pathToUrl(target);
      const currentIndex = window.history.state?.index ?? 0;

      if (replace) {
        window.history.replaceState({ index: currentIndex }, '', url);
      } else {
        window.history.pushState({ index: currentIndex + 1 }, '', url);
      }

      emitPathChange();
    },
    [emitPathChange]
  );

  return (
    <LocationContext value={currentPath}>
      <NavigateContext value={navigate}>{children}</NavigateContext>
    </LocationContext>
  );
}
