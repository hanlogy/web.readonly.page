import type { Path } from './types';

export function pathToUrl({
  pathname = '',
  search = '',
  hash = '',
}: Partial<Path>): string {
  let queryString = search.replace(/^\?*/, '');
  let hashString = hash.replace(/^#*/, '');

  queryString = queryString ? `?${queryString}` : '';
  hashString = hashString ? `#${hashString}` : '';

  return `${pathname}${queryString}${hashString}`;
}

export function readPathFromLocation(
  location: Pick<Location, 'pathname' | 'search' | 'hash'> = window.location
): Path {
  return {
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,
  };
}

export function isSamePath(
  pathA: Partial<Path>,
  pathB: Partial<Path>
): boolean {
  return pathToUrl(pathA) === pathToUrl(pathB);
}
