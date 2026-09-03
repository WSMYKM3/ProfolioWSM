import { posts } from '@/app/lib/posts';
import type { Metadata } from 'next';
import ProjectDetailClient from './ProjectDetailClient';

// Generate static params for static export
export function generateStaticParams() {
  // Return all post IDs for static generation
  return posts.map(post => ({
    id: post.id,
  }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const post = posts.find((item) => item.id === params.id);

  if (!post) {
    return { title: 'Project not found — Siming Wang' };
  }

  const description = post.shortDescription || post.description || `${post.title} by Siming Wang.`;

  return {
    title: `${post.title} — Siming Wang`,
    description,
    openGraph: {
      title: `${post.title} — Siming Wang`,
      description,
      images: [],
    },
    twitter: {
      title: `${post.title} — Siming Wang`,
      description,
      images: [],
    },
  };
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return <ProjectDetailClient id={params.id} />;
}
