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

export default function Post3() {
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
          {/* Achievement Section */}
          <section id="achievement" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 700, 
              color: '#fff', 
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              Achievement
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
              Supported by Immersive Arts UK, Cryptic, the UKRI Innovate UK Immersive Tech Network, Co-STEAM, the Institute for Design Informatics, and Inspace. This is the first prototype presentation of this project, a pop-up exhibition and performance at Inspace, Edinburgh, which is set to expand into a major exhibition in 2026 and 2027.
            </p>
          </section>

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
              {['Unreal Engine(C++)', 'Touchdesigner', 'Blender', 'Python'].map((tool, index) => (
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

          {/* My Contributions Section */}
          <section id="contributions" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
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
                'localhost in mobile device(an ipad) to trigger chatting with AI and inactivity fallback system',
                'Wake words to trigger chatting start(Python), and connected to Touchdesigner',
                'OSC connection-Metahuman speech content from touchdesigner',
                'Touchdesigner chatting state machine'
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

          {/* Installation Draft Section */}
          <section id="installation-draft" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 700, 
              color: '#fff', 
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              Installation Draft
            </h2>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '900px',
                  aspectRatio: '16/9',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: 'transparent',
                  cursor: 'pointer'
                }}
                onClick={() => handleImageClick('/IandAI/Draft.png', 'Installation Draft Design')}
              >
                <Image
                  src={getImageSrc('/IandAI/Draft.png')}
                  alt="Installation Draft Design"
                  fill
                  style={{ 
                    objectFit: 'contain',
                    top: '-47px',
                    left: '-3px'
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/900x506/2a2a2a/888888?text=Installation+Draft';
                  }}
                />
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section id="process" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 700, 
              color: '#fff', 
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              Process
            </h2>

            {/* Stage1: Touchdesigner-Unreal Engine Communication Prototype */}
            <h3 id="process-stage1" style={{ 
              fontSize: '1.25rem', 
              fontWeight: 600, 
              color: '#d0d0d0', 
              marginBottom: '24px',
              marginTop: '16px',
              scrollMarginTop: '100px',
              textAlign: 'center'
            }}>
              Stage1: Touchdesigner-Unreal Engine Communication Prototype
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
              {[
                { path: '/IandAI/tdcommunication.png', description: 'To support multi-device communication during the exhibition, I set up a shared network address that allowed systems to exchange information in real time.' },
                { path: '/webm/Mirrormirror/CommunicationPro.webm', description: 'This demonstrates the transfer of data from TouchDesigner to Unreal Engine, enabling MetaHuman to generate output and response to user speech.', isVideo: true }
                
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

            {/* Stage2: State machine Prototype */}
            <h3 id="process-stage2" style={{ 
              fontSize: '1.25rem', 
              fontWeight: 600, 
              color: '#d0d0d0', 
              marginBottom: '24px',
              marginTop: '48px',
              textAlign: 'center',
              scrollMarginTop: '100px'
            }}>
              Stage2: State machine Prototype
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
              {[
                { path: '/IandAI/statemachine.png', description: 'I used a Switch node in TouchDesigner to control different states sent to Unreal Engine’s MetaHuman, with Python scripts managing greeting, dialogue, and closing states.' },
                { path: '/IandAI/pythons1.png', description: 'After the user speaks, their input is stored in a table, and my code monitors changes in the table to update the interaction state.' }
              ].map((item: any, index) => {
                const itemWithVideo = { ...item, isVideo: item.isVideo ?? false };
                return (
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
                );
              })}
            </div>

            {/* Stage3: Metahuman realtime Speech/Lipsync */}
            <h3 id="process-stage3" style={{ 
              fontSize: '1.25rem', 
              fontWeight: 600, 
              color: '#d0d0d0', 
              marginBottom: '24px',
              marginTop: '48px',
              textAlign: 'center',
              scrollMarginTop: '100px'
            }}>
              Stage3: Metahuman realtime Speech/Lipsync
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
              {[
                { path: '/webm/Mirrormirror/lipsync.webm', description: 'MetaHuman lip sync controlled via the Runtime MetaHuman Lip Sync plugin, with OSC-driven speech and mouth animation handled through Blueprints and an Animation Blueprint.', isVideo: true },
                { path: '/IandAI/mesh data transfer.png', description: 'In Blender, I used the Mesh Data Transfer add-on to ensure that the sculpted MetaHuman mesh shares the same skeletal structure as the original MetaHuman, preserving correct facial deformation and animation.' }
                
              ].map((item, index) => (
                <div
                  key={`stage3-${index}`}
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

            {/* Stage4: Wake Words & localhost interactive interface */}
            <h3 id="process-stage4" style={{ 
              fontSize: '1.25rem', 
              fontWeight: 600, 
              color: '#d0d0d0', 
              marginBottom: '24px',
              marginTop: '48px',
              textAlign: 'center',
              scrollMarginTop: '100px'
            }}>
              Stage4: Wake Words & localhost interactive interface
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
              {[
                { path: '/webm/Mirrormirror/wakenwords detect.webm', description: 'Accent variability was handled by lowering the wake-word detection threshold; successful triggers send a pulse to TouchDesigner for visual switching, using the lightweight vosk-model-small-en-us-0.15 model.', isVideo: true },
                { path: '/IandAI/wakenwords.png', description: 'Based on a collaborator’s requirement, I implemented a Python-based wake-word detection system that activates the experience and switches scenes when “mirror mirror” is detected.' }
                
              ].map((item, index) => (
                <div
                  key={`stage4-${index}`}
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
