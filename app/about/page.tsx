'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopNav from '@/app/components/TopNav';
import ProjectFilter from '@/app/components/ProjectFilter';
import ProjectGrid from '@/app/components/ProjectGrid';
import Modal from '@/app/components/Modal';
import { posts, Post } from '@/app/lib/posts';
import { shouldNavigateToPage, getPostPageRoute } from '@/app/lib/navigation';

export default function About() {
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
              <h1 className="about-name">Xinxin Wang</h1>
              <p className="about-intro-text">
                Hi — I&apos;m Simon, a{' '}
                <span className="sketch-underline orange">
                  Creative Technologist
                  <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M 2 5 Q 50 8, 100 4 T 198 6" pathLength="1" />
                  </svg>
                </span>
                {' '}who lives at the intersection of design and code. I build{' '}
                <span className="sketch-underline green">
                  games
                  <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M 2 6 Q 45 2, 100 7 T 198 4" pathLength="1" />
                  </svg>
                </span>
                ,{' '}
                <span className="sketch-underline purple">
                  XR experiences
                  <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M 2 4 Q 70 9, 130 3 Q 170 8, 198 5" pathLength="1" />
                  </svg>
                </span>
                , and{' '}
                <span className="sketch-underline blue">
                  spatial interfaces
                  <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M 3 6 Q 50 2, 95 7 Q 150 3, 197 6" pathLength="1" />
                  </svg>
                </span>
                {' '}using Unity, Unreal, and Blender — turning ideas into immersive, multi-media realities.
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
