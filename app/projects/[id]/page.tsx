import { posts } from '@/app/lib/posts';
import ProjectDetailClient from './ProjectDetailClient';

// Generate static params for static export
export function generateStaticParams() {
  // Return all post IDs for static generation
  return posts.map(post => ({
    id: post.id,
  }));
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return <ProjectDetailClient id={params.id} />;
}
