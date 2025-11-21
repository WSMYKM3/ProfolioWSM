'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { posts, getPostById } from '@/app/lib/posts'
import Post1 from '@/app/components/posts/Post1'
import Post2 from '@/app/components/posts/Post2'
import Post3 from '@/app/components/posts/Post3'
import Post4 from '@/app/components/posts/Post4'

// Map post file identifiers to post IDs
const fileToPostId: Record<string, string> = {}
posts.forEach(post => {
  if (!fileToPostId[post.file]) {
    fileToPostId[post.file] = post.id
  }
})

const postComponents: Record<string, React.ComponentType> = {
  'post-1': Post1,
  'post-2': Post2,
  'post-3': Post3,
  'post-4': Post4,
}

export default function ProjectDetailClient({ slug }: { slug: string }) {
  // Find the post by slug (file identifier)
  const postId = fileToPostId[slug]
  const post = postId ? getPostById(postId) : undefined

  if (!post) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-white/60 mb-8">Project not found</p>
          <Link 
            href="/work" 
            className="text-white hover:text-white/80 transition-colors font-mono text-sm tracking-widest"
          >
            ← BACK TO WORK
          </Link>
        </div>
      </main>
    )
  }

  const PostContent = postComponents[post.id] || Post1

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link 
            href="/" 
            className="text-white font-mono text-sm tracking-widest hover:text-white/80 transition-colors"
          >
            WSM PORTFOLIO
          </Link>
          <Link 
            href="/work" 
            className="text-white/80 hover:text-white transition-colors font-mono text-sm tracking-widest"
          >
            ← BACK TO WORK
          </Link>
        </div>
      </nav>

      <div className="min-h-screen flex items-center justify-center p-8 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full"
        >
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl font-bold tracking-tighter mb-6"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <p className="text-white/60 font-mono text-sm tracking-widest mb-2">
              {post.tags.join(', ')}
            </p>
            <p className="text-white/40 font-mono text-xs tracking-widest">
              {post.date}
            </p>
          </motion.div>

          {/* Project Content - Using existing post components */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-2xl p-8 bg-white/5 backdrop-blur-lg"
          >
            <div className="post-content">
              <PostContent />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}

