'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import HoverVideo from '../HoverVideo';
import { getImageScale } from '@/app/lib/imageScaleUtils';

function getImageSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}

type MediaItem = { path: string; description: string; isVideo?: boolean };

const STAGE1_ITEMS: MediaItem[] = [
  { path: '/gifs/groommaking1.webm', description: 'Character Groom Blueprint making process, groom binding in blender', isVideo: true },
  { path: '/gifs/run.webm', description: 'Character running shot', isVideo: true },
  { path: '/webm/Datnie/trainshot.webm', description: 'Sequence of talking, here I "fake" the background by a depth image, and use Dollars MoCap to do motion capture in blender', isVideo: true },
  { path: '/webm/Datnie/train.webm', description: 'Movie cut of talking', isVideo: true },
  { path: '/webm/Datnie/trainout.webm', description: 'Sequence of walking', isVideo: true },
  { path: '/webm/Datnie/walk.webm', description: 'Movie cut of walking', isVideo: true },
  { path: '/webm/Datnie/logogroom.webm', description: 'Give our logo groom to look cute', isVideo: true },
  { path: '/webm/Datnie/logoshot.webm', description: 'Using a green screen to layer it as a transparent layer later', isVideo: true },
];

const STAGE2_ITEMS: MediaItem[] = [
  { path: '/DatnieStage2/uiunity.png', description: 'Unity Meta SDK' },
  { path: '/webm/Datnie/pivot.webm', description: 'Prototype a pivot to switch profile card', isVideo: true },
  { path: '/webm/Datnie/uinavigator.webm', description: 'UI navigator debug by keyboard first, then replaced by hand microgesture', isVideo: true },
  { path: '/webm/Datnie/grabcloud.webm', description: 'A cloth-simulation cloud popping up profile info (cut from final build)', isVideo: true },
  { path: '/webm/Datnie/grabcard.webm', description: 'Every info card is interactable and easy to grab', isVideo: true },
  { path: '/webm/Datnie/addtop.webm', description: 'A frequent answer is prompted to be added to the user\'s profile', isVideo: true },
  { path: '/DatnieStage2/rotater.png', description: 'The main GameObject auto-lays out icons on a ring and smoothly rotates to the next focused item' },
  { path: '/DatnieStage2/CodeRotate.png', description: 'Script rotating a circular UI carousel with smooth steps, index tracking, auto layout, and center-change events' },
];

