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

// Get compressed video path if available, otherwise use original
function getCompressedVideoPath(videoSrc: string): string {
  // If video path ends with .webm, try to use compressed version
  if (videoSrc.endsWith('.webm')) {
    // Check if compressed version exists by replacing .webm with -compressed.webm
    return videoSrc.replace('.webm', '-compressed.webm');
  }
  // Fallback: return original path
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
  const [useOriginalVideo, setUseOriginalVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackVideoRef = useRef<HTMLVideoElement>(null);

  // Auto-generate thumbnail path if not provided
  const finalThumbnailSrc = thumbnailSrc || getThumbnailPath(videoSrc);
  const displayThumbnailSrc = getImageSrc(finalThumbnailSrc);
  // Use compressed video if available, otherwise use original
  const compressedVideoSrc = getCompressedVideoPath(videoSrc);
  const finalVideoSrc = useOriginalVideo ? videoSrc : compressedVideoSrc;
  const displayVideoSrc = getImageSrc(finalVideoSrc);

  // Handle video play/pause on hover
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      // Load and play video on hover
      video.load();
      video.play().catch(err => {
        console.warn('Video play failed:', err);
      });
    } else {
      // Pause and reset video on leave
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovered]);

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
  };

  const handleThumbnailError = () => {
    setThumbnailError(true);
  };

  const handleVideoError = () => {
    // If compressed video fails to load, fallback to original
    if (!useOriginalVideo) {
      console.warn(`Compressed video failed to load, using original: ${videoSrc}`);
      setUseOriginalVideo(true);
    }
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
      {/* Thumbnail - shown by default */}
      {!isHovered && !thumbnailError && (
        <Image
          src={displayThumbnailSrc}
          alt={alt}
          fill
          style={{ 
            objectFit,
            transition: 'opacity 0.3s ease'
          }}
          onError={handleThumbnailError}
        />
      )}
      
      {/* Fallback: show video as thumbnail if thumbnail doesn't exist */}
      {!isHovered && thumbnailError && (
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
            opacity: 0.5 // Dimmed as thumbnail
          }}
          muted
          playsInline
          preload="none"
          onError={handleVideoError}
        />
      )}

      {/* Video - shown on hover */}
      {isHovered && (
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
            transition: 'opacity 0.3s ease'
          }}
          loop
          muted
          playsInline
          preload="none"
          onError={handleVideoError}
        />
      )}
    </div>
  );
}
