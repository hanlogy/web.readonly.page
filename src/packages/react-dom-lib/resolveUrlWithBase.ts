function isAbsoluteOrWithSchema(url: string) {
  return /^(https?:|data:|mailto:|tel:|#)/i.test(url) || url.startsWith('/');
}

export function resolveUrlWithBase({
  base,
  url,
}: {
  base: string;
  url: string;
}) {
  if (isAbsoluteOrWithSchema(url)) {
    return url;
  }

  const baseUrl = new URL(base);
  return new URL(url, baseUrl).toString();
}
