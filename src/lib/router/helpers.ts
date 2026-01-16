import type { PartialPath, Path } from './types';

export function pathToUrl({ pathname, search, hash }: PartialPath): string {
  return [pathname, search, hash].filter(Boolean).join('');
}

export function readPath(): Path {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  };
}

export function isSamePath(A: PartialPath, B: PartialPath) {
  return pathToUrl(A) === pathToUrl(B);
}
