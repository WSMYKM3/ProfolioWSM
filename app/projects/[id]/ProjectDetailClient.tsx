'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TopNav from '@/app/components/TopNav';
import PostDetailView from '@/app/components/PostDetailView';
import { getPostById } from '@/app/lib/posts';

export default function ProjectDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const post = getPostById(id);

  if (!post) {
    return (
      <div className="layout">
        <TopNav />
        <main className="main-content">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
            color: '#e8e8e8'
          }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404</h1>
            <p style={{ marginBottom: '2rem', color: '#888' }}>Project not found</p>
            <button
              onClick={() => router.push('/work')}
              style={{
                padding: '12px 24px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              ← Back to Work
            </button>
          </div>
        </main>
      </div>
    );
  }

  const handleBack = () => {
    // Try to go back in history, fallback to /work
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/work');
    }
  };

  return (
    <div className="layout project-detail-page">
      <TopNav />
      <main className="main-content project-detail-main">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="project-detail-back-button"
          aria-label="Go back"
        >
          ← Back
        </button>
        
        {/* Project Content */}
        <div className="project-detail-content-wrapper">
          <PostDetailView post={post} isPageView={true} />
        </div>
      </main>
    </div>
  );
}
