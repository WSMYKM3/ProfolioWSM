'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
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
  const sectionRef = useRef<HTMLElement>(null);
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

  // Tilt Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
  const features = post.features || [];

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
      {/* Background Media Layer - Always use image */}
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
            marginBottom: isMobile ? '40px' : '0',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <div style={{ marginBottom: '12px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
              <span style={{
                display: 'inline-block',
                padding: '8px 16px',
                borderRadius: '20px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                fontSize: '1.1rem',
                color: '#ccc',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                {formatDate(post.date)}
              </span>
              {post.role && (
                <span style={{
                  fontSize: isMobile ? '0.95rem' : '1rem',
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap'
                }}>
                  {post.role}
                </span>
              )}
            </div>
            {features.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
                {features.map((feature, idx) => (
                  <span
                    key={`${post.id}-feature-${idx}`}
                    style={{
                      fontSize: isMobile ? '0.9rem' : '1rem',
                      color: 'rgba(255,255,255,0.7)',
                      fontWeight: 400,
                      letterSpacing: '0.02em',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}
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

          {/* Horizontal divider line under project title */}
          <div style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            marginBottom: '24px',
            maxWidth: '90%'
          }} />

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
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              width: '500px', // Increased width, height remains the same
              height: '300px',
              borderRadius: '16px',
              // overflow: 'hidden', // Allow 3D effect to extend? Actually hidden is good for content
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              perspective: '1000px',
              transformStyle: 'preserve-3d',
            }}
          >
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: 'rgba(20,20,20,0.5)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                rotateX,
                rotateY,
              }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Display Video if available, otherwise show placeholder */}
              {embedUrl ? (
                <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
                  {embedUrl.includes('youtube.com') || embedUrl.includes('youtu.be') ? (
                    <iframe
                      src={`${embedUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${embedUrl.split('/embed/')[1]?.split('?')[0]}`}
                      title={videoTitle}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ 
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '177.78%', // 16:9 aspect ratio (16/9 = 1.7778) to fill width
                        height: '100%',
                        transform: 'translate(-50%, -50%)',
                        border: 'none',
                        pointerEvents: 'none'
                      }}
                    />
                  ) : (
                    <video
                      src={embedUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  )}
                </div>
              ) : (
                <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '10px', opacity: 0.3 }}>+</div>
                  <div>More Details</div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
