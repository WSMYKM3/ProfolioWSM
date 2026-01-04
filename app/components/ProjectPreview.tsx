'use client';

import Image from 'next/image';
import { Post } from '@/app/lib/posts';
import { DailyPracticePost } from '@/app/lib/dailyPractice';
import { posts } from '@/app/lib/posts';

interface ProjectPreviewProps {
  post: Post | DailyPracticePost | null;
}

// Helper function to add basePath for GitHub Pages
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

  return url;
}

// Convert DailyPracticePost to Post to get videoUrl
function getPostWithVideo(post: Post | DailyPracticePost | null): Post | null {
  if (!post) return null;
  
  // If it's already a Post with videoUrl, return it
  if ('videoUrl' in post && post.videoUrl) {
    return post as Post;
  }
  
  // If it's a DailyPracticePost with file, find the corresponding Post
  if ('file' in post && post.file) {
    const fullPost = posts.find(p => p.file === post.file);
    if (fullPost) {
      return fullPost;
    }
  }
  
  // Return as Post if no conversion needed
  return post as Post;
}

export default function ProjectPreview({ post }: ProjectPreviewProps) {
  if (!post) {
    return (
      <div className="project-preview">
        <div className="project-preview-placeholder">
          <p>Select a project to view</p>
        </div>
      </div>
    );
  }

  const fullPost = getPostWithVideo(post);
  const videoUrl = fullPost?.videoUrl 
    ? convertToEmbedUrl(fullPost.videoUrl) 
    : null;
  const imageSrc = getImageSrc(post.thumbnail);

  return (
    <div className="project-preview">
      <div className="project-preview-content">
        <div className="project-preview-media">
          {videoUrl ? (
            <div className="project-preview-video">
              {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
                <iframe
                  src={videoUrl}
                  title={post.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  muted
                  loop
                />
              )}
            </div>
          ) : (
            <div className="project-preview-image">
              <Image
                src={imageSrc}
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
        </div>
        <div className="project-preview-title">
          <h2>{post.title}</h2>
        </div>
      </div>
    </div>
  );
}

