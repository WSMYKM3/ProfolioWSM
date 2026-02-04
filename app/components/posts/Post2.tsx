'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import HoverVideo from '../HoverVideo';
import { getImageScale } from '@/app/lib/imageScaleUtils';
import { getPostById } from '@/app/lib/posts';

// Helper function to add basePath for GitHub Pages
function getImageSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}

// Helper function to convert YouTube watch URL to embed URL
function convertToEmbedUrl(url: string): string {
  if (!url) return url;
  
  // If already an embed URL, return as is
  if (url.includes('/embed/')) {
    return url;
  }
  
  // Convert watch URL (https://www.youtube.com/watch?v=VIDEO_ID) to embed URL
  if (url.includes('youtube.com/watch')) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }
  
  // Convert short URL (https://youtu.be/VIDEO_ID) to embed URL
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }
  
  return url;
}

export default function Post2() {
  const [isMobile, setIsMobile] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string; isVideo?: boolean } | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  // Get post data for Stage 3 video URL
  const post = getPostById('post-2');
  const stage3VideoUrl = post?.stage3VideoUrl;

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
          {/* Ideation Section */}
          <section id="ideation" style={{ marginBottom: '72px', scrollMarginTop: '100px' }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 700, 
              color: '#fff', 
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              Ideation
            </h2>
            <p style={{ 
              fontSize: '1rem', 
              lineHeight: '1.8', 
              color: '#d0d0d0',
              marginBottom: '16px',
              textAlign: 'center',
              maxWidth: '900px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Signie is an immersive ASL learning and real-time translation system powered by hand tracking, micro-gestures, and AI feedback.
              It evolved from concept validation to interactive learning experiences, and ultimately to AI-glasses-based live translation.
            </p>
          </section>

          {/* My Contributions Section */}
          <section id="contributions" style={{ marginBottom: '72px', scrollMarginTop: '100px' }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 700, 
              color: '#fff', 
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              My Contributions
            </h2>
            <div style={{
              maxWidth: '900px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              {[
                'make hand interaction of learning process',
                'GameManager which manage the application experience, from learning to playful game testing',
                'add microgesture to intergrate Speech to Text to drive live translation of Tutor\'s animation'
              ].map((contribution, index) => (
                <div
                  key={index}
                  style={{
                    padding: '20px',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    borderRadius: '12px',
                    borderLeft: '4px solid rgba(255,255,255,0.3)'
                  }}
                >
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.8',
                    color: '#d0d0d0',
                    margin: 0
                  }}>
                    {index + 1}. {contribution}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Process Section */}
          <section id="process" style={{ marginBottom: '72px', scrollMarginTop: '100px' }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 700, 
              color: '#fff', 
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              Process
            </h2>

            {/* Stage1: Prototype - Solve animation of tutors */}
            <h3 id="process-stage1" style={{ 
              fontSize: '1.25rem', 
              fontWeight: 600, 
              color: '#d0d0d0', 
              marginBottom: '24px',
              marginTop: '16px',
              scrollMarginTop: '100px',
              textAlign: 'center'
            }}>
              Stage1. Prototype - Solve animation of tutors(hand & full body)
            </h3>
            <p style={{
              fontSize: '0.95rem',
              color: '#d0d0d0',
              textAlign: 'center',
              marginBottom: '24px',
              fontStyle: 'italic'
            }}>
              1. record hand guiding/full body animation all in unity
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: isMobile ? '24px' : '30px',
              marginTop: '24px',
              marginBottom: '40px',
              maxWidth: '1400px',
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: isMobile ? '0 16px' : '0'
            }}>
              {/* 6 pictures and a gif - placeholder paths */}
              {[
                { path: '/webm/Signie/hand1.webm', description: 'Hand guiding animation', isVideo: true },
                { path: '/webm/Signie/hand2.webm', description: 'Hand guiding animation with customized hand model', isVideo: true },
                { path: '/webm/Signie/fb2.webm', description: 'Full body animation recored by meta quest headset', isVideo: true },
                { path: '/Signiepics/handrecord.png', description: 'I record use unity recorder, and use fbx converter all in unity' }
                
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
                      border: hoveredItem === item.path ? '2px solid rgba(255, 255, 255, 0.6)' : '2px solid transparent',
                      transition: 'transform 0.3s ease, border-color 0.3s ease',
                      transform: hoveredItem === item.path ? 'scale(1.05)' : 'scale(1)'
                    }}
                    onClick={() => handleImageClick(item.path, item.description, item.isVideo)}
                    onMouseEnter={() => setHoveredItem(item.path)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.isVideo ? (
                      <HoverVideo
                        videoSrc={item.path}
                        alt={item.description}
                        objectFit="cover"
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
            
            <p style={{
              fontSize: '0.95rem',
              color: '#d0d0d0',
              textAlign: 'center',
              marginBottom: '24px',
              fontStyle: 'italic'
            }}>
              2. add bubbles to guide hand movement
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: isMobile ? '24px' : '30px',
              marginTop: '24px',
              marginBottom: '40px',
              maxWidth: '1400px',
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: isMobile ? '0 16px' : '0'
            }}>
              {/* 2 pictures and a gif */}
              {[
                { path: '/webm/Signie/bubble1.webm', description: 'Bubble guide 1', isVideo: true },
                { path: '/webm/Signie/bubble2.webm', description: 'Bubble guide 2', isVideo: true }
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
                      border: hoveredItem === item.path ? '2px solid rgba(255, 255, 255, 0.6)' : '2px solid transparent',
                      transition: 'transform 0.3s ease, border-color 0.3s ease',
                      transform: hoveredItem === item.path ? 'scale(1.05)' : 'scale(1)'
                    }}
                    onClick={() => handleImageClick(item.path, item.description, item.isVideo)}
                    onMouseEnter={() => setHoveredItem(item.path)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.isVideo ? (
                      <HoverVideo
                        videoSrc={item.path}
                        alt={item.description}
                        objectFit="cover"
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

            {/* Stage2: Develop learning and testing function */}
            <h3 id="process-stage2" style={{ 
              fontSize: '1.25rem', 
              fontWeight: 600, 
              color: '#d0d0d0', 
              marginBottom: '24px',
              marginTop: '48px',
              textAlign: 'center',
              scrollMarginTop: '100px'
            }}>
              Stage2. Develop learning and testing function
            </h3>
            <p style={{
              fontSize: '0.95rem',
              color: '#d0d0d0',
              textAlign: 'center',
              marginBottom: '24px',
              fontStyle: 'italic'
            }}>
              1. mix words of different levels of the familarity
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: isMobile ? '24px' : '30px',
              marginTop: '24px',
              marginBottom: '40px',
              maxWidth: '1400px',
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: isMobile ? '0 16px' : '0'
            }}>
              {/* 6 pictures and a gif */}
              {[
                { path: '/Signiepics/mixwords.png', description: 'Pattern of learning and testing with mixed mechanism' },
                { path: '/Signiepics/manager.jpg', description: 'Manager prefab for a learning a new word' },
                { path: '/webm/Signie/learn.webm', description: 'Follow the tutor animation to learn', isVideo: true },
                { path: '/webm/Signie/test1.webm', description: 'Test1: Hand Gesture Test', isVideo: true },
                { path: '/webm/Signie/test2.webm', description: 'Test2: A rhythm game-like testing to test ASL alphabet', isVideo: true },
                { path: '/webm/Signie/test3.webm', description: 'Test3: Pick correct lines based on animation played by tutor', isVideo: true }
                
              ].map((item, index) => (
                <div
                  key={`stage2-${index}`}
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
                      border: hoveredItem === item.path ? '2px solid rgba(255, 255, 255, 0.6)' : '2px solid transparent',
                      transition: 'transform 0.3s ease, border-color 0.3s ease',
                      transform: hoveredItem === item.path ? 'scale(1.05)' : 'scale(1)'
                    }}
                    onClick={() => handleImageClick(item.path, item.description, item.isVideo)}
                    onMouseEnter={() => setHoveredItem(item.path)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.isVideo ? (
                      <HoverVideo
                        videoSrc={item.path}
                        alt={item.description}
                        objectFit="cover"
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

            {/* Stage3: AI Glasses: Live ASL Translation */}
            <h3 id="process-stage3" style={{ 
              fontSize: '1.25rem', 
              fontWeight: 600, 
              color: '#d0d0d0', 
              marginBottom: '24px',
              marginTop: '48px',
              textAlign: 'center',
              scrollMarginTop: '100px'
            }}>
              Stage3. AI Glasses: Live ASL Translation
            </h3>
            <div style={{
              maxWidth: '900px',
              margin: '0 auto',
              marginBottom: '24px'
            }}>
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.8',
                color: '#d0d0d0',
                marginBottom: '16px',
                textAlign: 'left'
              }}>
                <strong style={{ color: '#fff' }}>1. Micro-gesture input for hands-free system control</strong>
              </p>
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.8',
                color: '#d0d0d0',
                marginBottom: '24px',
                textAlign: 'left'
              }}>
                <strong style={{ color: '#fff' }}>Live Translation Pipeline</strong>
              </p>
              <ul style={{
                fontSize: '1rem',
                lineHeight: '1.8',
                color: '#d0d0d0',
                marginLeft: '24px',
                marginBottom: '24px',
                paddingLeft: '0'
              }}>
                <li style={{ marginBottom: '8px' }}>Voice → Text using Wit.ai</li>
                <li style={{ marginBottom: '8px' }}>Text → Sign animation via animation state machine</li>
              </ul>
            </div>
            
            {/* YouTube Video for Stage 3 */}
            <div style={{
              maxWidth: '900px',
              margin: '0 auto',
              marginTop: '24px'
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '56.25%', // 16:9 aspect ratio
                height: 0,
                overflow: 'hidden',
                borderRadius: '12px',
                backgroundColor: 'transparent',
                marginBottom: '12px'
              }}>
                {stage3VideoUrl ? (
                  <iframe
                    src={`${convertToEmbedUrl(stage3VideoUrl)}?autoplay=1&mute=1&loop=1&playlist=${stage3VideoUrl.includes('watch?v=') ? stage3VideoUrl.split('v=')[1]?.split('&')[0] : stage3VideoUrl.split('/embed/')[1]?.split('?')[0]}`}
                    title="Live ASL Translation Demonstration"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      borderRadius: '12px'
                    }}
                  />
                ) : (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px dashed rgba(255,255,255,0.2)'
                  }}>
                    <p style={{
                      fontSize: '0.95rem',
                      color: '#888',
                      textAlign: 'center',
                      margin: 0,
                      padding: '20px'
                    }}>
                      YouTube video placeholder - Add stage3VideoUrl in posts.ts
                    </p>
                  </div>
                )}
              </div>
              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center',
                margin: 0
              }}>
                Live ASL Translation Demonstration
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
