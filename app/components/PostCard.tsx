'use client';

import Image from 'next/image';
import { Post } from '@/app/lib/posts';
import { DailyPracticePost } from '@/app/lib/dailyPractice';

interface PostCardProps {
  post: Post | DailyPracticePost;
  onClick: () => void;
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

export default function PostCard({ post, onClick }: PostCardProps) {
  const formattedDate = formatDate(post.date);
  const imageSrc = getImageSrc(post.thumbnail);
  
  // Get quality class for masonry layout (if quality exists)
  const quality = 'quality' in post ? post.quality : undefined;
  const qualityClass = quality ? `post-card-${quality}` : '';
  const cardClassName = `post-card ${qualityClass}`.trim();

  return (
    <div className={cardClassName} onClick={onClick}>
      <div className="post-card-image-wrapper">
        <Image 
          src={imageSrc} 
          alt={post.title}
          width={400}
          height={600}
          className="post-card-image"
          style={{ width: '100%', height: 'auto' }}
          loading="lazy"
        />
      </div>
      <div className="post-card-content">
        <div className="post-card-title">{post.title}</div>
        <div className="post-card-meta">{formattedDate}</div>
      </div>
    </div>
  );
}

