'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import SoftwareIcon from '../SoftwareIcon';

// Helper function to add basePath for GitHub Pages
function getImageSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}

export default function Post1() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="post-content">
      <div className="text-content">
        {/* Ideation Section */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ 
            fontSize: '1.75rem', 
            fontWeight: 700, 
            color: '#fff', 
            marginBottom: '24px',
            borderBottom: '2px solid rgba(255,255,255,0.2)',
            paddingBottom: '12px',
            textAlign: 'center'
          }}>
            Ideation
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '24px' : '40px',
            alignItems: 'center'
          }}>
            {/* Left: Text Content */}
            <div>
              <p style={{ 
                fontSize: '1rem', 
                lineHeight: '1.8', 
                color: '#d0d0d0',
                marginBottom: '16px',
                textAlign: isMobile ? 'center' : 'left'
              }}>
                Inspired by a friend's frustration with dating apps—endless queued messages, repeated conversations, and time spent hanging out only to find no shared interests.
              </p>
              <p style={{ 
                fontSize: '1rem', 
                lineHeight: '1.8', 
                color: '#d0d0d0',
                marginBottom: '16px',
                textAlign: isMobile ? 'center' : 'left'
              }}>
                So we're building a dating app that recognizes your frequently mentioned answers and turns them into your profile automatically, letting you chat freely without repeating yourself.
              </p>
            </div>
            {/* Right: Image */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: isMobile ? '20px' : '40px'
            }}>
              <div style={{
                position: 'relative',
                width: isMobile ? '100%' : '70%',
                maxWidth: '450px',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: 'rgba(255,255,255,0.05)',
                padding: '20px',
                backdropFilter: 'blur(10px)'
              }}>
                <Image
                  src={getImageSrc('/Datnieideation.png')}
                  alt="Datnie Ideation"
                  width={800}
                  height={600}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '8px'
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/800x600/2a2a2a/888888?text=Ideation+Diagram';
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* UX Design Section */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ 
            fontSize: '1.75rem', 
            fontWeight: 700, 
            color: '#fff', 
            marginBottom: '24px',
            borderBottom: '2px solid rgba(255,255,255,0.2)',
            paddingBottom: '12px',
            textAlign: 'center'
          }}>
            UX Design
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '24px'
          }}>
            {/* UX Design Picture */}
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#1a1a1a'
            }}>
              <Image
                src={getImageSrc('/datnie-ux-design.jpg')}
                alt="Datnie UX Design"
                fill
                style={{ objectFit: 'cover' }}
                onError={(e) => {
                  // Fallback to placeholder if image doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/800x450/2a2a2a/888888?text=UX+Design+Image';
                }}
              />
            </div>
            {/* UX Design GIF */}
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#1a1a1a'
            }}>
              <Image
                src={getImageSrc('/gifs/datnie-ux-design.gif')}
                alt="Datnie UX Design GIF"
                fill
                style={{ objectFit: 'cover' }}
                onError={(e) => {
                  // Fallback to placeholder if gif doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/800x450/2a2a2a/888888?text=UX+Design+GIF';
                }}
              />
            </div>
          </div>
        </section>

        {/* Prototype Section */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ 
            fontSize: '1.75rem', 
            fontWeight: 700, 
            color: '#fff', 
            marginBottom: '24px',
            borderBottom: '2px solid rgba(255,255,255,0.2)',
            paddingBottom: '12px',
            textAlign: 'center'
          }}>
            Prototype
          </h2>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            color: '#d0d0d0', 
            marginBottom: '24px',
            marginTop: '16px'
          }}>
            Stage1: Animation Trailer(UE) and Technical practice in Unity
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? '40px' : '60px',
            marginTop: '24px',
            maxWidth: '1400px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: isMobile ? '0 16px' : '0'
          }}>
            {/* 10 Prototype GIFs - 2 per row */}
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <div
                key={num}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16/9',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#1a1a1a'
                  }}
                >
                  <Image
                    src={getImageSrc(`/gifs/datnie-prototype-${num}.gif`)}
                    alt={`Datnie Prototype ${num}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    onError={(e) => {
                      // Fallback to placeholder if gif doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/400x225/2a2a2a/888888?text=Prototype+${num}`;
                    }}
                  />
                </div>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#d0d0d0',
                  textAlign: 'center',
                  margin: 0,
                  lineHeight: 1.5
                }}>
                  [Placeholder text for prototype {num}]
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
