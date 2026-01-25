export function getSidebarUrl(baseUrl: string): string {
  baseUrl.replace(/\/*$/, '');
  return [baseUrl, '_sidebar.md'].join('/');
}
