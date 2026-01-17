'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { posts, getPostById } from '@/app/lib/posts'
import Post1 from '@/app/components/posts/Post1'
import Post2 from '@/app/components/posts/Post2'
import Post3 from '@/app/components/posts/Post3'
import Post4 from '@/app/components/posts/Post4'
import Post6 from '@/app/components/posts/Post6'
import SoftwareIcon from '@/app/components/SoftwareIcon'

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
  'post-6': Post6,
}

// Helper function to add basePath for GitHub Pages
function getImageSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}

// Helper function to format date
function formatDate(dateString: string): string {
  // Handle custom date strings (e.g., "1 month for XRCC 2025 hackathon")
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString.trim())) {
    return dateString;
  }
  
  const date = new Date(dateString);
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return dateString; // Return original string if invalid
  }
  
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}/${year}`;
}

export default function ProjectDetailClient({ slug }: { slug: string }) {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
            className="text-white hover:text-white/80 transition-colors text-sm font-medium tracking-wide"
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
                className="text-white text-sm font-medium tracking-wide hover:text-white/80 transition-colors"
              >
                WSM PORTFOLIO
              </Link>
              <Link
                href="/work"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide"
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
          className="max-w-7xl w-full"
        >
          {/* Project Content - White rounded container with two columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="project-content-wrapper"
          >
            {/* Title and Videos for post-2 at the top */}
            {post.id === 'post-2' && (
              <>
                {/* Project Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  style={{
                    fontSize: isMobile ? '3rem' : '4.5rem',
                    fontWeight: 800,
                    color: '#fff',
                    textAlign: 'center',
                    marginBottom: '40px',
                    letterSpacing: '-0.02em',
                    width: '100%'
                  }}
                >
                  {post.title}
                </motion.h1>
                
                {/* Two Videos at the top - left and right */}
                {post.videoUrls && Array.isArray(post.videoUrls) && post.videoUrls.length >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                      gap: '24px',
                      marginBottom: '48px',
                      width: '100%'
                    }}
                  >
                    {post.videoUrls.slice(0, 2).map((videoUrl, idx) => {
                      // Convert YouTube URL to embed format
                      let embedUrl = '';
                      if (videoUrl.includes('/embed/')) {
                        embedUrl = videoUrl;
                      } else if (videoUrl.includes('youtube.com/watch')) {
                        const videoId = videoUrl.split('v=')[1]?.split('&')[0];
                        if (videoId) {
                          embedUrl = `https://www.youtube.com/embed/${videoId}`;
                        }
                      } else if (videoUrl.includes('youtu.be/')) {
                        const videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
                        if (videoId) {
                          embedUrl = `https://www.youtube.com/embed/${videoId}`;
                        }
                      } else {
                        embedUrl = videoUrl;
                      }
                      
                      const videoTitle = post.videoTitles?.[idx] || `${post.title} Video ${idx + 1}`;
                      
                      return (
                        <div key={idx} style={{ width: '100%' }}>
                          <div style={{
                            position: 'relative',
                            width: '100%',
                            paddingBottom: '56.25%', // 16:9 aspect ratio
                            height: 0,
                            overflow: 'hidden',
                            borderRadius: '12px',
                            backgroundColor: '#000',
                            marginBottom: '12px'
                          }}>
                            <iframe
                              src={embedUrl}
                              title={videoTitle}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                border: 'none'
                              }}
                            />
                          </div>
                          <p style={{
                            fontSize: '0.875rem',
                            color: 'rgba(255,255,255,0.7)',
                            textAlign: 'center',
                            margin: 0
                          }}>
                            {videoTitle}
                          </p>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </>
            )}

            <div className="project-detail-grid">
              {/* Left Column: PostCard */}
              <motion.div
                className="project-detail-left"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="project-detail-card">
                  <Image
                    src={getImageSrc(post.thumbnail)}
                    alt={post.title}
                    width={1920}
                    height={1080}
                    className="project-detail-image"
                    priority
                  />
                  <div className="project-detail-card-content">
                    {post.id !== 'post-2' && (
                      <h2 className="project-detail-card-title">{post.title}</h2>
                    )}
                    <div className="project-detail-card-meta">
                      <span className="project-detail-card-date">{formatDate(post.date)}</span>
                      <span className="project-detail-card-tags">{post.tags.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Video + Post Content */}
              <motion.div
                className="project-detail-right"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Single Video Player (for other posts) */}
                {post.id !== 'post-2' && post.videoUrl && (
                  <div className="project-detail-video">
                    <div className="video-wrapper">
                      {post.videoUrl.includes('youtube.com') || post.videoUrl.includes('youtu.be') ? (
                        <iframe
                          src={post.videoUrl}
                          title={`${post.title} Video`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="video-iframe"
                        />
                      ) : post.videoUrl.endsWith('.mp4') || post.videoUrl.endsWith('.webm') ? (
                        <video
                          src={post.videoUrl}
                          controls
                          className="video-element"
                          playsInline
                        />
                      ) : (
                        <iframe
                          src={post.videoUrl}
                          title={`${post.title} Video`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="video-iframe"
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Software Tools Icons */}
                {post.softwareTools && post.softwareTools.length > 0 && (
                  <div className="project-detail-tools">
                    {post.softwareTools.map((tool, idx) => (
                      <SoftwareIcon key={`${post.id}-${tool}-${idx}`} name={tool} size={40} />
                    ))}
                  </div>
                )}

                {/* Project Description */}
                {post.description && (
                  <p className="project-detail-description">{post.description}</p>
                )}

                {/* Post Content (additional content from Post components) */}
                <div className="post-content">
                  <PostContent />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}

