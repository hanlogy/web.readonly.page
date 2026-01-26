// NOTE:
// No validation on the scheme
export function ensureUrlProtocol(url: string) {
  if (/^(?:[a-z]+:)?\/\//.test(url)) {
    return url;
  }

  return `//${url}`;
}
