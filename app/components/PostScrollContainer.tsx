'use client';

import { Post } from '@/app/lib/posts';
import Carousel3DWrapper from './Carousel3DWrapper';

interface PostScrollContainerProps {
  posts: Post[];
  onPostClick?: (post: Post) => void;
}

export default function PostScrollContainer({ posts, onPostClick }: PostScrollContainerProps) {
  return <Carousel3DWrapper posts={posts} onPostClick={onPostClick} />;
}

