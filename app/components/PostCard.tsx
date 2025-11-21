'use client';

import Image from 'next/image';
import { Post } from '@/app/lib/posts';

interface PostCardProps {
  post: Post;
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
  
  // 所有卡片统一使用相同大小
  const imageSrc = getImageSrc(post.thumbnail);

  return (
    <div className="post-card" onClick={onClick}>
      <Image 
        src={imageSrc} 
        alt={post.title}
        width={400}
        height={600}
        className="post-card-image"
        style={{ width: '100%' }}
        loading="lazy"
      />
      <div className="post-card-content">
        <div className="post-card-title">{post.title}</div>
        <div className="post-card-meta">{formattedDate}</div>
      </div>
    </div>
  );
}

