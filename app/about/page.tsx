'use client';

import { useState } from 'react';
import TopNav from '@/app/components/TopNav';
import PostScrollContainer from '@/app/components/PostScrollContainer';
import Modal from '@/app/components/Modal';
import { posts, Post } from '@/app/lib/posts';

export default function About() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <main className="main-content">
        <header>
          <h1>ABOUT ME</h1>
        </header>
        <PostScrollContainer posts={posts} onPostClick={handlePostClick} />
      </main>
      <Modal 
        post={selectedPost} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}
