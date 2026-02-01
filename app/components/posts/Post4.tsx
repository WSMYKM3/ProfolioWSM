'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getImageScale } from '@/app/lib/imageScaleUtils';

// Helper function to add basePath for GitHub Pages
function getImageSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}

export default function Post4() {
  const [isMobile, setIsMobile] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string; isVideo?: boolean } | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && enlargedImage) {
        setEnlargedImage(null);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [enlargedImage]);

  const handleImageClick = (src: string, alt: string, isVideo?: boolean) => {
    setEnlargedImage({ src, alt, isVideo });
  };

  const handleCloseEnlarged = () => {
    setEnlargedImage(null);
  };

  return (
    <>
      {/* Enlarged Image Overlay */}
      {enlargedImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '20px'
          }}
          onClick={handleCloseEnlarged}
        >
          <div
            style={{
              position: 'relative',
              width: '90vw',
              height: '90vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {enlargedImage.isVideo ? (
              <video
                src={getImageSrc(enlargedImage.src)}
                controls
                autoPlay
                loop
                muted
                playsInline
                style={{
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '8px'
                }}
              />
            ) : (
              <img
                src={getImageSrc(enlargedImage.src)}
                alt={enlargedImage.alt}
                style={{
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  transform: `scale(${getImageScale(enlargedImage.src)})`,
                  transformOrigin: 'center center'
                }}
              />
            )}
            <button
              onClick={handleCloseEnlarged}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                color: '#fff',
                fontSize: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}

    <div className="post-content">
      <div className="text-content">
          {/* Tools Section */}
          <section id="tools" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 700, 
              color: '#fff', 
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              Tools
            </h2>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'center',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {['Unreal Engine', 'Motion Builder', 'Optitrack Motion Capture'].map((tool, index) => (
                <div
                  key={index}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                    color: '#d0d0d0',
                    fontSize: '1rem',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  {tool}
                </div>
              ))}
            </div>
          </section>

          {/* Motion Capture + Motion Data Cleaning Section */}
          <section id="motion-capture" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 700, 
              color: '#fff', 
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              Motion Capture + Motion Data Cleaning
            </h2>
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
              {[
                
                { path: '/mocapgifs/mocapclean.png', description: 'Overview', isVideo: false },
                { path: '/webm/MotionCapture/motioncapture.webm', description: 'Motion Capture', isVideo: true },
                { path: '/webm/MotionCapture/mb1.webm', description: 'Retargetting', isVideo: true },
                { path: '/webm/MotionCapture/mb2.webm', description: '  Data cleaning', isVideo: true },
                { path: '/webm/MotionCapture/mb3.webm', description: 'It works', isVideo: true },
                { path: '/webm/MotionCapture/realtimevcam.webm', description: 'Real-time VCam Testing', isVideo: true }
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16/9',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      border: hoveredItem === item.path ? '2px solid rgba(255, 255, 255, 0.6)' : '2px solid transparent',
                      transition: 'transform 0.3s ease, border-color 0.3s ease',
                      transform: hoveredItem === item.path ? 'scale(1.05)' : 'scale(1)'
                    }}
                    onClick={() => handleImageClick(item.path, item.description, item.isVideo)}
                    onMouseEnter={() => setHoveredItem(item.path)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.isVideo ? (
                      <video
                        src={getImageSrc(item.path)}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <Image
                        src={getImageSrc(item.path)}
                        alt={item.description}
                        fill
                        style={{ objectFit: 'contain' }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/400x225/2a2a2a/888888?text=${encodeURIComponent(item.description)}`;
                        }}
                      />
                    )}
                  </div>
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#d0d0d0',
                    textAlign: 'center',
                    margin: 0,
                    lineHeight: 1.5
                  }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Metahuman Section */}
          <section id="metahuman" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 700, 
              color: '#fff', 
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              Metahuman
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: isMobile ? '40px' : '40px',
              marginTop: '24px',
              maxWidth: '1400px',
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: isMobile ? '0 16px' : '0'
            }}>
              {[
                { path: '/webm/MotionCapture/facialmotion.webm', description: 'Facial Motion', isVideo: true },
                { path: '/mocapgifs/facemesh.png', description: 'Face Mesh', isVideo: false },
                { path: '/webm/MotionCapture/sequence.webm', description: 'Sequence', isVideo: true }
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16/9',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      border: hoveredItem === item.path ? '2px solid rgba(255, 255, 255, 0.6)' : '2px solid transparent',
                      transition: 'transform 0.3s ease, border-color 0.3s ease',
                      transform: hoveredItem === item.path ? 'scale(1.05)' : 'scale(1)'
                    }}
                    onClick={() => handleImageClick(item.path, item.description, item.isVideo)}
                    onMouseEnter={() => setHoveredItem(item.path)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.isVideo ? (
                      <video
                        src={getImageSrc(item.path)}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <Image
                        src={getImageSrc(item.path)}
                        alt={item.description}
                        fill
                        style={{ objectFit: 'contain' }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/400x225/2a2a2a/888888?text=${encodeURIComponent(item.description)}`;
                        }}
                      />
                    )}
                  </div>
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#d0d0d0',
                    textAlign: 'center',
                    margin: 0,
                    lineHeight: 1.5
                  }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
