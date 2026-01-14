import {
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import { LocationContext, NavigateContext } from './contexts';
import type { Location } from './definitions';
import { isSameLocation, locationToUrl, readLocation } from './helpers';

export function Router({ children }: PropsWithChildren) {
  const [currentLocation, setCurrentLocation] =
    useState<Location>(readLocation());

  const emitLocationChange = useCallback(() => {
    const next = readLocation();
    if (isSameLocation(next, currentLocation)) {
      return;
    }
    setCurrentLocation(next);
  }, [currentLocation]);

  useEffect(() => {
    window.addEventListener('popstate', emitLocationChange);
    window.addEventListener('hashchange', emitLocationChange);

    return () => {
      window.removeEventListener('popstate', emitLocationChange);
      window.removeEventListener('hashchange', emitLocationChange);
    };
  }, [emitLocationChange]);

  const navigate = useCallback(
    (location: Location) => {
      window.history.pushState({}, '', locationToUrl(location));
      emitLocationChange();
    },
    [emitLocationChange]
  );

  return (
    <LocationContext value={currentLocation}>
      <NavigateContext value={navigate}>{children}</NavigateContext>
    </LocationContext>
  );
}
