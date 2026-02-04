'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface HoverVideoProps {
  videoSrc: string;
  thumbnailSrc?: string;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
  objectFit?: 'contain' | 'cover';
  onClick?: () => void;
}

// Helper function to add basePath for GitHub Pages
function getImageSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}

// Generate thumbnail path from video path
function getThumbnailPath(videoSrc: string): string {
  // Replace .webm with -thumb.jpg
  if (videoSrc.endsWith('.webm')) {
    return videoSrc.replace('.webm', '-thumb.jpg');
  }
  // Fallback: if no extension match, return original
  return videoSrc;
}

// Note: All webm files have been compressed and renamed to original names
// This function is kept for compatibility but just returns the original path
function getCompressedVideoPath(videoSrc: string): string {
  // All webm files are already compressed, so just return the original path
  return videoSrc;
}

export default function HoverVideo({
  videoSrc,
  thumbnailSrc,
  alt = '',
  style,
  className = '',
  objectFit = 'contain',
  onClick
}: HoverVideoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackVideoRef = useRef<HTMLVideoElement>(null);

  // Auto-generate thumbnail path if not provided
  const finalThumbnailSrc = thumbnailSrc || getThumbnailPath(videoSrc);
  const displayThumbnailSrc = getImageSrc(finalThumbnailSrc);
  // All webm files are already compressed (original files deleted)
  const displayVideoSrc = getImageSrc(videoSrc);

  // Handle video loading when hovered
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      // Start loading video when hovered
      setIsLoadingVideo(true);
      setIsVideoReady(false);
      video.load();
    } else {
      // Reset states when not hovered
      setIsVideoReady(false);
      setIsLoadingVideo(false);
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovered]);

  // Handle video play when ready
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideoReady || !isHovered) return;

    // Play video when it's ready and hovered
    video.play().catch(err => {
      console.warn('Video play failed:', err);
    });
  }, [isVideoReady, isHovered]);

  // Handle fallback video (when thumbnail doesn't exist)
  useEffect(() => {
    const fallbackVideo = fallbackVideoRef.current;
    if (!fallbackVideo || isHovered) return;
    
    // Keep fallback video paused and at start
    fallbackVideo.pause();
    fallbackVideo.currentTime = 0;
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsVideoReady(false);
    setIsLoadingVideo(false);
  };

  const handleThumbnailError = () => {
    setThumbnailError(true);
  };

  const handleVideoLoadStart = () => {
    setIsLoadingVideo(true);
  };

  const handleVideoCanPlay = () => {
    setIsVideoReady(true);
    setIsLoadingVideo(false);
  };

  const handleVideoError = () => {
    setIsVideoReady(false);
    setIsLoadingVideo(false);
    // Keep showing thumbnail on error
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        ...style
      }}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Thumbnail - shown when not hovered or video not ready */}
      {(!isHovered || !isVideoReady) && !thumbnailError && (
        <Image
          src={displayThumbnailSrc}
          alt={alt}
          fill
          style={{ 
            objectFit,
            transition: 'opacity 0.3s ease',
            opacity: isVideoReady && isHovered ? 0 : 1
          }}
          onError={handleThumbnailError}
        />
      )}
      
      {/* Fallback: show video as thumbnail if thumbnail doesn't exist */}
      {(!isHovered || !isVideoReady) && thumbnailError && (
        <video
          ref={fallbackVideoRef}
          src={displayVideoSrc}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit,
            opacity: isVideoReady && isHovered ? 0 : 0.5 // Dimmed as thumbnail
          }}
          muted
          playsInline
          preload="none"
        />
      )}

      {/* Video - always rendered but hidden until ready */}
      <video
        ref={videoRef}
        src={displayVideoSrc}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit,
          opacity: isVideoReady && isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: isVideoReady && isHovered ? 'auto' : 'none'
        }}
        loop
        muted
        playsInline
        preload="none"
        onLoadStart={handleVideoLoadStart}
        onCanPlay={handleVideoCanPlay}
        onError={handleVideoError}
      />
    </div>
  );
}
