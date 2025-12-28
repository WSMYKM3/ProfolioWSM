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
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string } | null>(null);

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

  const handleImageClick = (src: string, alt: string) => {
    setEnlargedImage({ src, alt });
  };

  const handleCloseEnlarged = () => {
    setEnlargedImage(null);
  };

  // Determine scale factor based on image path
  const getImageScale = (imageSrc: string): number => {
    // Large images that should not be scaled up much
    if (imageSrc.includes('/brainstorm.png')) {
      return 0.9; // Even smaller scale for brainstorm.png
    }
    if (imageSrc.includes('/Datnieideation.png')) {
      return 1.0; // No scale for Datnieideation.png
    }
    // Stage2 images that are too large when scaled
    if (imageSrc.includes('/DatnieStage2/uinavigator.gif') || imageSrc.includes('/DatnieStage2/uiunity.png')) {
      return 1.0; // No scale for these large Stage2 images
    }
    return 2; // Default scale for other images/gifs
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
                cursor: 'pointer'
              }}
              onClick={() => handleImageClick('/brainstorm.png', 'Datnie UX Design')}
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
                cursor: 'pointer'
              }}
              onClick={() => handleImageClick('/gifs/uxboard.gif', 'Datnie UX Design GIF')}
            >
              <Image
                src={getImageSrc('/gifs/uxboard.gif')}
                alt="Datnie UX Design GIF"
                fill
                style={{ objectFit: 'contain' }}
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
              { path: '/gifs/groommaking.gif', description: 'Character Groom Blueprint making process, groom binding in blender' },
              { path: '/gifs/run.gif', description: 'Character running shot' },
              { path: '/gifs/trainshot.gif', description: 'Sequence of talking, here I "fake" the background by a depth image, and here I use Dollars MoCap to do motion capture in blender' },
              { path: '/gifs/train.gif', description: 'Movie cut of talking' },
              { path: '/gifs/trainout.gif', description: 'Sequence of walking' },
              { path: '/gifs/walk.gif', description: 'Movie cut of waking' },
              { path: '/gifs/logogroom.gif', description: 'Give our logo groom to look cute' },
              { path: '/gifs/logoshot.gif', description: 'using Green Screen to layer it as transparent layer later' }
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
                    cursor: 'pointer'
                  }}
                  onClick={() => handleImageClick(item.path, item.description)}
                >
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
              { path: '/DatnieStage2/pivot.gif', description: 'prototype a Pivot to switch profile card' },
              { path: '/DatnieStage2/uinavigator.gif', description: 'UI navigator debug by keyboard first, then replaced by hand microgesture' },
              { path: '/gifs/grabcloud.gif', description: 'I prototype a cloth simulation cloud first to pop up more infomation from profile card although not been used finally' },
              { path: '/DatnieStage2/grabcard.gif', description: 'Make every info card interactable, and easy to grab' },
              { path: '/DatnieStage2/addtop.gif', description: 'Frequent answer propmted to be added to profile of the user' },
              { path: '/gifs/unity-placeholder-7.gif', description: 'Unity Development Placeholder 7' },
              { path: '/gifs/unity-placeholder-8.gif', description: 'Unity Development Placeholder 8' }
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
                    cursor: 'pointer'
                  }}
                  onClick={() => handleImageClick(item.path, item.description)}
                >
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
