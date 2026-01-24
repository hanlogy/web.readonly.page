export function getExtension(url: string) {
  const { pathname } = new URL(url);
  const last = pathname.split('/').pop() || '';
  if (!last || last.startsWith('.') || !last.includes('.')) {
    return '';
  }
  return last.slice(last.lastIndexOf('.') + 1).toLowerCase();
}
