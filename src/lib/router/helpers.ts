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

export function parsePathHash(hash: string): {
  resources: string[];
  params: Record<string, string>;
} {
  hash = hash.replace(/^#/, '');
  if (!hash) {
    return {
      resources: [],
      params: {},
    };
  }
  const hashParts = hash.split('#');

  const lastPart = hashParts[hashParts.length - 1];
  const keyValueRegexp = /(?:^|;)(?<key>[^=;]+)=(?<value>[^;]*)/g;
  const matches = [...lastPart.matchAll(keyValueRegexp)];
  const params = matches
    .map(({ groups }) => {
      if (!groups) {
        return undefined;
      }
      return [groups.key, groups.value];
    })
    .filter((e) => e !== undefined);
  if (params.length) {
    hashParts.pop();
  }
  return {
    resources: hashParts,
    params: Object.fromEntries(params),
  };
}
