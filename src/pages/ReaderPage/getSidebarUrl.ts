export function getSidebarUrl(entryUrl: string): string {
  const url = new URL(entryUrl);

  let folderPath = url.pathname;
  if (!folderPath.endsWith('/')) {
    const lastSlash = folderPath.lastIndexOf('/');
    folderPath = lastSlash >= 0 ? folderPath.slice(0, lastSlash + 1) : '/';
  }

  folderPath = folderPath.replace(/\/+$/, '/');
  url.pathname = folderPath + '_sidebar.md';

  return url.toString();
}
