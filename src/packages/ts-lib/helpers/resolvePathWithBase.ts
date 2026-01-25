function isAbsoluteOrWithSchema(url: string) {
  return /^(https?:|data:|mailto:|tel:|#)/i.test(url) || url.startsWith('/');
}

export function resolvePathWithBase({
  base,
  path,
}: {
  base: string;
  path: string;
}) {
  if (isAbsoluteOrWithSchema(path)) {
    return path;
  }

  const baseHasLeadingSlash = base.startsWith('/');
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

  const resolvedBaseParts = baseParts
    .slice(0, baseParts.length - depth)
    .join('/');
  const resolvedPathParts = pathParts.slice(depth).join('/');

  const finalParts = [resolvedBaseParts];
  if (baseHasLeadingSlash && resolvedBaseParts && resolvedBaseParts !== '/') {
    finalParts.unshift('');
  }

  if (resolvedPathParts.length > 1 && resolvedPathParts !== '/') {
    finalParts.push(resolvedPathParts);
  } else if (baseHasTrailingSlash) {
    finalParts.push('');
  }

  return finalParts.join('/');
}
