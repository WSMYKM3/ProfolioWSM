'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import MediaFrame from './MediaFrame';
import type { MediaGridItem } from './MediaGrid';

interface MediaStripProps {
  items: MediaGridItem[];
  idPrefix?: string;
  onItemClick?: (path: string, description: string, isVideo?: boolean) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

function itemAlt(item: MediaGridItem) {
  return (
    item.alt ??
    item.description ??
    item.path.split('/').pop()?.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ') ??
    'Media'
  );
}

/**
 * Single-row horizontal gallery — scroll-snap, arrow controls, optional auto-advance.
 */
export default function MediaStrip({
  items,
  idPrefix = 'strip',
  onItemClick,
  autoPlay = true,
  autoPlayInterval = 4500,
}: MediaStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const updateButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    updateButtons();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    return () => {
      el.removeEventListener('scroll', updateButtons);
      window.removeEventListener('resize', updateButtons);
    };
  }, [items, updateButtons]);

  const scrollBy = useCallback((direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.72;
    el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!autoPlay || isPaused || items.length <= 1) return;
    const el = scrollRef.current;
    if (!el) return;

    const timer = window.setInterval(() => {
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 8;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const step = el.clientWidth * 0.72;
        el.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, autoPlayInterval);

    return () => window.clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isPaused, items.length]);

  return (
    <div
      className="ed-media-strip"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => window.setTimeout(() => setIsPaused(false), 3000)}
    >
      {canScrollLeft && (
        <button
          type="button"
          className="ed-media-strip__btn ed-media-strip__btn--left"
          onClick={() => scrollBy('left')}
          aria-label="Scroll left"
        >
          ‹
        </button>
      )}

      <div className="ed-media-strip__track" ref={scrollRef}>
        {items.map((item, index) => {
          const alt = itemAlt(item);
          return (
            <div key={`${idPrefix}-${index}`} className="ed-media-strip__item">
              <MediaFrame
                src={item.path}
                alt={alt}
                isVideo={item.isVideo}
                variant={item.variant ?? 'default'}
                dataAnim={index % 2 === 0 ? 'slide-left' : 'slide-right'}
                onClick={
                  onItemClick
                    ? () => onItemClick(item.path, item.description ?? alt, item.isVideo)
                    : undefined
                }
              />
            </div>
          );
        })}
      </div>

      {canScrollRight && (
        <button
          type="button"
          className="ed-media-strip__btn ed-media-strip__btn--right"
          onClick={() => scrollBy('right')}
          aria-label="Scroll right"
        >
          ›
        </button>
      )}
    </div>
  );
}
