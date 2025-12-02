'use client';

import { useState } from 'react';
import TopNav from '@/app/components/TopNav';
import MasonryGrid from '@/app/components/MasonryGrid';
import Modal from '@/app/components/Modal';
import { dailyPracticePosts, DailyPracticePost } from '@/app/lib/dailyPractice';
import { Post } from '@/app/lib/posts';

export default function DailyPractice() {
  const [selectedPost, setSelectedPost] = useState<Post | DailyPracticePost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePostClick = (post: Post | DailyPracticePost) => {
    // Convert DailyPracticePost to Post format for Modal if needed
    if ('file' in post && post.file) {
      // Create a Post-like object for the modal
      const modalPost: Post = {
        id: post.id,
        title: post.title,
        thumbnail: post.thumbnail,
        file: post.file,
        date: post.date,
        tags: post.tags,
        quality: post.quality,
      };
      setSelectedPost(modalPost);
    } else {
      setSelectedPost(post as Post);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="layout">
      <TopNav />
      <main className="main-content masonry-page">
        <header>
          <h1>Daily Practice</h1>
        </header>
        <div className="masonry-container">
          <MasonryGrid posts={dailyPracticePosts} onPostClick={handlePostClick} />
        </div>
        <Modal 
          post={selectedPost as Post} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      </main>
    </div>
  );
}

