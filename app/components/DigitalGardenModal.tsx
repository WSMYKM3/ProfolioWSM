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
        <div className="digital-garden-modal-info">
          <h3 className="digital-garden-modal-title">{post.title}</h3>
          <p className="digital-garden-modal-date">planted on {formattedDate}</p>
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
