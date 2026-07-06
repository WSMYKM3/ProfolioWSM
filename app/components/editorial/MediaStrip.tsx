'use client';

import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import MediaFrame from './MediaFrame';
import type { MediaGridItem } from './MediaGrid';

interface MediaStripProps {
  items: MediaGridItem[];
  idPrefix?: string;
  onItemClick?: (path: string, description: string, isVideo?: boolean) => void;
  autoPlay?: boolean;
  /** Continuous scroll speed in pixels per second. */
  scrollSpeed?: number;
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
 * Single-row horizontal gallery with continuous looping motion and arrow controls.
 */
export default function MediaStrip({
  items,
  idPrefix = 'strip',
  onItemClick,
  autoPlay = true,
  scrollSpeed = 34,
}: MediaStripProps) {
  const [manualShift, setManualShift] = useState(0);
  const duration = useMemo(() => {
    if (!autoPlay || scrollSpeed <= 0) return undefined;
    return `${Math.max(42, (items.length * 360) / scrollSpeed)}s`;
  }, [autoPlay, items.length, scrollSpeed]);

  const nudge = (direction: 'left' | 'right') => {
    setManualShift((value) => value + (direction === 'left' ? 360 : -360));
  };

  return (
    <div className="ed-media-strip">
      {items.length > 1 && (
        <button
          type="button"
          className="ed-media-strip__btn ed-media-strip__btn--left"
          onClick={() => nudge('left')}
          aria-label="Scroll left"
        >
          ‹
        </button>
      )}

      <div className="ed-media-strip__viewport">
        <div
          className={`ed-media-strip__track${autoPlay ? '' : ' ed-media-strip__track--static'}`}
          style={{
            '--strip-shift': `${manualShift}px`,
            '--strip-duration': duration,
          } as CSSProperties}
        >
          {[0, 1].map((groupIndex) => (
            <div
              key={`${idPrefix}-group-${groupIndex}`}
              className="ed-media-strip__group"
              aria-hidden={groupIndex === 1}
            >
              {items.map((item, index) => {
                const alt = itemAlt(item);
                return (
                  <div key={`${idPrefix}-${groupIndex}-${index}`} className="ed-media-strip__item">
                    <MediaFrame
                      src={item.path}
                      alt={alt}
                      isVideo={item.isVideo}
                      variant={item.variant ?? 'default'}
                      dataAnim={groupIndex === 0 ? (index % 2 === 0 ? 'slide-left' : 'slide-right') : undefined}
                      dataRest={groupIndex === 0 ? '0' : undefined}
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
          ))}
        </div>
      </div>

      {items.length > 1 && (
        <button
          type="button"
          className="ed-media-strip__btn ed-media-strip__btn--right"
          onClick={() => nudge('right')}
          aria-label="Scroll right"
        >
          ›
        </button>
      )}
    </div>
  );
}
