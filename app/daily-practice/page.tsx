'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopNav from '@/app/components/TopNav';
import DigitalGarden from '@/app/components/DigitalGarden';
import DigitalGardenModal from '@/app/components/DigitalGardenModal';
import { dailyPracticePosts, DailyPracticePost } from '@/app/lib/dailyPractice';
import { getPostPageRoute } from '@/app/lib/navigation';

export default function DailyPractice() {
  const router = useRouter();
  const [selectedPost, setSelectedPost] = useState<DailyPracticePost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Clear old localStorage key on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Remove old key, keep new one
      localStorage.removeItem('digitalGardenPositions');
    }
  }, []);

  const handlePostClick = (post: DailyPracticePost) => {
    if (post.projectId) {
      router.push(getPostPageRoute(post.projectId));
      return;
    }
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
      <main className="main-content explorations-line-page">
        <header>
          <h1>Explorations</h1>
        </header>
        <DigitalGarden 
          posts={dailyPracticePosts} 
          onPostClick={handlePostClick}
        />
      </main>
      <DigitalGardenModal 
        post={selectedPost} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}
