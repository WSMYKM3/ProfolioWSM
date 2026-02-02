'use client';

import Image from 'next/image';
import { Post } from '@/app/lib/posts';
import SoftwareIcon from './SoftwareIcon';

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

// Helper function to truncate description for collapsed view
function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text || '';
  return text.slice(0, maxLength).trim() + '...';
}

export default function ProjectGrid({ posts, onPostClick }: ProjectGridProps) {
  return (
    <div className="strip-gallery">
      {posts.map((post) => (
        <div
          key={post.id}
          className="strip-card"
          onClick={() => onPostClick(post)}
        >
          {/* Collapsed layer - visible by default */}
          <div className="strip-collapsed">
            <Image
              src={getImageSrc(post.thumbnail)}
              alt={post.title}
              width={800}
              height={1200}
              className="strip-collapsed-image"
              loading="lazy"
            />
            <h4 className="strip-collapsed-title">{post.title}</h4>
            {post.description && (
              <p className="strip-collapsed-desc">
                {truncateText(post.description, 50)}
              </p>
            )}
          </div>

          {/* Expanded layer - visible on hover */}
          <div className="strip-expanded">
            <div className="strip-expanded-image-wrapper">
              <Image
                src={getImageSrc(post.thumbnail)}
                alt={post.title}
                width={1920}
                height={1080}
                className="strip-expanded-image"
                loading="lazy"
              />
            </div>
            <div className="strip-expanded-content">
              <h3 className="strip-expanded-title">{post.title}</h3>
              {post.description && (
                <p className="strip-expanded-desc">{post.description}</p>
              )}
              {post.role && (
                <div className="strip-expanded-role">
                  <span className="strip-role-label">Role:</span>
                  <span className="strip-role-value">{post.role}</span>
                </div>
              )}
              {post.softwareTools && post.softwareTools.length > 0 && (
                <div className="strip-expanded-tools">
                  {post.softwareTools.map((tool) => (
                    <SoftwareIcon key={tool} name={tool} size={24} />
                  ))}
                </div>
              )}
              {post.tags && post.tags.length > 0 && (
                <div className="strip-expanded-tags">
                  {post.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="strip-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
