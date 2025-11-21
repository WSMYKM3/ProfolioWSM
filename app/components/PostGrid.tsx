'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Post } from '@/app/lib/posts';
import PostCard from './PostCard';

interface PostGridProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

export default function PostGrid({ posts, onPostClick }: PostGridProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 计算当前应该显示的卡片：上2（隐约可见），中2（清晰），下1（隐约可见）
  const getVisibleCards = () => {
    const cards: Array<{ post: Post | null; position: 'top' | 'center' | 'bottom' }> = [];
    
    // 上方预览卡片（前2张，隐约可见）
    if (currentIndex >= 2) {
      cards.push({ post: posts[currentIndex - 2], position: 'top' });
      if (currentIndex >= 3) {
        cards.push({ post: posts[currentIndex - 1], position: 'top' });
      } else {
        cards.push({ post: null, position: 'top' });
      }
    } else if (currentIndex >= 1) {
      cards.push({ post: posts[currentIndex - 1], position: 'top' });
      cards.push({ post: null, position: 'top' });
    } else {
      cards.push({ post: null, position: 'top' });
      cards.push({ post: null, position: 'top' });
    }
    
    // 中心卡片（当前2张，清晰显示）
    if (currentIndex < posts.length) {
      cards.push({ post: posts[currentIndex], position: 'center' });
    } else {
      cards.push({ post: null, position: 'center' });
    }
    
    if (currentIndex + 1 < posts.length) {
      cards.push({ post: posts[currentIndex + 1], position: 'center' });
    } else {
      cards.push({ post: null, position: 'center' });
    }
    
    // 下方预览卡片（后2张，隐约可见）
    if (currentIndex + 2 < posts.length) {
      cards.push({ post: posts[currentIndex + 2], position: 'bottom' });
      if (currentIndex + 3 < posts.length) {
        cards.push({ post: posts[currentIndex + 3], position: 'bottom' });
      } else {
        cards.push({ post: null, position: 'bottom' });
      }
    } else {
      cards.push({ post: null, position: 'bottom' });
      cards.push({ post: null, position: 'bottom' });
    }
    
    return cards;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartY = 0;
    let touchEndY = 0;

    const handleWheel = (e: WheelEvent) => {
      // 始终阻止默认滚动行为
      e.preventDefault();
      e.stopPropagation();

      if (isAnimating) {
        return;
      }
      
      // 清除之前的定时器
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // 防抖：等待一小段时间后再处理
      scrollTimeoutRef.current = setTimeout(() => {
        const deltaY = e.deltaY;
        const threshold = 50; // 滚动阈值

        if (Math.abs(deltaY) > threshold) {
          setIsAnimating(true);

          if (deltaY > 0) {
            // 向下滚动 - 显示下一组
            setCurrentIndex(prev => {
              if (prev + 2 < posts.length) {
                return prev + 2;
              }
              return prev;
            });
          } else {
            // 向上滚动 - 显示上一组
            setCurrentIndex(prev => {
              if (prev >= 2) {
                return prev - 2;
              }
              return prev;
            });
          }

          // 动画完成后重置状态
          setTimeout(() => {
            setIsAnimating(false);
          }, 800); // 匹配动画时长
        }
      }, 100);
    };

    // 触摸事件处理（移动端）
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // 阻止默认滚动
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating) return;
      
      touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      const threshold = 50; // 触摸滑动阈值

      if (Math.abs(diff) > threshold) {
        setIsAnimating(true);

        if (diff > 0) {
          // 向上滑动 - 显示下一组
          setCurrentIndex(prev => {
            if (prev + 2 < posts.length) {
              return prev + 2;
            }
            return prev;
          });
        } else {
          // 向下滑动 - 显示上一组
          setCurrentIndex(prev => {
            if (prev >= 2) {
              return prev - 2;
            }
            return prev;
          });
        }

        // 动画完成后重置状态
        setTimeout(() => {
          setIsAnimating(false);
        }, 800);
      }
    };

    // 在window上监听滚动事件，确保全局阻止滚动
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isAnimating, posts.length]);

  const visibleCards = getVisibleCards();

  return (
    <div 
      ref={containerRef}
      className="slot-machine-container"
      style={{ 
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0
      }}
    >
      <div className="slot-machine-grid" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        width: '100%',
        maxWidth: '1200px',
        position: 'relative',
        height: '100%'
      }}>
        {/* 上方预览卡片行 - 作为背景层 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          width: '100%',
          opacity: 0.15,
          transform: 'scale(0.5) translateY(-20px)',
          pointerEvents: 'none',
          filter: 'blur(3px)',
          position: 'absolute',
          zIndex: 1
        }}>
          {visibleCards.filter(c => c.position === 'top').map((card, index) => (
            <motion.div
              key={card.post ? `${card.post.id}-top-${currentIndex}-${index}` : `empty-top-${currentIndex}-${index}`}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: card.post ? 0.15 : 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
              style={{ width: card.post ? '450px' : '0', maxWidth: '450px' }}
            >
              {card.post && (
                <PostCard
                  post={card.post}
                  onClick={() => {}}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* 中心卡片行 */}
        <AnimatePresence mode="wait">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            width: '100%',
            zIndex: 2
          }}>
            {visibleCards.filter(c => c.position === 'center').map((card, index) => (
              <motion.div
                key={card.post ? `${card.post.id}-${currentIndex}` : `empty-center-${index}`}
                initial={{ 
                  rotateY: index === 0 ? -90 : 90,
                  opacity: 0,
                  scale: 0.8
                }}
                animate={{ 
                  rotateY: 0,
                  opacity: card.post ? 1 : 0,
                  scale: card.post ? 1 : 0.8
                }}
                exit={{ 
                  rotateY: index === 0 ? 90 : -90,
                  opacity: 0,
                  scale: 0.8
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.4, 0, 0.2, 1]
                }}
                style={{
                  perspective: '1000px',
                  transformStyle: 'preserve-3d',
                  width: card.post ? '450px' : '0',
                  maxWidth: '450px'
                }}
              >
                {card.post && (
                  <div style={{ transform: 'translateZ(0)' }}>
                    <PostCard
                      post={card.post}
                      onClick={() => onPostClick(card.post!)}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* 下方预览卡片行 - 作为背景层 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          width: '100%',
          opacity: 0.15,
          transform: 'scale(0.5) translateY(20px)',
          pointerEvents: 'none',
          filter: 'blur(3px)',
          position: 'absolute',
          zIndex: 1
        }}>
          {visibleCards.filter(c => c.position === 'bottom').map((card, index) => (
            <motion.div
              key={card.post ? `${card.post.id}-bottom-${currentIndex}-${index}` : `empty-bottom-${currentIndex}-${index}`}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: card.post ? 0.15 : 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
              style={{ width: card.post ? '450px' : '0', maxWidth: '450px' }}
            >
              {card.post && (
                <PostCard
                  post={card.post}
                  onClick={() => {}}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
