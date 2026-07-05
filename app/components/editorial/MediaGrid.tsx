'use client';

import MediaFrame, { MediaFrameVariant } from './MediaFrame';

export interface MediaGridItem {
  path: string;
  description?: string;
  alt?: string;
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
  /** Hide captions under each frame (alt text is still set for accessibility). */
  hideCaptions?: boolean;
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
  hideCaptions = false,
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
        const alt =
          item.alt ??
          item.description ??
          item.path.split('/').pop()?.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ') ??
          'Media';
        const caption = hideCaptions ? undefined : item.description;
        return (
          <MediaFrame
            key={`${idPrefix}-${index}`}
            src={item.path}
            alt={alt}
            caption={caption}
            isVideo={item.isVideo}
            isYouTube={item.isYouTube}
            variant={item.variant ?? 'contain'}
            dataAnim={dataAnim}
            onClick={
              onItemClick
                ? () => onItemClick(item.path, item.description ?? alt, item.isVideo)
                : undefined
            }
          />
        );
      })}
    </div>
  );
}
