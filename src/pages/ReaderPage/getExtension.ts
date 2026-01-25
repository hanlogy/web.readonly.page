export function getExtension(input: string) {
  const last = input.split('/').pop() ?? '';
  if (!last) {
    return null;
  }
  const fileParts = last.split('.');
  if (fileParts.length < 2) {
    return null;
  }
  return fileParts.pop()?.toLowerCase() ?? null;
}

