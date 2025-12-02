'use client';

import { Post } from '@/app/lib/posts';
import PostSection from './PostSection';

interface PostScrollContainerProps {
  posts: Post[];
  onPostClick?: (post: Post) => void;
}

export default function PostScrollContainer({ posts, onPostClick }: PostScrollContainerProps) {
  return (
    <div className="post-scroll-container">
      {posts.map((post, index) => (
        <PostSection
          key={post.id}
          post={post}
          index={index}
          onPostClick={onPostClick}
        />
      ))}
    </div>
  );
}