export default function Post1() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string; isVideo?: boolean } | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && enlargedImage) setEnlargedImage(null);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [enlargedImage]);

  // Preserve sketch-underline draw-on-scroll behaviour
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const path = el.querySelector('path');
            if (path) {
              const delay = parseFloat(el.dataset.delay || '0');
              setTimeout(() => path.classList.add('drawn'), delay * 1000);
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll<HTMLElement>('.sketch-underline').forEach((el, i) => {
      el.dataset.delay = (i * 0.15).toFixed(2);
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleImageClick = (src: string, alt: string, isVideo?: boolean) => {
    setEnlargedImage({ src, alt, isVideo });
  };
  const handleCloseEnlarged = () => setEnlargedImage(null);

  const renderMediaGrid = (items: MediaItem[], idPrefix: string) => (
    <div
      className="ed-grid-asym"
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: isMobile ? 40 : 60,
        marginTop: 32,
      }}
    >
      {items.map((item, index) => (
        <figure
          key={`${idPrefix}-${index}`}
          className="photo"
          data-anim={index % 3 === 0 ? 'slide-up' : index % 3 === 1 ? 'slide-left' : 'slide-right'}
          style={{ cursor: 'pointer', width: '100%' }}
          onClick={() => handleImageClick(item.path, item.description, item.isVideo)}
          onMouseEnter={() => setHoveredItem(item.path)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="photo__frame photo__frame--contain">
            {item.isVideo ? (
              <HoverVideo videoSrc={item.path} alt={item.description} objectFit="contain" />
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
          <figcaption className="photo__caption">{item.description}</figcaption>
        </figure>
      ))}
    </div>
  );

  return (
    <>
      {enlargedImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(26, 20, 13, 0.96)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 20,
          }}
          onClick={handleCloseEnlarged}
        >
          <div
            style={{ position: 'relative', width: '90vw', height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
                style={{ maxWidth: '90vw', maxHeight: '90vh', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: 8 }}
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
                  borderRadius: 8,
                  transform: `scale(${getImageScale(enlargedImage.src)})`,
                  transformOrigin: 'center center',
                }}
              />
            )}
            <button
              onClick={handleCloseEnlarged}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                background: 'rgba(255, 245, 220, 0.2)',
                border: 'none',
                borderRadius: '50%',
                width: 40,
                height: 40,
                color: '#fff5dc',
                fontSize: 24,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              &times;
            </button>
            {isTouchDevice && (
              <button
                onClick={handleCloseEnlarged}
                style={{
                  position: 'absolute',
                  right: 20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: '#fff5dc',
                  border: '2px solid #1a140d',
                  borderRadius: 12,
                  padding: '14px 24px',
                  color: '#1a140d',
                  fontSize: 18,
                  fontWeight: 600,
                  cursor: 'pointer',
                  zIndex: 10001,
                  boxShadow: '4px 5px 0 #1a140d',
                  minWidth: 80,
                }}
              >
                Back
              </button>
            )}
          </div>
        </div>
      )}

      <div className="post-content">
        {/* ─── Ideation ─── */}
        <section id="ideation" className="ed-section">
          <span className="ed-kicker ed-kicker--rust">CHAPTER 01</span>
          <h2 className="ed-section__title">Ideation</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr',
              gap: isMobile ? 32 : 60,
              alignItems: 'center',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(18px, 1.7vw, 22px)',
                  lineHeight: 1.7,
                  color: 'var(--ink)',
                  marginBottom: 20,
                }}
              >
                Inspired by a friend&apos;s frustration with{' '}
                <span className="sketch-underline orange">
                  dating apps
                  <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M 2 5 Q 50 8, 100 4 T 198 6" pathLength="1" />
                  </svg>
                </span>
                —endless queued messages, repeated conversations, and time spent hanging out only to find{' '}
                <span className="sketch-underline blue">
                  no shared interests
                  <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M 3 4 Q 60 9, 120 3 Q 160 7, 197 5" pathLength="1" />
                  </svg>
                </span>
                .
              </p>
              <p
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(18px, 1.7vw, 22px)',
                  lineHeight: 1.7,
                  color: 'var(--ink)',
                }}
              >
                So we&apos;re building a dating app that{' '}
                <span className="sketch-underline green">
                  recognizes your frequently mentioned answers and turns them into your profile automatically
                  <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M 2 6 Q 45 2, 100 7 T 198 4" pathLength="1" />
                  </svg>
                </span>
                , letting you{' '}
                <span className="sketch-underline purple">
                  chat freely
                  <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M 2 4 Q 70 9, 130 3 Q 170 8, 198 5" pathLength="1" />
                  </svg>
                </span>{' '}
                without repeating yourself.
              </p>
            </div>
            <figure
              className="photo photo--tilt-r"
              data-anim="rotate-in"
              style={{ width: 'min(420px, 100%)', justifySelf: isMobile ? 'center' : 'end', cursor: 'pointer' }}
              onClick={() => handleImageClick('/Datnieideation.png', 'Datnie Ideation')}
            >
              <div className="photo__frame photo__frame--3by4 photo__frame--contain">
                <Image
                  src={getImageSrc('/Datnieideation.png')}
                  alt="Datnie Ideation"
                  width={800}
                  height={600}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/800x600/2a2a2a/888888?text=Ideation+Diagram';
                  }}
                />
              </div>
              <figcaption className="photo__caption">marker on butcher paper</figcaption>
            </figure>
          </div>
        </section>

        {/* ─── UX Design ─── */}
        <section id="ux-design" className="ed-section">
          <span className="ed-kicker">CHAPTER 02</span>
          <h2 className="ed-section__title">UX Design</h2>
          <div
            className="ed-grid-asym"
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: 40,
            }}
          >
            <figure
              className="photo"
              data-anim="slide-left"
              style={{ cursor: 'pointer', width: '100%' }}
              onClick={() => handleImageClick('/brainstorm.png', 'Datnie UX Design')}
            >
              <div className="photo__frame photo__frame--contain">
                <Image
                  src={getImageSrc('/brainstorm.png')}
                  alt="Datnie UX Design"
                  fill
                  style={{ objectFit: 'contain' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/800x450/2a2a2a/888888?text=UX+Design+Image';
                  }}
                />
              </div>
              <figcaption className="photo__caption">Brainstorm sketches</figcaption>
            </figure>
            <figure
              className="photo"
              data-anim="slide-right"
              style={{ cursor: 'pointer', width: '100%' }}
              onClick={() => handleImageClick('/webm/Datnie/uxboard.webm', 'Datnie UX Design GIF', true)}
            >
              <div className="photo__frame photo__frame--contain">
                <HoverVideo videoSrc="/webm/Datnie/uxboard.webm" alt="Datnie UX Design GIF" objectFit="contain" />
              </div>
              <figcaption className="photo__caption">UX board walkthrough</figcaption>
            </figure>
          </div>
        </section>

        {/* ─── Prototype ─── */}
        <section id="prototype" className="ed-section">
          <span className="ed-kicker ed-kicker--rust">CHAPTER 03</span>
          <h2 className="ed-section__title">Prototype</h2>

          {/* Animation Trailer */}
          <div
            id="animation-trailer"
            style={{ display: 'flex', justifyContent: 'center', marginBottom: 60, scrollMarginTop: 100 }}
          >
            <figure
              className="photo photo--tilt-l"
              data-anim="rotate-in"
              style={{ width: 'min(720px, 92%)' }}
            >
              <div className="photo__frame">
                <iframe
                  src="https://www.youtube.com/embed/SdtlgYBgla8"
                  title="Animation Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <figcaption className="photo__caption">Animation Trailer</figcaption>
            </figure>
          </div>

          {/* Stage 1 */}
          <h3
            id="prototype-stage1"
            className="ed-section__subtitle"
            style={{ scrollMarginTop: 100 }}
          >
            Stage 1 — Animation Trailer (UE) production
          </h3>
          {renderMediaGrid(STAGE1_ITEMS, 'stage1')}

          {/* Stage 2 */}
          <h3
            id="prototype-stage2"
            className="ed-section__subtitle"
            style={{ scrollMarginTop: 100, marginTop: 100 }}
          >
            Stage 2 — Unity Development
          </h3>
          {renderMediaGrid(STAGE2_ITEMS, 'stage2')}
        </section>
      </div>
    </>
  );
}
