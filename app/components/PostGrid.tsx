'use client';

import { Post } from '@/app/lib/posts';
import PostCard from './PostCard';

interface PostGridProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

export default function PostGrid({ posts, onPostClick }: PostGridProps) {
  return (
    <div className="posts-grid">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onClick={() => onPostClick(post)}
        />
      ))}
    </div>
  );
}

