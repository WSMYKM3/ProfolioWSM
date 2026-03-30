'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopNav from './components/TopNav';
import ProjectFilter from './components/ProjectFilter';
import ProjectGrid from './components/ProjectGrid';
import Modal from './components/Modal';
import { posts, Post } from './lib/posts';
import { shouldNavigateToPage, getPostPageRoute } from './lib/navigation';

export default function Home() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter posts based on selected filter
  const filteredPosts = useMemo(() => {
    if (selectedFilter === 'all') {
      return posts;
    }
    // Filter by tag (including 'featured')
    return posts.filter(post => 
      post.tags.some(tag => tag.toLowerCase() === selectedFilter.toLowerCase())
    );
  }, [selectedFilter]);

  const handlePostClick = (post: Post) => {
    if (shouldNavigateToPage(post.id)) {
      router.push(getPostPageRoute(post.id));
    } else {
      setSelectedPost(post);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  // Animate sketch underlines when they scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const path = el.querySelector('path');
          if (path) {
            const delay = parseFloat(el.dataset.delay || '0');
            setTimeout(() => path.classList.add('drawn'), delay * 1000);
          }
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll<HTMLElement>('.sketch-underline').forEach((el, i) => {
      el.dataset.delay = (i * 0.15).toFixed(2);
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="layout">
      <TopNav />
      <main className="about-page">
        {/* Video Section */}
        <section className="about-video-section">
          <div className="about-video-container">
            <div className="about-video-intro">
              <h1 className="about-name">Siming Wang</h1>
              <p className="about-intro-text">
                Hi, I&apos;m a Creative Technologist who values{' '}
                <span className="sketch-underline orange">
                  both design and technology
                  <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M 2 5 Q 50 8, 100 4 T 198 6" pathLength="1" />
                  </svg>
                </span>
                ,
                <br />
                building{' '}
                <span className="sketch-underline green">
                  real-world
                  <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M 2 6 Q 45 2, 100 7 T 198 4" pathLength="1" />
                  </svg>
                </span>
                {' '}digital solutions through tangible, interactive, multi-media systems.
                <br />
                I make{' '}
                <span className="sketch-underline blue">
                  games
                  <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M 3 4 Q 60 9, 120 3 Q 160 7, 197 5" pathLength="1" />
                  </svg>
                </span>
                ,{' '}
                <span className="sketch-underline purple">
                  XR products
                  <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M 2 4 Q 70 9, 130 3 Q 170 8, 198 5" pathLength="1" />
                  </svg>
                </span>
                ,{' '}
                <span className="sketch-underline orange">
                  animation trailers
                  <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M 3 6 Q 50 2, 95 7 Q 150 3, 197 6" pathLength="1" />
                  </svg>
                </span>
                .
              </p>
            </div>
            <div 
              className="about-video"
              style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '30%', // Wider aspect ratio
                height: 0,
                overflow: 'hidden'
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/ThW5sgK06q0?autoplay=1&mute=1&loop=1&playsinline=1&playlist=ThW5sgK06q0"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video player"
              />
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="scroll-indicator-wrapper" aria-hidden="true">
            <div className="scroll-indicator">
              <span className="scroll-indicator-text">scroll</span>
              <div className="scroll-indicator-chevron" />
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="about-filter-wrapper">
          <ProjectFilter 
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </section>

        {/* Projects Grid Section */}
        <section className="about-projects-section">
          <ProjectGrid 
            posts={filteredPosts}
            onPostClick={handlePostClick}
          />
        </section>
      </main>
      <Modal 
        post={selectedPost} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}
