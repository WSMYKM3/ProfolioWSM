'use client';

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
  const visiblePosts = posts.filter((post) => post.title.toLowerCase() !== 'upcoming');

  return (
    <div className="digital-garden-page">
      {/* Garden Container */}
      <main className="garden">
        <div className="garden-container">
          {visiblePosts.map((post, index) => {
            const position = FIXED_POSITIONS[index % FIXED_POSITIONS.length];
            
            return (
              <StickyNoteCard
                key={post.id}
                post={post}
                initialPosition={position}
                onCardClick={onPostClick}
                isFiltered={false}
                category={getPostCategory(post)}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
