'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { DailyPracticePost } from '@/app/lib/dailyPractice';

interface StickyNoteCardProps {
  post: DailyPracticePost;
  initialPosition?: { top: number; left: number; rotation: number };
  onCardClick: (post: DailyPracticePost) => void;
  isFiltered: boolean;
  category?: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function getImageSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}

export default function StickyNoteCard({ 
  post, 
  initialPosition, 
  onCardClick,
  isFiltered,
  category = 'more'
}: StickyNoteCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [justDragged, setJustDragged] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const cardStartPos = useRef({ left: 0, top: 0 });
  const initialRotation = useRef(initialPosition?.rotation || 0);

  // Load saved position from localStorage or use initial position
  useEffect(() => {
    if (typeof window !== 'undefined' && cardRef.current) {
      const savedPositions = JSON.parse(localStorage.getItem('cardPositions') || '{}');
      const cardIndex = post.id;
      
      if (savedPositions[cardIndex]) {
        cardRef.current.style.left = savedPositions[cardIndex].left + '%';
        cardRef.current.style.top = savedPositions[cardIndex].top + '%';
      } else if (initialPosition) {
        cardRef.current.style.left = initialPosition.left + '%';
        cardRef.current.style.top = initialPosition.top + '%';
      }
    }
  }, [post.id, initialPosition]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if ((e.target as HTMLElement).tagName === 'A') return;
    
    e.preventDefault();
    setIsDragging(true);
    setHasMoved(false);
    cardRef.current?.classList.add('dragging');
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    dragStartPos.current = { x: clientX, y: clientY };
    
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const container = cardRef.current.parentElement?.getBoundingClientRect();
      if (container) {
        cardStartPos.current = {
          left: rect.left - container.left,
          top: rect.top - container.top
        };
      }
    }
  };

  const handleDrag = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging || !cardRef.current) return;
    
    e.preventDefault();
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - dragStartPos.current.x;
    const deltaY = clientY - dragStartPos.current.y;
    
    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      setHasMoved(true);
    }
    
    const container = cardRef.current.parentElement?.getBoundingClientRect();
    if (!container) return;
    
    const newX = cardStartPos.current.left + deltaX;
    const newY = cardStartPos.current.top + deltaY;
    
    const cardRect = cardRef.current.getBoundingClientRect();
    const constrainedX = Math.max(0, Math.min(newX, container.width - cardRect.width));
    const constrainedY = Math.max(0, Math.min(newY, container.height - cardRect.height));
    
    cardRef.current.style.left = constrainedX + 'px';
    cardRef.current.style.top = constrainedY + 'px';
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    cardRef.current?.classList.remove('dragging');
    
    if (hasMoved && cardRef.current) {
      setJustDragged(true);
      setTimeout(() => setJustDragged(false), 100);
      
      const container = cardRef.current.parentElement?.getBoundingClientRect();
      if (container) {
        const rect = cardRef.current.getBoundingClientRect();
        const leftPercent = ((rect.left - container.left) / container.width) * 100;
        const topPercent = ((rect.top - container.top) / container.height) * 100;
        
        cardRef.current.style.left = leftPercent + '%';
        cardRef.current.style.top = topPercent + '%';
        
        // Save position
        const savedPositions = JSON.parse(localStorage.getItem('cardPositions') || '{}');
        savedPositions[post.id] = { left: leftPercent, top: topPercent };
        localStorage.setItem('cardPositions', JSON.stringify(savedPositions));
      }
    }
    
    setHasMoved(false);
  }, [isDragging, hasMoved, post.id]);

  useEffect(() => {
    if (isDragging) {
      const mouseMoveHandler = (e: MouseEvent) => handleDrag(e);
      const touchMoveHandler = (e: TouchEvent) => handleDrag(e);
      const mouseUpHandler = () => handleDragEnd();
      const touchEndHandler = () => handleDragEnd();
      
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('touchmove', touchMoveHandler, { passive: false });
      document.addEventListener('mouseup', mouseUpHandler);
      document.addEventListener('touchend', touchEndHandler);
      
      return () => {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('touchmove', touchMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        document.removeEventListener('touchend', touchEndHandler);
      };
    }
  }, [isDragging, handleDrag, handleDragEnd]);

  const handleClick = (e: React.MouseEvent) => {
    if (justDragged || hasMoved) {
      e.preventDefault();
      return;
    }
    onCardClick(post);
  };

  const imageSrc = getImageSrc(post.thumbnail);
  const formattedDate = formatDate(post.date);

  return (
    <div
      ref={cardRef}
      className={`card card-image ${isFiltered ? 'hidden' : ''} ${isDragging ? 'dragging' : ''}`}
      data-category={category}
      data-post-id={post.id}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      onClick={handleClick}
      style={{
        top: `${initialPosition?.top || 0}%`,
        left: `${initialPosition?.left || 0}%`,
        rotate: `${initialRotation.current}deg`,
      }}
    >
      <div className="card-content">
        <Image
          src={imageSrc}
          alt={post.title}
          width={400}
          height={300}
          className="card-img"
          loading="lazy"
        />
        <div className="card-info">
          <span className="card-tag">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
          <h3 className="card-title">{post.title}</h3>
          <p className="card-date">planted on {formattedDate}</p>
        </div>
      </div>
    </div>
  );
}
