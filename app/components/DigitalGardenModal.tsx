'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { DailyPracticePost } from '@/app/lib/dailyPractice';

interface DigitalGardenModalProps {
  post: DailyPracticePost | null;
  isOpen: boolean;
  onClose: () => void;
}

function formatDate(dateString: string): string {
  // If date is already in a custom format (e.g., "2025.9"), return as-is
  if (dateString.includes('.') && !dateString.includes('-')) {
    return dateString;
  }
  // Otherwise, parse and format standard date strings
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}/${year}`;
}

function getImageSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}

// Helper function to convert YouTube watch URL to embed URL
function convertToEmbedUrl(url: string): string {
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
}

export default function DigitalGardenModal({ post, isOpen, onClose }: DigitalGardenModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !post) return null;

  const imageSrc = getImageSrc(post.thumbnail);
  const formattedDate = formatDate(post.date);

  return (
    <div
      className={`digital-garden-modal ${isOpen ? 'active' : ''}`}
      ref={modalRef}
    >
      <div className="digital-garden-modal-backdrop" onClick={onClose} />
      <div className="digital-garden-modal-content">
        <button
          className="digital-garden-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {post.videoUrl ? (
          <div className="digital-garden-modal-video-wrapper">
            <iframe
              src={convertToEmbedUrl(post.videoUrl)}
              title={post.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="digital-garden-modal-video"
            />
          </div>
        ) : (
          <div className="digital-garden-modal-image-wrapper">
            <Image
              src={imageSrc}
              alt={post.title}
              width={1200}
              height={1600}
              className="digital-garden-modal-image"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        )}
        <div className="digital-garden-modal-info">
          <h3 className="digital-garden-modal-title">{post.title}</h3>
          <p className="digital-garden-modal-date">planted on {formattedDate}</p>
          {post.description && (
            <p className="digital-garden-modal-description">{post.description}</p>
          )}
          {post.tags.length > 0 && (
            <div className="digital-garden-modal-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="digital-garden-modal-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
