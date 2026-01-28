'use client';

import { useEffect, useRef } from 'react';
import { Post } from '@/app/lib/posts';
import Post1 from './posts/Post1';
import Post2 from './posts/Post2';
import Post3 from './posts/Post3';
import Post4 from './posts/Post4';

interface ModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

import PostDetailView from './PostDetailView';

export default function Modal({ post, isOpen, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Only prevent scrolling on the body, not the main-content
      document.body.style.overflow = 'hidden';
      // Ensure main-content can still scroll if needed
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        (mainContent as HTMLElement).style.overflow = 'hidden';
      }
    } else {
      document.body.style.overflow = '';
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        (mainContent as HTMLElement).style.overflow = '';
      }
    }

    return () => {
      document.body.style.overflow = '';
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        (mainContent as HTMLElement).style.overflow = '';
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !post) return null;

  return (
    <div
      className={`modal ${isOpen ? 'active' : ''}`}
      ref={modalRef}
    >
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          Back
        </button>
        <div className="modal-body">
          <PostDetailView post={post} />
        </div>
      </div>
    </div>
  );
}



