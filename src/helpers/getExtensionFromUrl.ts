export function getExtensionFromUrl(input: string) {
  const last =
    input
      .replace(/[?&#].*$/, '')
      .split('/')
      .pop() ?? '';
  if (!last) {
    return null;
  }
  const fileParts = last.split('.');
  if (fileParts.length < 2) {
    return null;
  }
  return fileParts.pop()?.toLowerCase() ?? null;
}
