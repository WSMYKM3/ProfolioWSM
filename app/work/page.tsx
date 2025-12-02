'use client'

import Link from 'next/link'
import TopNav from '@/app/components/TopNav'
import { motion } from 'framer-motion'
import { posts } from '@/app/lib/posts'
import Image from 'next/image'

// Convert posts to projects format
const projects = posts.map((post) => ({
  id: post.id,
  title: post.title,
  description: post.description || post.tags.join(', '),
  slug: post.file,
  date: post.date,
  thumbnail: post.thumbnail,
  tags: post.tags,
}))

function getImageSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}

export default function Work() {
  return (
    <div className="layout">
      <TopNav />
      <main className="work-page">
        {/* Hero Section - Two Column Layout */}
        <section className="work-hero">
          <div className="work-hero-container">
            {/* Left Column: Text */}
            <motion.div
              className="work-hero-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className="work-hero-tagline">ENGINEERING TOMORROW'S DIGITAL INTERFACES TODAY</p>
              <h1 className="work-hero-title">
                <span>THE</span>
                <span>WORK</span>
              </h1>
              <div className="work-hero-badge">CREATIVE TECHNOLOGY</div>
            </motion.div>

            {/* Right Column: Featured Visual */}
            <motion.div
              className="work-hero-right"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              {projects[0] && (
                <div className="work-hero-visual">
                  <Image
                    src={getImageSrc(projects[0].thumbnail)}
                    alt={projects[0].title}
                    width={600}
                    height={800}
                    className="work-hero-image"
                    priority
                  />
                  <div className="work-hero-badges">
                    <span className="work-badge">RESPONSIVE</span>
                    <span className="work-badge">INTERACTIVE</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="work-projects">
          <div className="work-projects-container">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="work-project-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/work/${project.slug}`} className="work-project-link">
                  <div className="work-project-image-wrapper">
                    <Image
                      src={getImageSrc(project.thumbnail)}
                      alt={project.title}
                      width={400}
                      height={500}
                      className="work-project-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="work-project-content">
                    <h2 className="work-project-title">{project.title}</h2>
                    <p className="work-project-description">{project.description}</p>
                    <div className="work-project-meta">
                      <span className="work-project-date">{project.date}</span>
                      <div className="work-project-tags">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="work-project-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

