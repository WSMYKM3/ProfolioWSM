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

const postComponents: Record<string, React.ComponentType> = {
  'post-1': Post1,
  'post-2': Post2,
  'post-3': Post3,
  'post-4': Post4,
};

export default function Modal({ post, isOpen, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
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

  const PostContent = postComponents[post.id] || Post1;

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
          &times;
        </button>
        <div className="modal-body">
          <PostContent />
        </div>
      </div>
    </div>
  );
}

