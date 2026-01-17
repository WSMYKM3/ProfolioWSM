'use client';

import { useState } from 'react';
import TopNav from '@/app/components/TopNav';
import PostScrollContainer from '@/app/components/PostScrollContainer';
import HorizontalPostGrid from '@/app/components/HorizontalPostGrid';
import Modal from '@/app/components/Modal';
import { posts, Post } from '@/app/lib/posts';

export default function Work() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewedPosts, setViewedPosts] = useState<Set<string>>(new Set());
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handlePostClick = (post: Post) => {
    console.log('🔴 Work page handlePostClick:', post.id, post.title);
    setViewedPosts(prev => new Set(prev).add(post.id));
    setSelectedPost(post);
    setIsModalOpen(true);
    console.log('🔴 Modal should open now');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="layout">
      <TopNav />
      <main className="main-content">
        <header>
          <h1>THE WORK</h1>
        </header>
        <PostScrollContainer 
          posts={posts} 
          onPostClick={handlePostClick}
          onIndexChange={setActiveIndex}
        />
        <div className="check-project-details-button-container">
          <button
            className="check-project-details-button"
            onClick={() => {
              if (posts[activeIndex]) {
                handlePostClick(posts[activeIndex]);
              }
            }}
            aria-label="Check project details"
          >
            Check Project Details
          </button>
        </div>
        <HorizontalPostGrid 
          posts={posts} 
          onPostClick={handlePostClick}
          viewedPosts={viewedPosts}
          activeIndex={activeIndex}
        />
      </main>
      <Modal 
        post={selectedPost} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}
