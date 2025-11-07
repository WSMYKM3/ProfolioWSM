'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import PostGrid from './components/PostGrid';
import Modal from './components/Modal';
import { posts, Post } from './lib/posts';

export default function Home() {
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
      <Sidebar />
      <main className="main-content">
        <header>
          <h1>Siming Wang - Creative Technologist</h1>
        </header>
        <PostGrid posts={posts} onPostClick={handlePostClick} />
      </main>
      <Modal 
        post={selectedPost} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}

