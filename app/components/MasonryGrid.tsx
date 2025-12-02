'use client';

import { Post } from '@/app/lib/posts';
import { DailyPracticePost } from '@/app/lib/dailyPractice';
import PostCard from './PostCard';

interface MasonryGridProps {
  posts: (Post | DailyPracticePost)[];
  onPostClick: (post: Post | DailyPracticePost) => void;
}

export default function MasonryGrid({ posts, onPostClick }: MasonryGridProps) {
  return (
    <div className="masonry-grid">
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

