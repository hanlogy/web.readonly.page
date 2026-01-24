import type { Path } from './types';

export function pathToUrl({ pathname, search, hash }: Path): string {
  let queryString = search?.replace(/^\?*/, '');
  let hashString = hash?.replace(/^#*/, '');

  queryString = queryString ? `?${queryString}` : '';
  hashString = hashString ? `#${hashString}` : '';

  return `${pathname}${queryString}${hashString}`;
}

export function readPath(
  location: Pick<Location, 'pathname' | 'search' | 'hash'> = window.location
): Path {
  const fullHash = location.hash.replace(/^#/, '').split('#');
  return {
    pathname: location.pathname,
    search: location.search.replace(/^\?/, ''),
    hash: fullHash[0],
    anchor: fullHash.length > 1 ? fullHash.slice(1).join('#') : '',
  };
}

export function isSamePath(pathA: Path, pathB: Path): boolean {
  return pathToUrl(pathA) === pathToUrl(pathB);
}
