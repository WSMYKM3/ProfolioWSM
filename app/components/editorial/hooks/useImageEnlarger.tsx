'use client';

import { useCallback, useEffect, useState } from 'react';
import { getPublicAssetUrl } from '@/app/lib/publicAsset';

type EnlargedItem = { src: string; alt: string; isVideo?: boolean };

/**
 * Fullscreen image/video enlarger, extracted from Post1 (Datnie).
 * Returns:
 *   - handleImageClick(src, alt, isVideo?) — call from a media item's onClick.
 *   - overlay — the JSX to render at the top of the Post; renders nothing when
 *     no item is enlarged.
 *   - isTouchDevice — boolean, exposed so the Post can use it elsewhere if needed.
 *
 * Handles Escape key + touch back-button + click-outside-to-close.
 */
export function useImageEnlarger() {
  const [enlargedImage, setEnlargedImage] = useState<EnlargedItem | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && enlargedImage) setEnlargedImage(null);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [enlargedImage]);

  const handleImageClick = useCallback((src: string, alt: string, isVideo?: boolean) => {
    setEnlargedImage({ src, alt, isVideo });
  }, []);

  const handleCloseEnlarged = useCallback(() => setEnlargedImage(null), []);

  const overlay = enlargedImage ? (
    <div
      className="image-enlarger"
      role="dialog"
      aria-modal="true"
      aria-label={enlargedImage.alt}
      onClick={handleCloseEnlarged}
    >
      <div
        className="image-enlarger__dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {enlargedImage.isVideo ? (
          <video
            src={getPublicAssetUrl(enlargedImage.src)}
            controls
            autoPlay
            loop
            muted
            playsInline
            className="image-enlarger__media"
          />
        ) : (
          <img
            src={getPublicAssetUrl(enlargedImage.src)}
            alt={enlargedImage.alt}
            className="image-enlarger__media"
          />
        )}
        <button
          onClick={handleCloseEnlarged}
          aria-label="Close"
          className="image-enlarger__close"
        >
          &times;
        </button>
        {isTouchDevice && (
          <button
            onClick={handleCloseEnlarged}
            className="image-enlarger__back"
          >
            Back
          </button>
        )}
      </div>
    </div>
  ) : null;

  return { handleImageClick, overlay, isTouchDevice };
}
