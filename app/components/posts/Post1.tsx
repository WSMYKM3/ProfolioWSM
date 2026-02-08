'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import SoftwareIcon from '../SoftwareIcon';
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

export default function Post1() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string; isVideo?: boolean } | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
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
            {/* Back button for touch devices (iPad, mobile) */}
            {isTouchDevice && (
              <button
                onClick={handleCloseEnlarged}
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '2px solid rgba(255, 255, 255, 0.5)',
                  borderRadius: '12px',
                  padding: '14px 24px',
                  color: '#000',
                  fontSize: '18px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  zIndex: 10001,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  minWidth: '80px'
                }}
              >
                Back
              </button>
            )}
          </div>
        </div>
      )}

      <div className="post-content">
        <div className="text-content">
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
                So we're building a dating app that <span style={{
                  background: 'linear-gradient(120deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontWeight: 600,
                  color: '#fff'
                }}>recognizes your frequently mentioned answers and turns them into your profile automatically</span>, letting you chat freely without repeating yourself.
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
                backdropFilter: 'blur(10px)',
                border: hoveredItem === '/Datnieideation.png' ? '2px solid rgba(255, 255, 255, 0.6)' : '2px solid transparent',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
                transform: hoveredItem === '/Datnieideation.png' ? 'scale(1.05)' : 'scale(1)'
              }}
              onMouseEnter={() => setHoveredItem('/Datnieideation.png')}
              onMouseLeave={() => setHoveredItem(null)}
              >
                <Image
                  src={getImageSrc('/Datnieideation.png')}
                  alt="Datnie Ideation"
                  width={800}
                  height={600}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleImageClick('/Datnieideation.png', 'Datnie Ideation')}
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
        <section id="ux-design" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
          <h2 style={{ 
            fontSize: '1.75rem', 
            fontWeight: 700, 
            color: '#fff', 
            marginBottom: '40px',
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
            <div 
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                border: hoveredItem === '/brainstorm.png' ? '2px solid rgba(255, 255, 255, 0.6)' : '2px solid transparent',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
                transform: hoveredItem === '/brainstorm.png' ? 'scale(1.05)' : 'scale(1)'
              }}
              onClick={() => handleImageClick('/brainstorm.png', 'Datnie UX Design')}
              onMouseEnter={() => setHoveredItem('/brainstorm.png')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Image
                src={getImageSrc('/brainstorm.png')}
                alt="Datnie UX Design"
                fill
                style={{ objectFit: 'contain' }}
                onError={(e) => {
                  // Fallback to placeholder if image doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/800x450/2a2a2a/888888?text=UX+Design+Image';
                }}
              />
            </div>
            {/* UX Design GIF */}
            <div 
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                border: hoveredItem === '/webm/Datnie/uxboard.webm' ? '2px solid rgba(255, 255, 255, 0.6)' : '2px solid transparent',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
                transform: hoveredItem === '/webm/Datnie/uxboard.webm' ? 'scale(1.05)' : 'scale(1)'
              }}
              onClick={() => handleImageClick('/webm/Datnie/uxboard.webm', 'Datnie UX Design GIF', true)}
              onMouseEnter={() => setHoveredItem('/webm/Datnie/uxboard.webm')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <HoverVideo
                videoSrc="/webm/Datnie/uxboard.webm"
                alt="Datnie UX Design GIF"
                objectFit="contain"
              />
            </div>
          </div>
        </section>

        {/* Prototype Section */}
        <section id="prototype" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
          <h2 style={{ 
            fontSize: '1.75rem', 
            fontWeight: 700, 
            color: '#fff', 
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            Prototype
          </h2>
          
          {/* Animation Trailer Video */}
          <div id="animation-trailer" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '48px',
            width: isMobile ? '100%' : '65%',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: isMobile ? '0 16px' : '0',
            scrollMarginTop: '100px'
          }}>
            <div style={{
              width: '100%',
              aspectRatio: '16/9',
              backgroundColor: '#000',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              position: 'relative'
            }}>
              <iframe
                src="https://www.youtube.com/embed/SdtlgYBgla8"
                title="Animation Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: '-4px',
                  left: 0,
                  width: '100%',
                  height: 'calc(100% + 8px)',
                  display: 'block',
                  marginLeft: '0px',
                  marginTop: '0px'
                }}
              />
            </div>
            <p style={{
              fontSize: '0.95rem',
              color: '#d0d0d0',
              textAlign: 'center',
              margin: 0
            }}>
              Animation Trailer
            </p>
          </div>

          <h3 id="prototype-stage1" style={{ 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            color: '#d0d0d0', 
            marginBottom: '24px',
            marginTop: '16px',
            scrollMarginTop: '100px',
            textAlign: 'center'
          }}>
            Stage1: Animation Trailer(UE) production
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
            {/* Prototype Items - Each with unique path and description */}
            {[
              { path: '/gifs/groommaking1.webm', description: 'Character Groom Blueprint making process, groom binding in blender', isVideo: true },
              { path: '/gifs/run.webm', description: 'Character running shot', isVideo: true },
              { path: '/webm/Datnie/trainshot.webm', description: 'Sequence of talking, here I "fake" the background by a depth image, and here I use Dollars MoCap to do motion capture in blender', isVideo: true },
              { path: '/webm/Datnie/train.webm', description: 'Movie cut of talking', isVideo: true },
              { path: '/webm/Datnie/trainout.webm', description: 'Sequence of walking', isVideo: true },
              { path: '/webm/Datnie/walk.webm', description: 'Movie cut of waking', isVideo: true },
              { path: '/webm/Datnie/logogroom.webm', description: 'Give our logo groom to look cute', isVideo: true },
              { path: '/webm/Datnie/logoshot.webm', description: 'using Green Screen to layer it as transparent layer later', isVideo: true }
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
                      style={{ objectFit: 'contain' }}
                      onError={(e) => {
                        // Fallback to placeholder if gif doesn't exist
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

          {/* Stage 2: Unity Development */}
          <h3 id="prototype-stage2" style={{ 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            color: '#d0d0d0', 
            marginBottom: '24px',
            marginTop: '48px',
            textAlign: 'center',
            scrollMarginTop: '100px'
          }}>
            Stage2: Unity Development
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
            {/* Stage 2 Items */}
            {[
              { path: '/DatnieStage2/uiunity.png', description: 'Unity Meta SDK' },
              { path: '/webm/Datnie/pivot.webm', description: 'prototype a Pivot to switch profile card', isVideo: true },
              { path: '/webm/Datnie/uinavigator.webm', description: 'UI navigator debug by keyboard first, then replaced by hand microgesture', isVideo: true },
              { path: '/webm/Datnie/grabcloud.webm', description: 'I prototype a cloth simulation cloud first to pop up more infomation from profile card although not been used finally', isVideo: true },
              { path: '/webm/Datnie/grabcard.webm', description: 'Make every info card interactable, and easy to grab', isVideo: true },
              { path: '/webm/Datnie/addtop.webm', description: 'Frequent answer propmted to be added to profile of the user', isVideo: true },
              { path: '/DatnieStage2/rotater.png', description: 'The Main GameObject which auto-lays out icons on a ring and smoothly rotates to the next focused item' },
              { path: '/DatnieStage2/CodeRotate.png', description: 'The Script which rotates a circular UI carousel with smooth animated steps, index tracking, auto layout, and center-change events.' }
            ].map((item, index) => (
              <div
                key={`stage2-${index}`}
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
                        // Fallback to placeholder if image/gif doesn't exist
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
