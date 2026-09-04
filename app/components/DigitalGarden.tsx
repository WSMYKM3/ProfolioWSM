'use client';

import { useState, useEffect } from 'react';
import { DailyPracticePost } from '@/app/lib/dailyPractice';
import StickyNoteCard from './StickyNoteCard';

interface DigitalGardenProps {
  posts: DailyPracticePost[];
  onPostClick: (post: DailyPracticePost) => void;
}

// Three-column desktop layout with enough vertical clearance for every card.
const FIXED_POSITIONS = [
  { top: 2, left: 3, rotation: -2 },
  { top: 2, left: 37, rotation: 1 },
  { top: 2, left: 71, rotation: 2 },
  { top: 27, left: 3, rotation: 1 },
  { top: 27, left: 37, rotation: -1 },
  { top: 27, left: 71, rotation: 2 },
  { top: 52, left: 3, rotation: -1 },
  { top: 52, left: 37, rotation: 1 },
  { top: 52, left: 71, rotation: -2 },
  { top: 77, left: 3, rotation: 1 },
  { top: 77, left: 37, rotation: -1 },
];

// Map posts to categories based on tags
function getPostCategory(post: DailyPracticePost): string {
  const tags = post.tags.map(t => t.toLowerCase());
  
  if (tags.some(t => t.includes('3d') || t.includes('render'))) return '3d';
  if (tags.some(t => t.includes('animation') || t.includes('frame'))) return 'animation';
  if (tags.some(t => t.includes('shader') || t.includes('glsl'))) return 'shader';
  if (tags.some(t => t.includes('game') || t.includes('unity') || t.includes('unreal'))) return 'game';
  if (tags.some(t => t.includes('code') || t.includes('programming') || t.includes('script'))) return 'coding';
  
  return 'more';
}

export default function DigitalGarden({ posts, onPostClick }: DigitalGardenProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filteredPosts, setFilteredPosts] = useState<DailyPracticePost[]>(posts);
  
  const filterCategories = ['all', 'game', 'coding', '3d', 'animation', 'shader', 'more'];

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => getPostCategory(post) === activeFilter));
    }
  }, [activeFilter, posts]);

  return (
    <div className="digital-garden-page">
      {/* Filter Tags */}
      <div className="filter-container">
        {filterCategories.map(category => (
          <button
            key={category}
            className={`filter-tag ${activeFilter === category ? 'active' : ''}`}
            onClick={() => setActiveFilter(category)}
            data-filter={category}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Garden Container */}
      <main className="garden">
        <div className="garden-container">
          {posts.map((post, index) => {
            const position = FIXED_POSITIONS[index % FIXED_POSITIONS.length];
            const isHidden = !filteredPosts.includes(post);
            
            return (
              <StickyNoteCard
                key={post.id}
                post={post}
                initialPosition={position}
                onCardClick={onPostClick}
                isFiltered={isHidden}
                category={getPostCategory(post)}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
