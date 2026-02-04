'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import HoverVideo from '../HoverVideo';
import { getImageScale } from '@/app/lib/imageScaleUtils';

// Helper function to add basePath for GitHub Pages
function getImageSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}

export default function Post5() {
  const [isMobile, setIsMobile] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string; isVideo?: boolean } | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
          {/* Video Section at Top */}
          <section id="video" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
            <div style={{
              width: '100%',
              maxWidth: '1000px',
              margin: '0 auto',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#000',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '56.25%', // 16:9 aspect ratio
                height: 0,
                overflow: 'hidden'
              }}>
                <video
                  src={getImageSrc('/TheToolbox/thetoolbox.mp4')}
                  controls
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                  playsInline
                />
              </div>
            </div>
          </section>

          {/* Ideation Section */}
          <section id="ideation" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 700, 
              color: '#fff', 
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              Ideation
            </h2>
            <div style={{
              maxWidth: '900px',
              margin: '0 auto',
              padding: isMobile ? '0 16px' : '0'
            }}>
              <p style={{ 
                fontSize: '1rem', 
                lineHeight: '1.8', 
                color: '#d0d0d0',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                We want to build a platform which <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '1.1rem' }}>encourage potential customers to try Strauss' products</span> with <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '1.1rem' }}>virtual shopping guide</span> and direct them to Strauss website to purchase.
              </p>
              <p style={{ 
                fontSize: '1rem', 
                lineHeight: '1.8', 
                color: '#d0d0d0',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '1.1rem' }}>Guided by on-site Strauss staff</span>, our team defined three core principles — Professionalism, Guided Experience, and Safety — which shaped the entire development process. The project was developed around these values, maintaining a clear conceptual and experiential <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '1.1rem' }}>link to the Strauss website</span>.
              </p>
            </div>
          </section>

          {/* Stage 1: XR Development */}
          <section id="stage1" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 700, 
              color: '#fff', 
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              Stage1: XR Development
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: isMobile ? '24px' : '30px',
              marginTop: '24px',
              maxWidth: '1400px',
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: isMobile ? '0 16px' : '0'
            }}>
              {/* 4 placeholders for Stage 1 */}
              {[
                { path: '/TheToolbox/webm/zhankai.webm', description: 'An unfolding workstation animation that reveals a selection of Strauss tools.', isVideo: true },
                { path: '/TheToolbox/webm/safety.webm', description: 'For safety reasons, the system actively detects incompatible drill bits and displays a red warning to prevent incorrect operation.', isVideo: true },
                { path: '/TheToolbox/webm/drill.webm', description: 'A virtual hand acts as a professional guide, demonstrating the correct way to use the tool.', isVideo: true },
                { path: '/TheToolbox/webm/juzi.webm', description: 'Each tool on the workstation is presented within a specific usage scenario. For example, the saw is demonstrated cutting through steel rebar.', isVideo: true }
              ].map((item, index) => (
                <div
                  key={index}
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
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      border: hoveredIndex === index ? '2px solid rgba(255, 255, 255, 0.6)' : '2px solid transparent',
                      transition: 'transform 0.3s ease, border-color 0.3s ease',
                      transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)'
                    }}
                    onClick={() => handleImageClick(item.path, item.description, item.isVideo)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {item.isVideo ? (
                      <HoverVideo
                        videoSrc={item.path}
                        alt={item.description}
                        objectFit="contain"
                      />
                    ) : (
                      <Image
                        src={getImageSrc(item.path)}
                        alt={item.description}
                        fill
                        style={{ objectFit: 'cover' }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/400x225/2a2a2a/888888?text=${encodeURIComponent(item.description)}`;
                        }}
                      />
                    )}
                  </div>
                  <p style={{
                    fontSize: '1rem',
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

          {/* Stage 2: AI Assistant */}
          <section id="stage2" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 700, 
              color: '#fff', 
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              Stage2: AI Assistant
            </h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '30px',
              maxWidth: '800px',
              margin: '0 auto',
              padding: isMobile ? '0 16px' : '0'
            }}>
              {/* 2 placeholders for Stage 2 - up and down layout */}
              {[
                { path: '/TheToolbox/webm/aiassistant.webm', description: 'Add button to prompt safety rules and the price with link to Strauss website', isVideo: true},
                { path: '/TheToolbox/ais.png', description: 'AI Assistant structure including speech to text, OpenAI API, and text to speech' }
              ].map((item, index) => (
                <div
                  key={index}
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
                      backgroundColor: 'transparent',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleImageClick(item.path, item.description, item.isVideo)}
                  >
                    {item.isVideo ? (
                      <HoverVideo
                        videoSrc={item.path}
                        alt={item.description}
                        objectFit="contain"
                      />
                    ) : (
                      <Image
                        src={getImageSrc(item.path)}
                        alt={item.description}
                        fill
                        style={{ objectFit: 'cover' }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/400x225/2a2a2a/888888?text=${encodeURIComponent(item.description)}`;
                        }}
                      />
                    )}
                  </div>
                  <p style={{
                    fontSize: '1rem',
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
