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
  location: Pick<Path, 'pathname' | 'search' | 'hash'> = window.location
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

export function parsePathHash(hash: string): Record<string, string> {
  hash = hash.replace(/^#/, '');
  if (!hash || hash.startsWith('~')) {
    return {};
  }

  try {
    hash = decodeURIComponent(hash);
  } catch {
    // Do nothing
  }

  const matched = hash.matchAll(
    /(?:^|~)([a-zA-Z]+)=([\s\S]*?)(?=~[a-zA-Z]+=|$)/g
  );

  const params: Record<string, string> = {};
  for (const match of matched) {
    if (!match[2]) {
      continue;
    }
    params[match[1]] = match[2];
  }

  return params;
}
