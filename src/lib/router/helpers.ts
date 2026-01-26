import type { ParsedPathHash, Path } from './types';

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

export function parsePathHash(hash: string): ParsedPathHash {
  hash = hash.replace(/^#/, '');
  if (!hash) {
    return { resources: [], params: {} };
  }

  const hashParts = hash.split('#');
  const lastPart = hashParts[hashParts.length - 1];
  const shouldParseParams = lastPart.includes('=') && !lastPart.includes('?');
  const keyValueRegexp = /(?:^|;)(?<key>[^=;]+)=(?<value>[^;]*)/g;
  const matches = shouldParseParams
    ? [...lastPart.matchAll(keyValueRegexp)]
    : [];
  const params = matches
    .map(({ groups }) => {
      if (!groups) {
        return undefined;
      }
      return [groups.key, groups.value];
    })
    .filter((e) => e !== undefined);

  let rawParams: string | undefined;
  if (params.length) {
    rawParams = hashParts.pop();
  }

  const rawResources = hashParts.length ? hashParts.join('#') : undefined;

  return {
    resources: hashParts,
    params: Object.fromEntries(params),
    ...(rawParams ? { rawParams } : {}),
    ...(rawResources ? { rawResources } : {}),
  };
}
