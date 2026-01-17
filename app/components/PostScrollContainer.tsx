'use client';

import { Post } from '@/app/lib/posts';
import Carousel3DWrapper from './Carousel3DWrapper';

interface PostScrollContainerProps {
  posts: Post[];
  onPostClick?: (post: Post) => void;
  onIndexChange?: (index: number) => void;
}

export default function PostScrollContainer({ posts, onPostClick, onIndexChange }: PostScrollContainerProps) {
  return <Carousel3DWrapper posts={posts} onPostClick={onPostClick} onIndexChange={onIndexChange} />;
}

