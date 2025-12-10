'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Post } from '@/app/lib/posts';
import SoftwareIcon from './SoftwareIcon';

interface PostSectionProps {
  post: Post;
  index: number;
  onPostClick?: (post: Post) => void;
}

// Helper function to add basePath for GitHub Pages
function getImageSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}

// Helper function to format date
function formatDate(dateString: string): string {
  // Handle year-only format (e.g., "2025")
  if (/^\d{4}$/.test(dateString.trim())) {
    return dateString.trim();
  }
  
  // Handle full date format
  const date = new Date(dateString);
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return dateString; // Return original string if invalid
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}/${year}`;
}

export default function PostSection({ post, index, onPostClick }: PostSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax effects
  const yBackground = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacityOverlay = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  // Helper function to convert YouTube watch URL to embed URL
  const convertToEmbedUrl = (url: string): string => {
    if (!url) return url;
    
    // If already an embed URL, return as is
    if (url.includes('/embed/')) {
      return url;
    }
    
    // Convert watch URL (https://www.youtube.com/watch?v=VIDEO_ID) to embed URL
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    
    // Convert short URL (https://youtu.be/VIDEO_ID) to embed URL
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    
    // Return original URL if no conversion needed
    return url;
  };

  // Default video URL if not provided
  const videoUrl = post.videoUrl;
  const embedUrl = videoUrl ? convertToEmbedUrl(videoUrl) : null;
  const videoTitle = post.videoTitle || post.title;
  const description = post.description || 'A creative project showcasing innovative design and technology.';
  const softwareTools = post.softwareTools || [];

  // Check if this post has multiple videos
  const hasMultipleVideos = post.videoUrls && post.videoUrls.length > 0;
  const videoUrls = post.videoUrls || [];

  return (
    <section
      ref={sectionRef}
      className="post-section-cinematic"
      style={{
        scrollSnapAlign: 'start',
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#050505'
      }}
    >
      {/* Background Media Layer */}
      <motion.div
        className="cinematic-background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '120%', // Taller for parallax
          y: isMobile ? 0 : yBackground,
          zIndex: 0
        }}
      >
        {embedUrl ? (
          <div className="video-background-wrapper" style={{ width: '100%', height: '100%', position: 'relative' }}>
            {embedUrl.includes('youtube.com') || embedUrl.includes('youtu.be') ? (
              <iframe
                src={`${embedUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${embedUrl.split('/embed/')[1]?.split('?')[0]}`}
                title={videoTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
              />
            ) : (
              <video
                src={embedUrl}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
            {/* Overlay gradient to ensure text readability */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)',
              zIndex: 1
            }} />
          </div>
        ) : (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image
              src={getImageSrc(post.thumbnail)}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              priority={index < 2}
            />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)',
              zIndex: 1
            }} />
          </div>
        )}
      </motion.div>

      {/* Content Layer */}
      <div className="cinematic-content-container" style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '1400px',
        padding: isMobile ? '20px' : '60px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-end' : 'center',
        justifyContent: 'space-between',
        height: '100%',
        pointerEvents: 'none' // Let clicks pass through to background if needed, but we'll enable for children
      }}>

        {/* Text Content */}
        <motion.div
          className="cinematic-text"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            flex: 1,
            maxWidth: isMobile ? '100%' : '600px',
            pointerEvents: 'auto',
            marginBottom: isMobile ? '40px' : '0'
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <span style={{
              display: 'inline-block',
              padding: '8px 16px',
              borderRadius: '20px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              fontSize: '1.1rem',
              color: '#ccc',
              marginBottom: '16px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              {formatDate(post.date)}
            </span>
          </div>

          <h2 style={{
            fontSize: isMobile ? '2.5rem' : '4rem',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '24px',
            color: '#fff',
            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            letterSpacing: '-0.02em'
          }}>
            {post.title}
          </h2>

          <p style={{
            fontSize: isMobile ? '1rem' : '1.125rem',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '32px',
            maxWidth: '90%'
          }}>
            {description}
          </p>

          <div className="software-icons-glass">
            {softwareTools.map((tool, idx) => (
              <SoftwareIcon key={`${post.id}-${tool}-${idx}`} name={tool} size={isMobile ? 30 : 40} />
            ))}
          </div>

          <button
            onClick={() => onPostClick?.(post)}
            style={{
              marginTop: '40px',
              padding: '16px 32px',
              backgroundColor: '#fff',
              color: '#000',
              border: 'none',
              borderRadius: '30px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Check Project Details
          </button>
        </motion.div>

        {/* Optional: Secondary Visual or Detail (Hidden on mobile to save space) */}
        {!isMobile && (
          <motion.div
            className="cinematic-extra"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onClick={() => onPostClick?.(post)}
            style={{
              width: '400px',
              height: '300px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.1)',
              backgroundColor: 'rgba(20,20,20,0.5)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Display GIF if available */}
            {post.gifUrl ? (
              <img 
                src={getImageSrc(post.gifUrl)} 
                alt={`${post.title} GIF`}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  display: 'block'
                }} 
              />
            ) : (
              <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                <div style={{ fontSize: '4rem', marginBottom: '10px', opacity: 0.3 }}>+</div>
                <div>More Details</div>
              </div>
            )}
          </motion.div>
        )}

      </div>
    </section>
  );
}
