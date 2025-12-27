'use client';

import { useState, useMemo } from 'react';
import TopNav from './components/TopNav';
import ProjectFilter from './components/ProjectFilter';
import ProjectGrid from './components/ProjectGrid';
import Modal from './components/Modal';
import { posts, Post } from './lib/posts';

// Helper function for video path
function getVideoSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}

export default function Home() {
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
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="layout">
      <TopNav />
      <main className="about-page">
        {/* Video Section */}
        <section className="about-video-section">
          <div className="about-video-container">
            <div className="about-video-intro">
              <p className="about-intro-text">
                Creative Technologist exploring the intersection of design, technology, and interactive experiences. 
                Passionate about creating immersive digital solutions that bridge the gap between imagination and reality.
              </p>
            </div>
            <video
              className="about-video"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              src={getVideoSrc('/video-placeholder.mp4')}
            >
              Your browser does not support the video tag.
            </video>
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
