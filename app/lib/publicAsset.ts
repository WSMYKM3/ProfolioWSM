/** Base URL for files in /public (GitHub Pages production base path). */
export function getPublicAssetUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return path.startsWith('/') ? `${basePath}${path}` : `${basePath}/${path}`;
}
