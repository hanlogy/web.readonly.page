import { buildPathHash } from '@/lib/router/helpers';

function normalizeUrl({ url, protocol }: { url: string; protocol: string }) {
  const matched = url.match(/^((?:https?:)?\/\/)?(.*)/i);
  if (!matched) {
    return url;
  }

  const [, matchedProtocol, matchedUrl] = matched;

  if (!matchedProtocol || matchedProtocol === '//') {
    return matchedUrl;
  }

  const matchedProtocolTrimed = matchedProtocol.split(':')[0];
  const protocolTrimed = protocol.split(':')[0];
  if (matchedProtocolTrimed === protocolTrimed) {
    return matchedUrl;
  }

  return url;
}

function normalizeFile(file: string) {
  if (file.startsWith('./')) {
    return file.slice(2);
  }

  return file;
}

export function buildReadurl(
  resource: Readonly<{ url: string } | { base: string; file: string }>,
  {
    protocol = window.location.protocol,
  }: {
    protocol?: string;
  } = {}
) {
  let hashParams: Record<string, string>;

  if ('url' in resource) {
    hashParams = {
      url: normalizeUrl({ url: resource.url, protocol }),
    };
  } else {
    hashParams = {
      base: normalizeUrl({ url: resource.base, protocol }),
      file: normalizeFile(resource.file),
    };
  }

  const pathname = '/read';
  const hash = buildPathHash(hashParams);
  return {
    pathname,
    hash,
    readUrl: pathname + hash,
  };
}
