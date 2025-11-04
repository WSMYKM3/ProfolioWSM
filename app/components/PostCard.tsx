'use client';

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

export default function PostCard({ post, onClick }: PostCardProps) {
  const formattedDate = formatDate(post.date);

  return (
    <div className="post-card" onClick={onClick}>
      <img 
        src={post.thumbnail} 
        alt={post.title}
        loading="lazy"
      />
      <div className="post-card-content">
        <div className="post-card-title">{post.title}</div>
        <div className="post-card-meta">{formattedDate}</div>
      </div>
    </div>
  );
}

