'use client';

import { useCallback, useEffect, useState } from 'react';
import { getPublicAssetUrl } from '@/app/lib/publicAsset';
import { getImageScale } from '@/app/lib/imageScaleUtils';

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
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(26, 20, 13, 0.96)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: 20,
      }}
      onClick={handleCloseEnlarged}
    >
      <div
        style={{
          position: 'relative',
          width: '90vw',
          height: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
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
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: 8,
            }}
          />
        ) : (
          <img
            src={getPublicAssetUrl(enlargedImage.src)}
            alt={enlargedImage.alt}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: 8,
              transform: `scale(${getImageScale(enlargedImage.src)})`,
              transformOrigin: 'center center',
            }}
          />
        )}
        <button
          onClick={handleCloseEnlarged}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'rgba(255, 245, 220, 0.2)',
            border: 'none',
            borderRadius: '50%',
            width: 40,
            height: 40,
            color: '#fff5dc',
            fontSize: 24,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          &times;
        </button>
        {isTouchDevice && (
          <button
            onClick={handleCloseEnlarged}
            style={{
              position: 'absolute',
              right: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#fff5dc',
              border: '2px solid #1a140d',
              borderRadius: 12,
              padding: '14px 24px',
              color: '#1a140d',
              fontSize: 18,
              fontWeight: 600,
              cursor: 'pointer',
              zIndex: 10001,
              boxShadow: '4px 5px 0 #1a140d',
              minWidth: 80,
            }}
          >
            Back
          </button>
        )}
      </div>
    </div>
  ) : null;

  return { handleImageClick, overlay, isTouchDevice };
}
