'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
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

export default function Post6() {
  const [isMobile, setIsMobile] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string } | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  // Get post data for video URL
  const post = getPostById('post-6');
  const videoUrl = post?.videoUrl;

  // Image data arrays - 只需要在这里修改图片路径和描述
  const introductionImages = [
    { path: '/AetherTag/elemental counter system.png', alt: 'Introduction Image', description: 'Introduction image description' }
  ];

  const technicalSolutionImages = [
    { path: '/AetherTag/Technical Design.png', alt: 'Technical Solution 1', description: 'Technical Solution' },
    { path: '/AetherTag/prototype2.png', alt: 'Technical Solution 2', description: 'Combat System' },
    { path: '/AetherTag/userJourney.png', alt: 'Technical Solution 3', description: 'User Journey' }
  ];

  const enemiesWeaponsImages = [
    { path: '/AetherTag/ene.png', alt: 'Enemy/Weapon 1', description: 'Enemies of "water, fire, wind" elements' },
    { path: '/AetherTag/pro.png', alt: 'Enemy/Weapon 2', description: 'three types of projectile' },
    { path: '/AetherTag/wands.png', alt: 'Enemy/Weapon 3', description: 'three types of Wand assets' }
  ];

  const ragdollScriptsImages = [
    { path: '/AetherTag/Ragdoll.png', alt: 'Ragdoll Scripts 1', description: 'Ragdoll setting for enemy' },
    { path: '/AetherTag/radgollscripts.png', alt: 'Ragdoll Scripts 2', description: 'Scripts to call "Dead" function' }
  ];

  const doubleDamageImages = [
    { path: '/AetherTag/health.png', alt: 'Double Damage Projectile.cs', description: 'Double damage by detecting the tag and Projectile.cs' }
  ];

  const shieldPartsImages = [
    { path: '/AetherTag/shied.png', alt: 'Shield Part 1', description: 'Shield of for parts with a timeout to be destoryed and rebuilt' },
    { path: '/AetherTag/s1.png', alt: 'Shield Part 2', description: 'Shield Script 1' },
    { path: '/AetherTag/s2.png', alt: 'Shield Part 3', description: 'Shield Script 2' }
  ];

  const gameManagerImages = [
    { path: '/AetherTag/gamemanager.png', alt: 'GameManager 1', description: 'GameManager Script' },
    { path: '/AetherTag/gamemanager2.png', alt: 'GameManager 2', description: 'GameManager' } 
  ];

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
              width: '80vw',
              maxWidth: '1200px',
              height: '80vh',
              maxHeight: '800px',
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
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '8px'
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

      <div className="post-content" style={{ marginTop: 0, paddingTop: 0 }}>
        {/* YouTube Video at Top */}
        {videoUrl && (
          <section id="video" style={{ marginBottom: '60px', scrollMarginTop: '100px', marginTop: 0, paddingTop: 0, marginLeft: 0, marginRight: 0 }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '100%',
              margin: '0',
              paddingBottom: '56.25%', // 16:9 aspect ratio
              height: 0,
              overflow: 'hidden',
              borderRadius: '0',
              backgroundColor: '#000',
              marginTop: 0,
              marginBottom: '12px'
            }}>
              <iframe
                src={convertToEmbedUrl(videoUrl)}
                title="Aether Tag Video"
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
                  display: 'block',
                  marginTop: '-31px',
                  marginBottom: '-31px'
                }}
              />
            </div>
            <p style={{
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.7)',
              textAlign: 'center',
              margin: 0,
              marginTop: '12px'
            }}>
              walkthrough video
            </p>
          </section>
        )}

        {/* Introduction Section */}
        <section id="introduction" style={{ marginBottom: '60px', scrollMarginTop: '100px' }}>
          <h2 style={{ 
            fontSize: '1.75rem', 
            fontWeight: 700, 
            color: '#fff', 
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            Introduction
          </h2>
          <p style={{ 
            fontSize: '1rem', 
            lineHeight: '1.8', 
            color: '#d0d0d0',
            marginBottom: '40px',
            textAlign: 'center',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            We aim to create a non-violent laser tag game that can facilitate competitive dynamics without the need for overt violence.
            In our shooting game, we introduce a mechanism "elemental counter system", specifically, Water {'>'} Fire {'>'} Wind {'>'} Water. 
            Therefore, when a superior bullet hits the type of enemy it restrains, the damage is doubled.
          </p>
          {/* 1 GIF/Pic placeholder */}
          {introductionImages.map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '40px'
            }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '800px',
                  aspectRatio: '16/9',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                  border: '2px dashed rgba(255,255,255,0.2)',
                  marginBottom: '12px'
                }}
                onClick={() => handleImageClick(item.path, item.alt)}
              >
                <Image
                  src={getImageSrc(item.path)}
                  alt={item.alt}
                  fill
                  style={{ 
                    objectFit: 'cover',
                    top: '-22px'
                  }}
                />
              </div>
              <p style={{
                fontSize: '0.95rem',
                color: '#d0d0d0',
                textAlign: 'center',
                margin: 0,
                lineHeight: 1.5,
                maxWidth: '800px'
              }}>
                {item.description}
              </p>
            </div>
          ))}
        </section>

        {/* Game Design Section */}
        <section id="game-design" style={{ marginBottom: '60px', scrollMarginTop: '100px' }}>
          <h2 style={{ 
            fontSize: '1.75rem', 
            fontWeight: 700, 
            color: '#fff', 
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            Game Design
          </h2>
          
          {/* 1.1 Technical solution */}
          <h3 id="technical-solution" style={{ 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            color: '#d0d0d0', 
            marginBottom: '24px',
            marginTop: '32px',
            scrollMarginTop: '100px',
            textAlign: 'center'
          }}>
            1.1 Technical solution
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '24px',
            marginBottom: '48px',
            maxWidth: '1400px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: isMobile ? '0 16px' : '0'
          }}>
            {technicalSolutionImages.map((item, index) => (
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
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    cursor: 'pointer',
                    border: hoveredItem === item.path ? '2px solid rgba(255, 255, 255, 0.6)' : '2px dashed rgba(255,255,255,0.2)',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                    transform: hoveredItem === item.path ? 'scale(1.05)' : 'scale(1)'
                  }}
                  onClick={() => handleImageClick(item.path, item.alt)}
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Image
                    src={getImageSrc(item.path)}
                    alt={item.alt}
                    fill
                    style={{ 
                      objectFit: 'contain',
                      ...(index === 0 ? { left: '-2px', top: '-21px' } : {}),
                      ...(index === 1 ? { left: '-1px', top: '-23px' } : {}),
                      ...(index === 2 ? { left: '3px', top: '-25px' } : {})
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

          {/* 1.2 Our three types of enemies and weapons */}
          <h3 id="enemies-weapons" style={{ 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            color: '#d0d0d0', 
            marginBottom: '24px',
            marginTop: '32px',
            scrollMarginTop: '100px',
            textAlign: 'center'
          }}>
            1.2 Our three types of enemies and weapons
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '24px',
            marginBottom: '48px',
            maxWidth: '1400px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: isMobile ? '0 16px' : '0'
          }}>
            {enemiesWeaponsImages.map((item, index) => (
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
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    cursor: 'pointer',
                    border: hoveredItem === item.path ? '2px solid rgba(255, 255, 255, 0.6)' : '2px dashed rgba(255,255,255,0.2)',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                    transform: hoveredItem === item.path ? 'scale(1.05)' : 'scale(1)'
                  }}
                  onClick={() => handleImageClick(item.path, item.alt)}
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Image
                    src={getImageSrc(item.path)}
                    alt={item.alt}
                    fill
                    style={{ 
                      objectFit: 'contain',
                      ...(index === 0 ? { top: '-27px' } : {}),
                      ...(index === 1 ? { left: '1px', top: '-28px' } : {}),
                      ...(index === 2 ? { left: '-3px', top: '-17px' } : {})
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

        {/* My Prototype Section */}
        <section id="my-prototype" style={{ marginBottom: '60px', scrollMarginTop: '100px' }}>
          <h2 style={{ 
            fontSize: '1.75rem', 
            fontWeight: 700, 
            color: '#fff', 
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            My Prototype
          </h2>

          {/* 1.1 Ragdoll by scripts */}
          <h3 id="ragdoll-scripts" style={{ 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            color: '#d0d0d0', 
            marginBottom: '24px',
            marginTop: '32px',
            scrollMarginTop: '100px',
            textAlign: 'center'
          }}>
            1.1 Ragdoll by scripts
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '24px',
            marginBottom: '48px',
            maxWidth: '1400px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: isMobile ? '0 16px' : '0'
          }}>
            {ragdollScriptsImages.map((item, index) => (
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
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    cursor: 'pointer',
                    border: hoveredItem === item.path ? '2px solid rgba(255, 255, 255, 0.6)' : '2px dashed rgba(255,255,255,0.2)',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                    transform: hoveredItem === item.path ? 'scale(1.05)' : 'scale(1)'
                  }}
                  onClick={() => handleImageClick(item.path, item.alt)}
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Image
                    src={getImageSrc(item.path)}
                    alt={item.alt}
                    fill
                    style={{ 
                      objectFit: 'contain',
                      ...(index === 0 ? { top: '-33px' } : {}),
                      ...(index === 1 ? { 
                        paddingTop: '0px',
                        paddingBottom: '0px',
                        paddingLeft: '8px',
                        left: '-9px',
                        top: '-24px'
                      } : {})
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

          {/* 1.2 Double damage by detecting the tag and Projectile.cs */}
          <h3 id="double-damage" style={{ 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            color: '#d0d0d0', 
            marginBottom: '24px',
            marginTop: '32px',
            scrollMarginTop: '100px',
            textAlign: 'center'
          }}>
            1.2 Double damage by detecting the tag and Projectile.cs (methods for switching weapons and dealing damage)
          </h3>
          {doubleDamageImages.map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '48px',
              maxWidth: '1400px',
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: isMobile ? '0 16px' : '0'
            }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '800px',
                  aspectRatio: '16/9',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                  border: '2px dashed rgba(255,255,255,0.2)',
                  marginBottom: '12px'
                }}
                onClick={() => handleImageClick(item.path, item.alt)}
              >
                <Image
                  src={getImageSrc(item.path)}
                  alt={item.alt}
                  fill
                  style={{ 
                    objectFit: 'cover',
                    left: '1px',
                    top: '-22px'
                  }}
                />
              </div>
              <p style={{
                fontSize: '0.95rem',
                color: '#d0d0d0',
                textAlign: 'center',
                margin: 0,
                lineHeight: 1.5,
                maxWidth: '800px'
              }}>
                {item.description}
              </p>
            </div>
          ))}

          {/* 1.3 Four parts of the shield */}
          <h3 id="shield-parts" style={{ 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            color: '#d0d0d0', 
            marginBottom: '24px',
            marginTop: '32px',
            scrollMarginTop: '100px',
            textAlign: 'center'
          }}>
            1.3 Four parts of the shield - damaged by detecting the enemies' attack and recovering if not in certain period
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '24px',
            marginBottom: '48px',
            maxWidth: '1400px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: isMobile ? '0 16px' : '0'
          }}>
            {shieldPartsImages.map((item, index) => (
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
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    cursor: 'pointer',
                    border: hoveredItem === item.path ? '2px solid rgba(255, 255, 255, 0.6)' : '2px dashed rgba(255,255,255,0.2)',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                    transform: hoveredItem === item.path ? 'scale(1.05)' : 'scale(1)'
                  }}
                  onClick={() => handleImageClick(item.path, item.alt)}
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Image
                    src={getImageSrc(item.path)}
                    alt={item.alt}
                    fill
                    style={{ 
                      objectFit: 'contain',
                      ...(index === 0 ? { top: '-27px' } : {}),
                      ...(index === 1 ? { left: '-1px', top: '-30px' } : {}),
                      ...(index === 2 ? { left: '-5px', top: '-23px' } : {})
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

          {/* 1.4 GameManager */}
          <h3 id="gamemanager" style={{ 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            color: '#d0d0d0', 
            marginBottom: '24px',
            marginTop: '32px',
            scrollMarginTop: '100px',
            textAlign: 'center'
          }}>
            1.4 GameManager - Setting the enemy amounts, round duration, distance between enemies and players and so on...
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '24px',
            marginBottom: '48px',
            maxWidth: '1400px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: isMobile ? '0 16px' : '0'
          }}>
            {gameManagerImages.map((item, index) => (
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
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    cursor: 'pointer',
                    border: hoveredItem === item.path ? '2px solid rgba(255, 255, 255, 0.6)' : '2px dashed rgba(255,255,255,0.2)',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                    transform: hoveredItem === item.path ? 'scale(1.05)' : 'scale(1)'
                  }}
                  onClick={() => handleImageClick(item.path, item.alt)}
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Image
                    src={getImageSrc(item.path)}
                    alt={item.alt}
                    fill
                    style={{ 
                      objectFit: 'contain',
                      ...(index === 0 ? { left: '-4px', top: '-25px' } : {}),
                      ...(index === 1 ? { left: '-2px', top: '-28px' } : {})
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
    </>
  );
}
