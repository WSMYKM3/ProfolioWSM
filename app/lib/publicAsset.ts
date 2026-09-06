/** Base URL for files in /public, injected by next.config.js for each deployment target. */
export function getPublicAssetUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return path.startsWith('/') ? `${basePath}${path}` : `${basePath}/${path}`;
}
