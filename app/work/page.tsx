'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopNav from '@/app/components/TopNav';
import PostScrollContainer from '@/app/components/PostScrollContainer';
import HorizontalPostGrid from '@/app/components/HorizontalPostGrid';
import Modal from '@/app/components/Modal';
import { workPosts, Post } from '@/app/lib/posts';
import { shouldNavigateToPage, getPostPageRoute } from '@/app/lib/navigation';

export default function Work() {
  const router = useRouter();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewedPosts, setViewedPosts] = useState<Set<string>>(new Set());
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handlePostClick = (post: Post) => {
    if (post.status === 'coming-soon') return;

    console.log('🔴 Work page handlePostClick:', post.id, post.title);
    setViewedPosts(prev => new Set(prev).add(post.id));
    
    if (shouldNavigateToPage(post.id)) {
      router.push(getPostPageRoute(post.id));
    } else {
      setSelectedPost(post);
      setIsModalOpen(true);
      console.log('🔴 Modal should open now');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="layout">
      <TopNav />
      <main className="main-content work-line-page">
        <header>
          <h1>THE WORK</h1>
        </header>
        <PostScrollContainer
          posts={workPosts}
          onPostClick={handlePostClick}
          onIndexChange={setActiveIndex}
          titleAction={(post) => (
            post.status === 'published' ? (
              <button
                className="check-project-details-button check-project-details-button-title"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  handlePostClick(post);
                }}
                aria-label={`Check ${post.title} project details`}
              >
                Check Project Details
              </button>
            ) : null
          )}
        />
        <section className="work-project-rail" aria-labelledby="selected-work-title">
          <div className="work-project-rail-heading">
            <h2 id="selected-work-title">Selected work</h2>
            <p>Scroll or drag to explore</p>
          </div>
          <HorizontalPostGrid
            posts={workPosts}
            onPostClick={handlePostClick}
            viewedPosts={viewedPosts}
            activeIndex={activeIndex}
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
