import type { Location } from './types';

export function locationToUrl(location: Location) {
  return [
    location.pathname.replace(/#*$/, ''),
    location.hash?.replace(/^#*/, ''),
  ]
    .filter(Boolean)
    .join('#');
}

export function readLocation(): Location {
  return {
    pathname: window.location.pathname,
    hash: window.location.hash.replace(/^#*/, ''),
  };
}

export function isSameLocation(A: Location, B: Location) {
  return locationToUrl(A) === locationToUrl(B);
}
