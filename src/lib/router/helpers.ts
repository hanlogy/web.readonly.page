import type { Path } from './types';

export function pathToUrl({ pathname, search, hash }: Path): string {
  let queryString = search?.replace(/^\?*/, '');
  let hashString = hash?.replace(/^#*/, '');

  queryString = queryString ? `?${queryString}` : '';
  hashString = hashString ? `#${hashString}` : '';

  return `${pathname}${queryString}${hashString}`;
}

export function readPath(loc: Location = window.location): Path {
  return {
    pathname: loc.pathname,
    search: loc.search.replace(/^\?/, ''),
    hash: loc.hash.replace(/^#/, ''),
  };
}

export function isSamePath(pathA: Path, pathB: Path): boolean {
  return pathToUrl(pathA) === pathToUrl(pathB);
}
