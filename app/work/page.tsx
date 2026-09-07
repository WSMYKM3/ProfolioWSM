'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopNav from '@/app/components/TopNav';
import PostScrollContainer from '@/app/components/PostScrollContainer';
import HorizontalPostGrid from '@/app/components/HorizontalPostGrid';
import Modal from '@/app/components/Modal';
import { workPosts, Post } from '@/app/lib/posts';
import { shouldNavigateToPage, getPostPageRoute } from '@/app/lib/navigation';

const workPageOrder = [
  'post-7',  // Reroll
  'post-2',  // Signie
  'post-1',  // Datnie
  'post-8',  // Sorting Factory
  'post-10', // Could've
  'post-3',  // I AND AI: MIRROR
  'post-9',  // It won't wait
  'post-4',  // The Shadow of Horizon
  'post-5',  // The Tool Box
] as const;

const workPageOrderIndex = new Map<string, number>(
  workPageOrder.map((id, index) => [id, index]),
);

const workRailPosts: Post[] = workPosts
  .map((post) =>
    post.id === 'post-7'
      ? { ...post, thumbnail: '/Reroll/thumbnail.webp' }
      : post
  )
  .sort((a, b) =>
    (workPageOrderIndex.get(a.id) ?? Number.MAX_SAFE_INTEGER) -
    (workPageOrderIndex.get(b.id) ?? Number.MAX_SAFE_INTEGER)
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

  const handleProjectCardClick = (post: Post) => {
    if (post.status === 'coming-soon') return;

    if (selectedCardId === post.id) {
      handlePostClick(post);
      return;
    }

    setSelectedCardId(post.id);
    const carouselIndex = workRailPosts.findIndex((item) => item.id === post.id);
    if (carouselIndex !== -1) {
      setActiveIndex(carouselIndex);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const activePostId = workRailPosts[activeIndex]?.id;
  const activeRailIndex = workRailPosts.findIndex((post) => post.id === activePostId);

  return (
    <div className="layout">
      <TopNav />
      <main className="main-content work-line-page">
        <header>
          <h1>THE WORK</h1>
        </header>
        <PostScrollContainer
          posts={workRailPosts}
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
        <section className="work-project-rail" aria-label="Project selection">
          <HorizontalPostGrid
            posts={workRailPosts}
            onPostClick={handleProjectCardClick}
            selectedPostId={selectedCardId}
            activeIndex={activeRailIndex}
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
