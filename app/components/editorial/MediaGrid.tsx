'use client';

import MediaFrame, { MediaFrameVariant } from './MediaFrame';

export interface MediaGridItem {
  path: string;
  description: string;
  isVideo?: boolean;
  isYouTube?: boolean;
  variant?: MediaFrameVariant;
}

interface MediaGridProps {
  items: MediaGridItem[];
  /** Grid columns on desktop. Default 2. Falls back to 1 on mobile. */
  columns?: number;
  isMobile: boolean;
  /** Fires with (path, description, isVideo?) when a tile is clicked. */
  onItemClick?: (path: string, description: string, isVideo?: boolean) => void;
  /** Prefix for stable keys, e.g. `stage1`. */
  idPrefix?: string;
  gap?: number;
  className?: string;
}

/**
 * Grid of polaroid media frames that smoothly slide in from alternating
 * sides — even-indexed items enter from the left, odd from the right.
 * Post1 (Datnie) uses this for both prototype-stage-1 and prototype-stage-2 grids.
 */
export default function MediaGrid({
  items,
  columns = 2,
  isMobile,
  onItemClick,
  idPrefix = 'media',
  gap,
  className,
}: MediaGridProps) {
  const gridGap = gap ?? (isMobile ? 40 : 60);
  return (
    <div
      className={`ed-grid-asym${className ? ' ' + className : ''}`}
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : `repeat(${columns}, 1fr)`,
        gap: gridGap,
        marginTop: 32,
      }}
    >
      {items.map((item, index) => {
        const dataAnim = index % 2 === 0 ? 'slide-left' : 'slide-right';
        return (
          <MediaFrame
            key={`${idPrefix}-${index}`}
            src={item.path}
            alt={item.description}
            caption={item.description}
            isVideo={item.isVideo}
            isYouTube={item.isYouTube}
            variant={item.variant ?? 'contain'}
            dataAnim={dataAnim}
            onClick={
              onItemClick
                ? () => onItemClick(item.path, item.description, item.isVideo)
                : undefined
            }
          />
        );
      })}
    </div>
  );
}
