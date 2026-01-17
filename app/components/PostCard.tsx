'use client';

import Image from 'next/image';
import { Post } from '@/app/lib/posts';
import { DailyPracticePost } from '@/app/lib/dailyPractice';

interface PostCardProps {
  post: Post | DailyPracticePost;
  onClick: () => void;
  isViewed?: boolean;
  checkboxId?: string;
  isActive?: boolean;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}/${year}`;
}

// Helper function to add basePath for GitHub Pages
// With static export, we need to manually add basePath in production
function getImageSrc(src: string): string {
  // If it's already a full URL (http/https), return as is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  // Add basePath only in production builds (for GitHub Pages)
  // In development, basePath is empty so images work at localhost:3000
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}

export default function PostCard({ post, onClick, isViewed = false, checkboxId, isActive = false }: PostCardProps) {
  const formattedDate = formatDate(post.date);
  const imageSrc = getImageSrc(post.thumbnail);
  
  // Get quality class for masonry layout (if quality exists)
  const quality = 'quality' in post ? post.quality : undefined;
  const qualityClass = quality ? `post-card-${quality}` : '';
  const activeClass = isActive ? 'is-active' : '';
  const cardClassName = `post-card ${qualityClass} ${activeClass}`.trim();
  
  // Generate unique checkbox ID if not provided
  const toggleId = checkboxId || `toggle-${post.id}`;

  return (
    <label htmlFor={toggleId} className={cardClassName} onClick={onClick}>
      <input 
        type="checkbox" 
        id={toggleId} 
        checked={isViewed}
        readOnly
        onChange={() => {}} // Controlled by parent state
      />
      <div className="btn">
        <div className="post-card-image-wrapper">
          <Image 
            src={imageSrc} 
            alt={post.title}
            width={1920}
            height={1080}
            className="post-card-image"
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
          />
        </div>
        <div className="top">{post.title}</div>
        <div className="bottom">
          <i className="dot"></i>
        </div>
      </div>
    </label>
  );
}

