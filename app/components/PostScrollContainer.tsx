'use client';

import type { ReactNode } from 'react';
import { Post } from '@/app/lib/posts';
import Carousel3DWrapper from './Carousel3DWrapper';

interface PostScrollContainerProps {
  posts: Post[];
  onPostClick?: (post: Post) => void;
  onIndexChange?: (index: number) => void;
  titleAction?: (post: Post) => ReactNode;
}

export default function PostScrollContainer({ posts, onPostClick, onIndexChange, titleAction }: PostScrollContainerProps) {
  return (
    <Carousel3DWrapper
      posts={posts}
      onPostClick={onPostClick}
      onIndexChange={onIndexChange}
      titleAction={titleAction}
    />
  );
}
