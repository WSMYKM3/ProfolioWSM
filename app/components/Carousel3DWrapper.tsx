'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Post } from '@/app/lib/posts';
import PostSection from './PostSection';

interface Carousel3DWrapperProps {
  posts: Post[];
  onPostClick?: (post: Post) => void;
}

export default function Carousel3DWrapper({ posts, onPostClick }: Carousel3DWrapperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const totalItems = posts.length;
  const rotationStep = totalItems > 0 ? 360 / totalItems : 0;
  const autoPlayDelay = 5000; // 5 seconds

  // Detect window size and update on resize with debounce
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;
    const updateWindowSize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150); // Debounce resize events
    };
    
    // Initial size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    
    window.addEventListener('resize', updateWindowSize);
    return () => {
      window.removeEventListener('resize', updateWindowSize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Calculate translateZ based on screen size
  // Use larger translateZ to create proper circular distribution (like reference HTML)
  // Reference uses 45vw, we'll use similar value for proper 360-degree spacing
  const isMobile = windowSize.width <= 768;
  const isTablet = windowSize.width > 768 && windowSize.width <= 1024;
  
  // Calculate translateZ based on screen size
  // Larger screens need more spacing to avoid overlap
  let translateZ = 45;
  if (isMobile) {
    translateZ = 40;
  } else if (isTablet) {
    translateZ = 42;
  } else {
    // For larger screens, adjust based on viewport width
    translateZ = Math.min(50, 40 + (windowSize.width - 1024) / 100);
  }

  // Update carousel rotation
  const updateCarousel = useCallback((index: number, translateZValue: number) => {
    if (carouselRef.current && rotationStep > 0) {
      const rotation = -index * rotationStep;
      carouselRef.current.style.transform = `translateZ(-${translateZValue}vw) rotateY(${rotation}deg)`;
    }
  }, [rotationStep]);

  // Reset auto-play timer
  const resetAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }
    autoPlayTimerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, autoPlayDelay);
  }, [totalItems]);

  // Next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = (prev + 1) % totalItems;
      return newIndex;
    });
    resetAutoPlay();
  }, [totalItems, resetAutoPlay]);

  // Previous slide
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = (prev - 1 + totalItems) % totalItems;
      return newIndex;
    });
    resetAutoPlay();
  }, [totalItems, resetAutoPlay]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [prevSlide, nextSlide]);

  // Update carousel when currentIndex, translateZ, or window size changes
  useEffect(() => {
    if (windowSize.width > 0 && rotationStep > 0) {
      updateCarousel(currentIndex, translateZ);
    }
  }, [currentIndex, translateZ, windowSize, rotationStep, updateCarousel]);

  // Initialize auto-play and cleanup
  useEffect(() => {
    resetAutoPlay();

    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [resetAutoPlay]);

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="carousel-3d-wrapper-shell">
      <div className="carousel-3d-wrapper-content" ref={carouselRef}>
        {posts.map((post, index) => {
          const rotation = index * rotationStep;
          const isActive = index === currentIndex;
          return (
            <div
              key={post.id}
              className={`carousel-3d-wrapper-item ${isActive ? 'carousel-3d-wrapper-item-active' : 'carousel-3d-wrapper-item-hidden'}`}
              style={{
                transform: `rotateY(${rotation}deg) translateZ(${translateZ}vw)`,
                opacity: isActive ? 1 : 0,
                visibility: isActive ? 'visible' : 'hidden',
                pointerEvents: isActive ? 'auto' : 'none',
                zIndex: isActive ? 10 : 1,
              }}
            >
              <PostSection
                post={post}
                index={index}
                onPostClick={onPostClick}
              />
            </div>
          );
        })}
      </div>
      <div className="carousel-3d-wrapper-controls">
        <button
          className="carousel-3d-wrapper-btn carousel-3d-wrapper-btn-left"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <span className="carousel-3d-wrapper-btn-arrow">‹</span>
          <span className="carousel-3d-wrapper-btn-text">last</span>
        </button>
        <button
          className="carousel-3d-wrapper-btn carousel-3d-wrapper-btn-right"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <span className="carousel-3d-wrapper-btn-text">next</span>
          <span className="carousel-3d-wrapper-btn-arrow">›</span>
        </button>
      </div>
    </div>
  );
}

