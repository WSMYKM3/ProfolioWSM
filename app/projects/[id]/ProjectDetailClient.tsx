'use client';

import { useRouter } from 'next/navigation';
import TopNav from '@/app/components/TopNav';
import PostDetailView from '@/app/components/PostDetailView';
import EditorialDecals from '@/app/components/EditorialDecals';
import EditorialMotion from '@/app/components/EditorialMotion';
import { getPostById } from '@/app/lib/posts';

export default function ProjectDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const post = getPostById(id);

  if (!post) {
    return (
      <div className="layout editorial project-detail-page">
        <TopNav />
        <main className="main-content project-detail-main">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '60vh',
              textAlign: 'center',
              color: 'var(--ink)',
              fontFamily: 'var(--serif)',
              padding: 40,
            }}
          >
            <h1 style={{ fontSize: 'clamp(80px, 14vw, 180px)', margin: 0, fontStyle: 'italic' }}>404</h1>
            <p style={{ marginBottom: '2rem', color: 'var(--muted)', fontStyle: 'italic' }}>Project not found</p>
            <button onClick={() => router.push('/work')} className="project-detail-back-button" style={{ position: 'static' }}>
              ← Back to Work
            </button>
          </div>
        </main>
      </div>
    );
  }

  const handleBack = () => {
    if (window.history.length > 1) router.back();
    else router.push('/work');
  };

  return (
    <div className="layout editorial project-detail-page">
      <EditorialDecals />
      <EditorialMotion />
      <TopNav />
      <main className="main-content project-detail-main">
        <button onClick={handleBack} className="project-detail-back-button" aria-label="Go back">
          ← Back
        </button>
        <div className="project-detail-content-wrapper">
          <PostDetailView post={post} isPageView={true} />
        </div>
      </main>
    </div>
  );
}
