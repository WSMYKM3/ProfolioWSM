'use client';

import Link from 'next/link';
import TopNav from './components/TopNav';

export default function NotFound() {
  return (
    <div className="layout">
      <TopNav />
      <main className="main-content" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '80vh',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h1 style={{ 
          fontSize: '6rem', 
          fontWeight: 700, 
          marginBottom: '1rem',
          color: 'var(--text-primary, #000)'
        }}>
          404
        </h1>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 400, 
          marginBottom: '2rem',
          color: 'var(--text-secondary, #666)'
        }}>
          This page could not be found.
        </h2>
        <Link 
          href="/" 
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: 'var(--bg-primary, #000)',
            color: 'var(--text-inverse, #fff)',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: 500,
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          Go back home
        </Link>
      </main>
    </div>
  );
}

