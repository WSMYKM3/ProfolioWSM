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

function movePostAfter(items: Post[], movingId: string, targetId: string): Post[] {
  const movingPost = items.find((post) => post.id === movingId);
  if (!movingPost) return items;

  const remainingPosts = items.filter((post) => post.id !== movingId);
  const targetIndex = remainingPosts.findIndex((post) => post.id === targetId);
  if (targetIndex === -1) return items;

  return [
    ...remainingPosts.slice(0, targetIndex + 1),
    movingPost,
    ...remainingPosts.slice(targetIndex + 1),
  ];
}

const workRailPosts = movePostAfter(workPagePosts, 'post-9', 'post-3');

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
        <section className="work-project-rail" aria-labelledby="selected-work-title">
          <div className="work-project-rail-heading">
            <h2 id="selected-work-title">Selected work</h2>
            <p>Scroll or drag to explore</p>
          </div>
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
