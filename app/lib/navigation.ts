/**
 * Navigation helper to determine if a post should navigate to a page route
 * or open in a modal. All projects now use separate page routes.
 */
export function shouldNavigateToPage(postId: string): boolean {
  // All projects use page routes now
  const pageRoutePosts = ['post-1', 'post-2', 'post-3', 'post-4', 'post-5', 'post-6'];
  return pageRoutePosts.includes(postId);
}

/**
 * Get the page route for a post ID
 */
export function getPostPageRoute(postId: string): string {
  return `/projects/${postId}`;
}
