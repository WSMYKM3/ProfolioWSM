'use client';

import { useRef, useEffect } from 'react';
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
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}/${year}`;
}

export default function PostSection({ post, index, onPostClick }: PostSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax effects
  const postcardY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const videoY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  // Intro section opacity: start visible and fade in more as you scroll
  // Minimum opacity of 0.7 ensures it's always visible
  const introOpacity = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const introY = useTransform(scrollYProgress, [0, 1], [10, 0]);

  // Default video URL if not provided
  const videoUrl = post.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
  const description = post.description || 'A creative project showcasing innovative design and technology.';
  const softwareTools = post.softwareTools || ['Unity', 'Blender'];

  return (
    <section
      ref={sectionRef}
      className="post-section"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="post-section-container">
        {/* Left Column: Postcard */}
        <motion.div
          className="post-section-left"
          style={{ y: postcardY }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="post-section-card" onClick={() => onPostClick?.(post)}>
            <Image
              src={getImageSrc(post.thumbnail)}
              alt={post.title}
              width={600}
              height={800}
              className="post-section-image"
              loading="lazy"
            />
            <div className="post-section-card-content">
              <h2 className="post-section-title">{post.title}</h2>
              <div className="post-section-meta">
                <span className="post-section-date">{formatDate(post.date)}</span>
                <span className="post-section-tags">{post.tags.join(', ')}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Video + Intro */}
        <div className="post-section-right">
          {/* Video Player */}
          <motion.div
            className="post-section-video"
            style={{ y: videoY }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="video-wrapper">
              {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
                <iframe
                  src={videoUrl}
                  title={`${post.title} Video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-iframe"
                />
              ) : videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm') ? (
                <video
                  src={videoUrl}
                  controls
                  className="video-element"
                  playsInline
                />
              ) : (
                <iframe
                  src={videoUrl}
                  title={`${post.title} Video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-iframe"
                />
              )}
            </div>
          </motion.div>

          {/* Intro Section (Bottom Right) */}
          <motion.div
            className="post-section-intro"
            style={{ opacity: introOpacity, y: introY }}
            initial={{ opacity: 0.7, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Software Icons Row */}
            <div className="intro-icons-row">
              {softwareTools.map((tool, idx) => (
                <SoftwareIcon key={`${post.id}-${tool}-${idx}`} name={tool} size={40} />
              ))}
            </div>

            {/* Description Text */}
            <p className="intro-description">{description}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

