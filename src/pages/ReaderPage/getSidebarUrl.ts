export function getSidebarUrl(baseUrl: string): string {
  return [baseUrl.replace(/\/*$/, ''), '_sidebar.md'].join('/');
}
