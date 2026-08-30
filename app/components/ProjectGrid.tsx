'use client';

import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { Post } from '@/app/lib/posts';
import SoftwareIcon from './SoftwareIcon';

interface ProjectGridProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

const HOVER_LEAVE_MS = 400;
/** Delay opening the center panel so strip-card hover (lift/rotate) plays first */
const HOVER_OPEN_DELAY_MS = 420;
const STRIP_HOVER_ROOT_ID = 'about-projects-strip-hover';

// Helper function to add basePath for GitHub Pages
function getImageSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}

function subscribeHoverCapability(cb: () => void) {
  const mq = window.matchMedia('(hover: hover)');
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}

function getHoverCapabilitySnapshot() {
  return window.matchMedia('(hover: hover)').matches;
}

function getHoverCapabilityServerSnapshot() {
  return true;
}

// Build a one-line role + tools summary for collapsed card view
function buildRoleSummary(post: Post): string {
  const parts: string[] = [];
  if (post.role) {
    const firstRole = post.role.split(',')[0].trim();
    parts.push(firstRole);
  }
  if (post.softwareTools && post.softwareTools.length > 0) {
    parts.push(...post.softwareTools.slice(0, 2));
  }
  return parts.join(' · ');
}

// Highlight keywords in a text string
function highlightText(text: string, keywords: string[]): React.ReactNode {
  if (!keywords || keywords.length === 0) return text;
  const escaped = keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) => {
    if (keywords.some(k => k.toLowerCase() === part.toLowerCase())) {
      return <strong key={i} className="strip-highlight">{part}</strong>;
    }
    return part;
  });
}

const descHighlights: Record<string, string[]> = {
  'post-1': ["catch your next crush's frequency answers"],
  'post-2': ['hand tracking', 'micro-gestures', 'AI feedback'],
  'post-3': ['listens, responds, and reflects', 'digital embodiment'],
  'post-5': ['customer purchasing'],
  'post-6': ['elemental counter system'],
};

const roleHighlights: Record<string, string[]> = {
  'post-4': ['Motion Capture'],
};

