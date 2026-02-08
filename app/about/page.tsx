'use client';

import { useState, useMemo } from 'react';
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
                Creative Technologist exploring the intersection of design, technology, and interactive experiences. 
                Passionate about creating immersive digital solutions that bridge the gap between imagination and reality.
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
