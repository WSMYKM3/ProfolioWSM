'use client';

import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import HoverVideo from '../HoverVideo';
import { getPublicAssetUrl } from '@/app/lib/publicAsset';

export type MediaFrameVariant = 'default' | 'contain' | '3by4' | 'square';

export interface MediaFrameProps {
  /**
   * Path to a `.webm`, `.mp4`, image, or a YouTube embed URL.
   * Local paths are resolved via `getPublicAssetUrl` (basePath-aware).
   */
  src: string;
  alt: string;
  caption?: ReactNode;
  /** If `src` is a video (webm / mp4 / video-like), pass `true`. */
  isVideo?: boolean;
  /** YouTube embed URL — renders an iframe instead of Image/video. */
  isYouTube?: boolean;
  variant?: MediaFrameVariant;
  /** Tilt modifier from CSS: `.photo--tilt-l` / `.photo--tilt-r`. */
  tilt?: 'left' | 'right';
  dataAnim?: string;
  dataRest?: string;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  /** Fixed width, e.g. `min(720px, 92%)`. Falls back to `100%`. */
  width?: string;
}

function frameClass(variant: MediaFrameVariant) {
  const base = 'photo__frame';
  if (variant === 'contain') return `${base} photo__frame--contain`;
  if (variant === '3by4') return `${base} photo__frame--3by4 photo__frame--contain`;
  if (variant === 'square') return `${base} photo__frame--square`;
  return base;
}

function tiltClass(tilt?: 'left' | 'right') {
  if (tilt === 'left') return ' photo--tilt-l';
  if (tilt === 'right') return ' photo--tilt-r';
  return '';
}

/**
 * Single polaroid-style media frame (image, video, or YouTube iframe)
 * with optional caption underneath.
 * Matches Post1's Animation Trailer / Ideation image pattern.
 */
export default function MediaFrame({
  src,
  alt,
  caption,
  isVideo,
  isYouTube,
  variant = 'contain',
  tilt,
  dataAnim,
  dataRest,
  onClick,
  className,
  style,
  width,
}: MediaFrameProps) {
  const figureStyle: CSSProperties = {
    cursor: onClick ? 'pointer' : undefined,
    width: width ?? '100%',
    ...style,
  };
  return (
    <figure
      className={`photo${tiltClass(tilt)}${className ? ' ' + className : ''}`}
      data-anim={dataAnim}
      data-rest={dataRest}
      style={figureStyle}
      onClick={onClick}
    >
      <div className={frameClass(variant)}>
        {isYouTube ? (
          <iframe
            src={src}
            title={alt}
            frameBorder="0"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : isVideo ? (
          <HoverVideo videoSrc={src} alt={alt} objectFit="contain" />
        ) : (
          <Image
            src={getPublicAssetUrl(src)}
            alt={alt}
            fill
            style={{ objectFit: variant === 'default' ? 'cover' : 'contain' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://via.placeholder.com/400x225/2a2a2a/888888?text=${encodeURIComponent(alt)}`;
            }}
          />
        )}
      </div>
      {caption && <figcaption className="photo__caption">{caption}</figcaption>}
    </figure>
  );
}
