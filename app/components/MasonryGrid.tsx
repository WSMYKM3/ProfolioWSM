'use client';

import { Post } from '@/app/lib/posts';
import { DailyPracticePost } from '@/app/lib/dailyPractice';
import PostCard from './PostCard';

interface MasonryGridProps {
  posts: (Post | DailyPracticePost)[];
  onPostClick: (post: Post | DailyPracticePost) => void;
  viewedPosts?: Set<string>;
}

export default function MasonryGrid({ posts, onPostClick, viewedPosts = new Set() }: MasonryGridProps) {
  return (
    <div className="masonry-grid">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onClick={() => onPostClick(post)}
          isViewed={viewedPosts.has(post.id)}
          checkboxId={`toggle-${post.id}`}
        />
      ))}
    </div>
  );
}

