'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopNav from '@/app/components/TopNav';
import PostScrollContainer from '@/app/components/PostScrollContainer';
import HorizontalPostGrid from '@/app/components/HorizontalPostGrid';
import Modal from '@/app/components/Modal';
import { workPosts, Post } from '@/app/lib/posts';
import { shouldNavigateToPage, getPostPageRoute } from '@/app/lib/navigation';

const workPagePosts: Post[] = workPosts.map((post) =>
  post.id === 'post-7'
    ? { ...post, thumbnail: '/Reroll/thumbnail.png' }
    : post
);

export default function Work() {
  const router = useRouter();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handlePostClick = (post: Post) => {
    if (post.status === 'coming-soon') return;

    if (shouldNavigateToPage(post.id)) {
      router.push(getPostPageRoute(post.id));
    } else {
      setSelectedPost(post);
      setIsModalOpen(true);
    }
  };

  const handleProjectCardClick = (post: Post, index: number) => {
    if (post.status === 'coming-soon') return;

    if (selectedCardId === post.id) {
      handlePostClick(post);
      return;
    }

    setSelectedCardId(post.id);
    setActiveIndex(index);
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
          posts={workPagePosts}
          onPostClick={handlePostClick}
          onIndexChange={setActiveIndex}
          activeIndex={activeIndex}
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
            posts={workPagePosts}
            onPostClick={handleProjectCardClick}
            selectedPostId={selectedCardId}
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