function StripExpandedBody({ post }: { post: Post }) {
  return (
    <>
      <div className="strip-expanded-image-wrapper">
        <Image
          src={getImageSrc(post.compactThumbnail ?? post.thumbnail)}
          alt={post.title}
          width={1200}
          height={900}
          className="strip-expanded-image"
          loading="lazy"
        />
      </div>
      <div className="strip-expanded-content">
        <h3 className="strip-expanded-title" id={`strip-hover-title-${post.id}`}>
          {post.title}
        </h3>
        {(post.shortDescription || post.description) && (
          <p className={`strip-expanded-desc ${post.id === 'post-1' ? '' : 'strip-expanded-desc--dim'}`}>
            {highlightText(
              post.shortDescription || post.description || '',
              descHighlights[post.id] || []
            )}
          </p>
        )}
        {post.role && (
          <div className="strip-expanded-role">
            <span className="strip-role-label">Role:</span>
            <span className="strip-role-value">
              {highlightText(post.role, roleHighlights[post.id] || [])}
            </span>
          </div>
        )}
        {post.softwareTools && post.softwareTools.length > 0 && (
          <div className="strip-expanded-tools">
            {post.softwareTools.map((tool) => (
              <SoftwareIcon key={tool} name={tool} size={24} />
            ))}
          </div>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="strip-expanded-tags">
            {post.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="strip-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function ProjectGrid({ posts, onPostClick }: ProjectGridProps) {
  const [hoveredPost, setHoveredPost] = useState<Post | null>(null);
  const [mounted, setMounted] = useState(false);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openDelayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const prefersHover = useSyncExternalStore(
    subscribeHoverCapability,
    getHoverCapabilitySnapshot,
    getHoverCapabilityServerSnapshot
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      if (openDelayTimerRef.current) {
        clearTimeout(openDelayTimerRef.current);
      }
    };
  }, []);

  const clearLeaveTimer = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  }, []);

  const clearOpenDelayTimer = useCallback(() => {
    if (openDelayTimerRef.current) {
      clearTimeout(openDelayTimerRef.current);
      openDelayTimerRef.current = null;
    }
  }, []);

  const closeHover = useCallback(() => {
    clearOpenDelayTimer();
    clearLeaveTimer();
    setHoveredPost(null);
  }, [clearOpenDelayTimer, clearLeaveTimer]);

  const scheduleLeave = useCallback(() => {
    clearLeaveTimer();
    leaveTimerRef.current = setTimeout(() => {
      setHoveredPost(null);
      leaveTimerRef.current = null;
    }, HOVER_LEAVE_MS);
  }, [clearLeaveTimer]);

  const openHover = useCallback(
    (post: Post) => {
      clearOpenDelayTimer();
      clearLeaveTimer();
      setHoveredPost(post);
    },
    [clearOpenDelayTimer, clearLeaveTimer]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && hoveredPost) {
        closeHover();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [hoveredPost, closeHover]);

  const handleCardClick = useCallback(
    (post: Post) => {
      if (!prefersHover) {
        if (hoveredPost?.id === post.id) {
          onPostClick(post);
        } else {
          openHover(post);
        }
        return;
      }
      onPostClick(post);
    },
    [prefersHover, hoveredPost, onPostClick, openHover]
  );

  const handleCardMouseEnter = useCallback(
    (post: Post) => {
      if (!prefersHover) return;
      clearLeaveTimer();
      clearOpenDelayTimer();
      openDelayTimerRef.current = setTimeout(() => {
        openDelayTimerRef.current = null;
        openHover(post);
      }, HOVER_OPEN_DELAY_MS);
    },
    [prefersHover, clearLeaveTimer, clearOpenDelayTimer, openHover]
  );

  const handleCardMouseLeave = useCallback(() => {
    if (!prefersHover) return;
    clearOpenDelayTimer();
    scheduleLeave();
  }, [prefersHover, clearOpenDelayTimer, scheduleLeave]);

  const portalEl =
    mounted && typeof document !== 'undefined'
      ? document.getElementById(STRIP_HOVER_ROOT_ID)
      : null;

  const hoverPortal =
    portalEl && hoveredPost
      ? createPortal(
          <div
            className="strip-hover-stack"
            onMouseEnter={prefersHover ? clearLeaveTimer : undefined}
            onMouseLeave={(e) => {
              if (!prefersHover) return;
              const next = e.relatedTarget;
              if (next != null && next instanceof Node && e.currentTarget.contains(next)) {
                return;
              }
              closeHover();
            }}
          >
            <button
              type="button"
              className="strip-hover-scrim"
              aria-label="Close project preview"
              onClick={closeHover}
              onMouseEnter={prefersHover ? clearLeaveTimer : undefined}
            />
            <div
              key={hoveredPost.id}
              className="strip-hover-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby={`strip-hover-title-${hoveredPost.id}`}
              title="Click to open project"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onPostClick(hoveredPost);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onPostClick(hoveredPost);
                }
              }}
            >
              <div className="strip-expanded strip-expanded--portal">
                <StripExpandedBody post={hoveredPost} />
              </div>
            </div>
          </div>,
          portalEl
        )
      : null;

  return (
    <>
      <div className="strip-gallery-wrap">
        <div className="strip-gallery-bg" aria-hidden="true" />
        <div className="strip-gallery">
          {posts.map((post) => (
            <div
              key={post.id}
              className="strip-card"
              onMouseEnter={() => handleCardMouseEnter(post)}
              onMouseLeave={handleCardMouseLeave}
              onClick={() => handleCardClick(post)}
            >
              <div className="strip-collapsed">
                <Image
                  src={getImageSrc(post.compactThumbnail ?? post.thumbnail)}
                  alt={post.title}
                  width={800}
                  height={600}
                  className="strip-collapsed-image"
                  loading="lazy"
                />
                <h4 className="strip-collapsed-title">{post.title}</h4>
                <p className="strip-collapsed-role">{buildRoleSummary(post)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {hoverPortal}
    </>
  );
}
