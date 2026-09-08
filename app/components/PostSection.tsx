'use client';

import { useRef, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import { Post } from '@/app/lib/posts';
import SoftwareIcon from './SoftwareIcon';

interface PostSectionProps {
  post: Post;
  index: number;
  isActive?: boolean;
  onPostClick?: (post: Post) => void;
  titleAction?: ReactNode;
}

// Helper function to add basePath for GitHub Pages
function getImageSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
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

function isVideoAsset(src: string): boolean {
  return /\.(mp4|webm)(?:$|[?#])/i.test(src);
}

export default function PostSection({ post, index, isActive = true, onPostClick, titleAction }: PostSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const isComingSoon = post.status === 'coming-soon';

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Removed duplicate event listener - using only React onClick

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

  const rawPreviewMedia = post.previewMedia || post.thumbnail;
  const previewMediaItems = Array.isArray(rawPreviewMedia)
    ? rawPreviewMedia.filter(Boolean)
    : (rawPreviewMedia ? [rawPreviewMedia] : []);
  const safePreviewIndex = previewMediaItems.length > 0
    ? previewIndex % previewMediaItems.length
    : 0;
  const previewMedia = previewMediaItems[safePreviewIndex] || '';
  const previewMediaSrc = previewMedia ? getImageSrc(previewMedia) : '';
  const previewPosterSrc = post.previewPoster
    ? getImageSrc(post.previewPoster)
    : (post.thumbnail ? getImageSrc(post.thumbnail) : undefined);
  const previewIsVideo = isVideoAsset(previewMedia);
  const previewAltItems = Array.isArray(post.previewMediaAlt)
    ? post.previewMediaAlt
    : (post.previewMediaAlt ? [post.previewMediaAlt] : []);
  const previewAlt = previewAltItems[safePreviewIndex] || `${post.title} project preview`;
  const previewFitItems = Array.isArray(post.previewMediaFit)
    ? post.previewMediaFit
    : (post.previewMediaFit ? [post.previewMediaFit] : []);
  const previewFit = previewFitItems[safePreviewIndex] || 'cover';
  const previewLayout = post.previewMediaLayout || 'slideshow';
  const usesSeparateCards = previewLayout === 'cards';
  const usesPortraitFrame = previewLayout === 'portrait';
  const description = post.previewDescription || post.description || 'A creative project showcasing innovative design and technology.';
  const softwareTools = post.softwareTools || [];
  const features = post.features || [];

  useEffect(() => {
    setPreviewIndex(0);

    if (!isActive || previewLayout !== 'slideshow' || previewMediaItems.length < 2) return;

    const intervalId = window.setInterval(() => {
      setPreviewIndex((currentIndex) => (currentIndex + 1) % previewMediaItems.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [isActive, post.id, previewLayout, previewMediaItems.length]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('✅ Button clicked for:', post.id, post.title);
    e.preventDefault();
    e.stopPropagation();
    if (onPostClick) {
      console.log('✅ Calling onPostClick for:', post.id);
      onPostClick(post);
    } else {
      console.error('❌ onPostClick is undefined!');
    }
  };

  const renderPreviewItem = (media: string, itemIndex: number) => {
    const mediaSrc = getImageSrc(media);
    const mediaAlt = previewAltItems[itemIndex] || `${post.title} project preview`;
    const mediaFit = previewFitItems[itemIndex] || 'cover';

    return isVideoAsset(media) ? (
      <video
        src={mediaSrc}
        poster={previewPosterSrc}
        aria-label={mediaAlt}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{ width: '100%', height: '100%', objectFit: mediaFit, display: 'block' }}
      />
    ) : (
      <Image
        src={mediaSrc}
        alt={mediaAlt}
        fill
        sizes={isMobile ? 'calc(100vw - 40px)' : '500px'}
        style={{ objectFit: mediaFit }}
      />
    );
  };

  const renderPreviewMedia = () => {
    if (previewMediaItems.length > 1 && previewLayout !== 'slideshow') {
      const isColumns = previewLayout === 'columns' || usesSeparateCards;

      return (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: isColumns ? `repeat(${previewMediaItems.length}, minmax(0, 1fr))` : '1fr',
            gridTemplateRows: isColumns ? '1fr' : `repeat(${previewMediaItems.length}, minmax(0, 1fr))`,
            gap: usesSeparateCards ? (isMobile ? '10px' : '18px') : '4px',
            backgroundColor: usesSeparateCards ? 'transparent' : 'rgba(255,255,255,0.12)'
          }}
        >
          {previewMediaItems.map((media, itemIndex) => (
            <div
              key={media}
              style={{
                position: 'relative',
                minWidth: 0,
                minHeight: 0,
                overflow: 'hidden',
                borderRadius: usesSeparateCards ? '18px' : 0,
                backgroundColor: usesSeparateCards ? 'rgba(12,12,12,0.78)' : '#080808',
                border: usesSeparateCards ? '1px solid rgba(255,255,255,0.22)' : 'none',
                boxShadow: usesSeparateCards ? '0 18px 36px rgba(0,0,0,0.38)' : 'none'
              }}
            >
              {renderPreviewItem(media, itemIndex)}
            </div>
          ))}
        </div>
      );
    }

    return (
      <AnimatePresence initial={false}>
        <motion.div
          key={previewMediaSrc}
          initial={{ opacity: 0, scale: 1.015 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {previewIsVideo ? (
            <video
              src={previewMediaSrc}
              poster={previewPosterSrc}
              aria-label={previewAlt}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{ width: '100%', height: '100%', objectFit: previewFit, display: 'block' }}
            />
          ) : (
            <Image
              src={previewMediaSrc}
              alt={previewAlt}
              fill
              sizes={isMobile ? 'calc(100vw - 40px)' : '500px'}
              style={{ objectFit: previewFit }}
            />
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

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
        backgroundColor: '#050505',
        pointerEvents: 'auto'
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
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          {isComingSoon ? (
            <div className="cinematic-placeholder-background" aria-hidden="true">
              <span>+</span>
            </div>
          ) : (
            <Image
              src={getImageSrc(post.thumbnail)}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              priority={index < 2}
            />
          )}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.4) 100%)',
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
        paddingTop: isMobile && index === 0 ? '80px' : (isMobile ? '20px' : '60px'), // Add extra padding for first section on mobile
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-end' : 'center',
        justifyContent: 'space-between',
        height: '100%',
        pointerEvents: 'auto', // Changed to auto to ensure clicks work
        backgroundColor: 'rgba(0, 0, 0, 0.3)' // Background with alpha transparency
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
            marginRight: isMobile ? '0' : '40px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 200
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

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
            flexWrap: 'wrap'
          }}
          className="cinematic-title-row">
            <h2 style={{
              fontSize: isMobile ? '2.5rem' : '4rem',
              fontWeight: 800,
              lineHeight: 1.1,
              margin: 0,
              color: '#fff',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              letterSpacing: '-0.02em'
            }}>
              {post.title}
              {post.subtitle && (
                <small className="cinematic-project-subtitle">{post.subtitle}</small>
              )}
            </h2>
            {titleAction}
          </div>

          {/* Horizontal divider line under project title */}
          <div className="cinematic-title-divider" style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            marginBottom: '24px',
            maxWidth: '90%'
          }} />

          {/* Mobile project preview */}
          {isMobile && previewMediaSrc && isActive && !isComingSoon && (
            <motion.div
              className={`cinematic-extra-mobile${usesSeparateCards ? ' cinematic-extra-mobile--cards' : ''}${usesPortraitFrame ? ' cinematic-extra-mobile--portrait' : ''}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onClick={() => onPostClick?.(post)}
              style={{
                width: '100%',
                maxWidth: '100%',
                height: usesSeparateCards ? '300px' : (usesPortraitFrame ? '280px' : '120px'),
                maxHeight: usesSeparateCards ? '300px' : (usesPortraitFrame ? '280px' : '120px'),
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                marginBottom: '16px',
                overflow: usesSeparateCards ? 'visible' : 'hidden',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <motion.div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '16px',
                  overflow: usesSeparateCards ? 'visible' : 'hidden',
                  backgroundColor: usesSeparateCards ? 'transparent' : 'rgba(20,20,20,0.5)',
                  backdropFilter: 'blur(20px)',
                  border: usesSeparateCards ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: usesSeparateCards ? 'none' : '0 20px 40px rgba(0,0,0,0.4)',
                }}
              >
                <div style={{ width: '100%', height: '100%', position: 'relative', overflow: usesSeparateCards ? 'visible' : 'hidden', borderRadius: '12px' }}>
                  {renderPreviewMedia()}
                </div>
              </motion.div>
              <button
                type="button"
                className="cinematic-preview-hit-target"
                aria-label={`Open ${post.title} project`}
                onClick={handleButtonClick}
              />
            </motion.div>
          )}

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
        </motion.div>

        {/* Project preview - Desktop only */}
        {!isMobile && previewMediaSrc && isActive && !isComingSoon && (
          <motion.div
            className={`cinematic-extra${usesSeparateCards ? ' cinematic-extra--cards' : ''}${usesPortraitFrame ? ' cinematic-extra--portrait' : ''}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onClick={(e) => {
              e.stopPropagation();
              onPostClick?.(post);
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                width: usesSeparateCards ? '680px' : (usesPortraitFrame ? '360px' : '500px'),
                height: usesSeparateCards ? '420px' : (usesPortraitFrame ? '430px' : '300px'),
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                perspective: '1000px',
                transformStyle: 'preserve-3d',
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 50,
                flexShrink: 0
              }}
            >
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '16px',
                overflow: usesSeparateCards ? 'visible' : 'hidden',
                backgroundColor: usesSeparateCards ? 'transparent' : 'rgba(20,20,20,0.5)',
                backdropFilter: 'blur(20px)',
                border: usesSeparateCards ? 'none' : '1px solid rgba(255,255,255,0.1)',
                boxShadow: usesSeparateCards ? 'none' : '0 20px 40px rgba(0,0,0,0.4)',
                rotateX,
                rotateY,
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div style={{ width: '100%', height: '100%', position: 'relative', overflow: usesSeparateCards ? 'visible' : 'hidden' }}>
                {renderPreviewMedia()}
              </div>
            </motion.div>
            <button
              type="button"
              className="cinematic-preview-hit-target"
              aria-label={`Open ${post.title} project`}
              onClick={handleButtonClick}
            />
          </motion.div>
        )}

      </div>
    </section>
  );
}
