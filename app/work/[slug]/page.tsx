import { posts } from '@/app/lib/posts'
import ProjectDetailClient from './ProjectDetailClient'

// Generate static params for static export
export function generateStaticParams() {
  // Get unique file identifiers (slugs) from posts
  const uniqueSlugs = Array.from(new Set(posts.map(post => post.file)))
  return uniqueSlugs.map(slug => ({
    slug: slug,
  }))
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  return <ProjectDetailClient slug={params.slug} />
}
