'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import { posts } from '@/app/lib/posts'

// Convert posts to projects format (as shown in README lines 423-433)
const projects = posts.map((post) => ({
  id: post.id,
  title: post.title,
  description: post.tags.join(', '), // or create a description field
  slug: post.file, // Use the existing file identifier
  date: post.date,
}))

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <main className="min-h-screen bg-black text-white" ref={containerRef}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link 
            href="/" 
            className="text-white font-mono text-sm tracking-widest hover:text-white/80 transition-colors"
          >
            WSM PORTFOLIO
          </Link>
          <div className="flex gap-8">
            <Link 
              href="/work" 
              className="text-white hover:text-white/80 transition-colors font-mono text-sm tracking-widest"
            >
              WORK
            </Link>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <div className="h-screen flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-8xl font-bold tracking-tighter text-center"
        >
          THE WORK
        </motion.h1>
      </div>

      {/* Project Tunnel */}
      <div className="relative">
        {projects.map((project, index) => {
          // Calculate transform values based on scroll progress
          const y = useTransform(
            scrollYProgress,
            [index / projects.length, (index + 1) / projects.length],
            ['0%', '-100%']
          )
          const opacity = useTransform(
            scrollYProgress,
            [
              (index - 0.5) / projects.length,
              index / projects.length,
              (index + 0.5) / projects.length,
            ],
            [0, 1, 0]
          )
          const scale = useTransform(
            scrollYProgress,
            [
              (index - 0.5) / projects.length,
              index / projects.length,
              (index + 0.5) / projects.length,
            ],
            [0.8, 1, 0.8]
          )

          return (
            <div
              key={project.id}
              className="h-screen flex items-center justify-center sticky top-0"
            >
              <motion.div
                style={{ y, opacity, scale }}
                className="text-center max-w-4xl px-8"
              >
                <Link href={`/work/${project.slug}`}>
                  <h2 className="text-6xl font-bold mb-4 tracking-tighter hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-600 transition-all">
                    {project.title}
                  </h2>
                  <p className="text-white/60 font-mono text-sm tracking-widest mb-2">
                    {project.description}
                  </p>
                  <p className="text-white/40 font-mono text-xs tracking-widest">
                    {project.date}
                  </p>
                </Link>
              </motion.div>
            </div>
          )
        })}
      </div>

      {/* Spacer for scroll */}
      <div className="h-screen"></div>
    </main>
  )
}

