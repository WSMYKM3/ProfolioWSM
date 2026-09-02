'use client';

import type { ReactNode } from 'react';
import { Post } from '@/app/lib/posts';
import Carousel3DWrapper from './Carousel3DWrapper';

interface PostScrollContainerProps {
  posts: Post[];
  onPostClick?: (post: Post) => void;
  onIndexChange?: (index: number) => void;
  activeIndex?: number;
  titleAction?: (post: Post) => ReactNode;
}

export default function PostScrollContainer({ posts, onPostClick, onIndexChange, activeIndex, titleAction }: PostScrollContainerProps) {
  return (
    <Carousel3DWrapper
      posts={posts}
      onPostClick={onPostClick}
      onIndexChange={onIndexChange}
      activeIndex={activeIndex}
      titleAction={titleAction}
    />
  );
}
