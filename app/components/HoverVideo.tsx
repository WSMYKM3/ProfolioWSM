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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
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
      setIsVideoPlaying(false);
      setIsLoadingVideo(false);
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovered]);

  // Handle video play when ready
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideoReady || !isHovered) return;

    // Double-check video is ready before playing
    // Ensure we have enough data for smooth playback
    if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
      // Play video when it's ready and hovered
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video started playing successfully
            setIsVideoPlaying(true);
          })
          .catch(err => {
            console.warn('Video play failed:', err);
            // If play fails, reset ready state to show thumbnail
            setIsVideoReady(false);
            setIsVideoPlaying(false);
          });
      }
    } else {
      // If not enough data, wait for canplaythrough event
      setIsVideoReady(false);
      setIsVideoPlaying(false);
    }
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
    setIsVideoPlaying(false);
    setIsLoadingVideo(false);
  };

  const handleVideoPlaying = () => {
    // Video has started playing
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    // Video paused
    setIsVideoPlaying(false);
  };

  const handleThumbnailError = () => {
    setThumbnailError(true);
  };

  const handleVideoLoadStart = () => {
    setIsLoadingVideo(true);
    setIsVideoReady(false);
  };

  const handleVideoCanPlay = () => {
    // onCanPlay fires when enough data is loaded to start playing
    // but we need to wait for canplaythrough to ensure smooth playback
    const video = videoRef.current;
    if (video && video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      // Check if we have enough data for smooth playback
      if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
        setIsVideoReady(true);
        setIsLoadingVideo(false);
      }
    }
  };

  const handleVideoCanPlayThrough = () => {
    // onCanPlayThrough fires when enough data is loaded for smooth playback
    // This is the event we should rely on to ensure video is fully ready
    setIsVideoReady(true);
    setIsLoadingVideo(false);
  };

  const handleVideoWaiting = () => {
    // If video starts buffering during playback, mark as not ready
    setIsVideoReady(false);
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
      {/* Thumbnail - shown when not hovered or video not playing */}
      {(!isHovered || !isVideoPlaying) && !thumbnailError && (
        <Image
          src={displayThumbnailSrc}
          alt={alt}
          fill
          style={{ 
            objectFit,
            transition: 'opacity 0.3s ease',
            opacity: isVideoPlaying && isHovered ? 0 : 1,
            zIndex: isVideoPlaying && isHovered ? 0 : 1
          }}
          onError={handleThumbnailError}
        />
      )}
      
      {/* Fallback: show video as thumbnail if thumbnail doesn't exist */}
      {(!isHovered || !isVideoPlaying) && thumbnailError && (
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
            opacity: isVideoPlaying && isHovered ? 0 : 0.5, // Dimmed as thumbnail
            zIndex: isVideoPlaying && isHovered ? 0 : 1
          }}
          muted
          playsInline
          preload="none"
        />
      )}

      {/* Video - always rendered but hidden until ready and playing */}
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
          opacity: isVideoPlaying && isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: isVideoPlaying && isHovered ? 'auto' : 'none',
          visibility: isVideoReady && isHovered ? 'visible' : 'hidden',
          zIndex: isVideoPlaying && isHovered ? 2 : 0
        }}
        loop
        muted
        playsInline
        preload="none"
        onLoadStart={handleVideoLoadStart}
        onCanPlay={handleVideoCanPlay}
        onCanPlayThrough={handleVideoCanPlayThrough}
        onPlaying={handleVideoPlaying}
        onPause={handleVideoPause}
        onWaiting={handleVideoWaiting}
        onError={handleVideoError}
      />
    </div>
  );
}
