/**
 * Resolve local filesystem-like paths,
 */
export function resolveWithBasePath({
  base,
  path,
}: {
  base: string;
  path: string;
}) {
  if (
    path.startsWith('/') ||
    path.startsWith('//') ||
    /^https?:\/\//i.test(path)
  ) {
    return path;
  }

  const resolved = resolveRelativePath({ base, path });
  if (!resolved || resolved.startsWith('/')) {
    return resolved;
  }

  const baseHasLeadingSlashMatch = base.match(/^(\/*)/);
  if (!baseHasLeadingSlashMatch || baseHasLeadingSlashMatch.length < 2) {
    return resolved;
  }
  return `${baseHasLeadingSlashMatch[1]}${resolved}`;
}

/**
 * Resolve href against an absolute https? `base`
 */
export function resolveWithBaseUrl({
  base: baseUrl,
  href,
}: {
  base: string;
  href: string;
}) {
  if (href.startsWith('//') || /^https?:\/\//i.test(href)) {
    return href;
  }

  // Only handle absolute http(s) baseUrl, otherwise do nothing
  const baseUrlMatched = /^(https?:\/\/[^/?#]+)(\/[^?#]*)?/i.exec(baseUrl);
  if (!baseUrlMatched) {
    return href;
  }

  const origin = baseUrlMatched[1];
  const basePath = baseUrlMatched[2] ?? '/';

  if (href.startsWith('/')) {
    return `${origin}${href}`;
  }

  const resolvedPath = resolveRelativePath({ base: basePath, path: href });

  if (resolvedPath.startsWith('/')) {
    return `${origin}${resolvedPath}`;
  }

  return `${origin}/${resolvedPath}`;
}

function resolveRelativePath({ base, path }: { base: string; path: string }) {
  const baseHasTrailingSlash = base.endsWith('/');

  const baseParts = base
    .replace(/^\/*|\/*$/g, '')
    .replace(/\/+/g, '/')
    .split('/');

  const pathParts = path.replace(/\/+/g, '/').replace(/^\.\//, '').split('/');

  let depth = 0;

  for (const part of pathParts) {
    if (part === '..') {
      depth++;
      continue;
    }
    break;
  }

  const resolvedBaseLength = Math.max(0, baseParts.length - depth);
  const resolvedBaseParts = baseParts.slice(0, resolvedBaseLength).join('/');
  const resolvedPathParts = pathParts.slice(depth).join('/');

  const finalParts: string[] = [];
  if (resolvedBaseParts) {
    finalParts.push(resolvedBaseParts);
  }

  if (resolvedPathParts.length && resolvedPathParts !== '/') {
    finalParts.push(resolvedPathParts);
  } else if (baseHasTrailingSlash) {
    finalParts.push('');
  }

  return finalParts.join('/');
}
