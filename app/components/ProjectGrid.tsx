'use client';

import Image from 'next/image';
import { Post } from '@/app/lib/posts';

interface ProjectGridProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

// Helper function to add basePath for GitHub Pages
function getImageSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}

export default function ProjectGrid({ posts, onPostClick }: ProjectGridProps) {
  return (
    <div className="about-project-grid">
      {posts.map((post) => (
        <div
          key={post.id}
          className="about-project-card"
          onClick={() => onPostClick(post)}
        >
          <div className="about-project-image-wrapper">
            <Image
              src={getImageSrc(post.thumbnail)}
              alt={post.title}
              width={1920}
              height={1080}
              className="about-project-image"
              loading="lazy"
            />
          </div>
          <div className="about-project-content">
            <h3 className="about-project-title">{post.title}</h3>
            {post.description && (
              <p className="about-project-description">{post.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
