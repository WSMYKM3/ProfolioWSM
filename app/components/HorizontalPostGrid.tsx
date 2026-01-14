'use client';

import { useRef, useState, useEffect } from 'react';
import { Post } from '@/app/lib/posts';
import PostCard from './PostCard';

interface HorizontalPostGridProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
  viewedPosts?: Set<string>;
}

export default function HorizontalPostGrid({ 
  posts, 
  onPostClick, 
  viewedPosts = new Set() 
}: HorizontalPostGridProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px threshold
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, [posts]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="horizontal-post-grid-container">
      {canScrollLeft && (
        <button 
          className="horizontal-post-grid-arrow horizontal-post-grid-arrow-left"
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          ‹
        </button>
      )}
      <div 
        className="horizontal-post-grid" 
        ref={scrollContainerRef}
      >
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
      {canScrollRight && (
        <button 
          className="horizontal-post-grid-arrow horizontal-post-grid-arrow-right"
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          ›
        </button>
      )}
    </div>
  );
}

