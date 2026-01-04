'use client';

import { useState } from 'react';
import TopNav from '@/app/components/TopNav';
import HorizontalPostGrid from '@/app/components/HorizontalPostGrid';
import ProjectPreview from '@/app/components/ProjectPreview';
import { dailyPracticePosts, DailyPracticePost } from '@/app/lib/dailyPractice';
import { Post } from '@/app/lib/posts';

export default function DailyPractice() {
  // Initialize with first post
  const [selectedPost, setSelectedPost] = useState<Post | DailyPracticePost | null>(
    dailyPracticePosts.length > 0 ? dailyPracticePosts[0] : null
  );
  const [viewedPosts, setViewedPosts] = useState<Set<string>>(new Set());

  const handlePostClick = (post: Post | DailyPracticePost) => {
    // Mark post as viewed
    setViewedPosts(prev => new Set(prev).add(post.id));
    
    // Update selected post to show in preview
    setSelectedPost(post);
  };

  return (
    <div className="layout">
      <TopNav />
      <main className="main-content daily-practice-page">
        <header>
          <h1>Daily Practice</h1>
        </header>
        <div className="daily-practice-container">
          <ProjectPreview post={selectedPost} />
          <HorizontalPostGrid 
            posts={dailyPracticePosts} 
            onPostClick={handlePostClick}
            viewedPosts={viewedPosts}
          />
        </div>
      </main>
    </div>
  );
}

