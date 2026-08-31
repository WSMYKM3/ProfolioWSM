'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import TopNav from '@/app/components/TopNav';
import { workPosts, type Post, type ProjectIdentity } from '@/app/lib/posts';
import { getPostPageRoute } from '@/app/lib/navigation';
import { getPublicAssetUrl } from '@/app/lib/publicAsset';
import styles from '@/app/about/page.module.css';

interface ProjectPresentation {
  category: string;
  imagePosition: string;
  mediaAspect?: 'landscape' | 'portrait';
}

const projectPresentation: Record<string, ProjectPresentation> = {
  'post-8': { category: 'Multi-Arm Robotics Simulation & Data Collection', imagePosition: 'center 44%', mediaAspect: 'portrait' },
  'post-7': { category: 'AR camera to guide AI generation with phone', imagePosition: 'center 44%', mediaAspect: 'portrait' },
  'post-1': { category: 'Mixed Reality Dating', imagePosition: 'center' },
  'post-2': { category: 'ASL learning app', imagePosition: 'center 38%' },
  'post-3': { category: 'Immersive AI Installation', imagePosition: 'center' },
  'post-4': { category: 'Motion Capture', imagePosition: 'center' },
  'post-5': { category: 'AI Shopping Assistant', imagePosition: 'center' },
  'post-6': { category: 'XR Game Design', imagePosition: 'center' },
  'upcoming-1': { category: 'In Development', imagePosition: 'center' },
};

const identityOptions: Array<{ id: ProjectIdentity; label: string; colorClass: string }> = [
  { id: 'creative-technologist', label: 'Creative Technologist', colorClass: styles.identityButtonRed },
  { id: 'builder', label: 'AI / Builder', colorClass: styles.identityButtonBlue },
  { id: 'artist', label: 'Artist', colorClass: styles.identityButtonYellow },
];

// Replace `src: null` with paths from the future image folder.
// Example: { id: '01', src: '/portfolio-strip/image-01.webp', alt: 'Project process' }
const studyStripImages = [
  { id: '01', src: null, alt: 'Portfolio image placeholder 01' },
  { id: '02', src: null, alt: 'Portfolio image placeholder 02' },
  { id: '03', src: null, alt: 'Portfolio image placeholder 03' },
  { id: '04', src: null, alt: 'Portfolio image placeholder 04' },
  { id: '05', src: null, alt: 'Portfolio image placeholder 05' },
  { id: '06', src: null, alt: 'Portfolio image placeholder 06' },
] as const;

export default function AboutLiquidGlass() {
  const sceneRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Post | null>(null);
  const [activeIdentity, setActiveIdentity] = useState<ProjectIdentity>('creative-technologist');

  const displayedProjects = workPosts.filter((post) => post.identity === activeIdentity);

  const handleIdentityChange = (identity: ProjectIdentity) => {
    setActiveProject(null);
    setActiveIdentity(identity);
  };

  useEffect(() => {
    const scene = sceneRef.current;
    const panel = panelRef.current;
    if (!scene || !panel) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const desktop = window.matchMedia('(min-width: 901px)');

    let animationFrame = 0;
    let isTracking = false;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const canUseParallax = () => !reduceMotion.matches && finePointer.matches && desktop.matches;

    const writeParallax = (x: number, y: number) => {
      panel.style.setProperty('--panel-x', `${x * 4.5}px`);
      panel.style.setProperty('--panel-y', `${y * 3.5}px`);
      panel.style.setProperty('--panel-rx', `${y * -1.2}deg`);
      panel.style.setProperty('--panel-ry', `${x * 1.75}deg`);
      panel.style.setProperty('--card-x', `${x * 2.4}px`);
      panel.style.setProperty('--card-y', `${y * 1.8}px`);
    };

    const animateParallax = () => {
      current.x += (target.x - current.x) * 0.075;
      current.y += (target.y - current.y) * 0.075;
      writeParallax(current.x, current.y);

      const stillMoving =
        Math.abs(target.x - current.x) > 0.001 || Math.abs(target.y - current.y) > 0.001;

      if (isTracking || stillMoving) {
        animationFrame = window.requestAnimationFrame(animateParallax);
      } else {
        animationFrame = 0;
      }
    };

    const requestFrame = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(animateParallax);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!canUseParallax()) return;
      const bounds = scene.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
      target.y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
      isTracking = true;
      requestFrame();
    };

    const resetParallax = () => {
      target.x = 0;
      target.y = 0;
      isTracking = false;
      requestFrame();
    };

    const handleCapabilityChange = () => {
      if (!canUseParallax()) {
        target.x = 0;
        target.y = 0;
        current.x = 0;
        current.y = 0;
        writeParallax(0, 0);
      }
    };

    scene.addEventListener('pointermove', handlePointerMove, { passive: true });
    scene.addEventListener('pointerleave', resetParallax);
    window.addEventListener('blur', resetParallax);
    reduceMotion.addEventListener('change', handleCapabilityChange);
    finePointer.addEventListener('change', handleCapabilityChange);
    desktop.addEventListener('change', handleCapabilityChange);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      scene.removeEventListener('pointermove', handlePointerMove);
      scene.removeEventListener('pointerleave', resetParallax);
      window.removeEventListener('blur', resetParallax);
      reduceMotion.removeEventListener('change', handleCapabilityChange);
      finePointer.removeEventListener('change', handleCapabilityChange);
      desktop.removeEventListener('change', handleCapabilityChange);
    };
  }, []);

  return (
    <div className="layout">
      <TopNav />

      <main className={styles.page} ref={sceneRef}>
        <div
          className={styles.background}
          style={{ backgroundImage: `url("${getPublicAssetUrl('/reference-main-background.webp')}")` }}
          aria-hidden="true"
        />
        <div className={styles.wash} aria-hidden="true" />

        <aside className={styles.studyBlock} aria-label="Portfolio video">
          <div className={styles.studyStrip} aria-label="Portfolio image highlights">
            <div className={styles.studyStripTrack}>
              {[0, 1].map((copyIndex) => (
                <div
                  className={styles.studyStripSet}
                  key={copyIndex}
                  aria-hidden={copyIndex === 1}
                >
                  {studyStripImages.map((item) => (
                    <div className={styles.studyStripItem} key={`${copyIndex}-${item.id}`}>
                      {item.src ? (
                        <img src={getPublicAssetUrl(item.src)} alt={item.alt} />
                      ) : (
                        <span aria-label={item.alt}>{item.id}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.studyVideo}>
            <iframe
              src="https://www.youtube.com/embed/ThW5sgK06q0?autoplay=1&mute=1&loop=1&playsinline=1&playlist=ThW5sgK06q0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Siming Wang portfolio video"
            />
          </div>
          <p className={styles.studyNote}>
            <span>Portfolio study</span>
            <span>01 / 26</span>
          </p>
        </aside>

        <aside
          className={`${styles.projectPreview} ${activeProject ? styles.projectPreviewVisible : ''}`}
          aria-live="polite"
          aria-hidden={!activeProject}
        >
          <span className={styles.projectPreviewLine} aria-hidden="true" />
          <p className={styles.projectPreviewCategory}>
            {activeProject ? projectPresentation[activeProject.id]?.category : ''}
          </p>
          <h2 className={styles.projectPreviewTitle}>{activeProject?.title ?? ''}</h2>
        </aside>

        <section className={styles.glassStage} aria-label="Selected portfolio projects">
          <div className={styles.identitySwitcher} aria-label="Filter projects by identity">
            {identityOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`${styles.identityButton} ${option.colorClass} ${activeIdentity === option.id ? styles.identityButtonActive : ''}`}
                aria-pressed={activeIdentity === option.id}
                onClick={() => handleIdentityChange(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className={styles.glassPanel} ref={panelRef}>
            <div className={styles.glassShine} aria-hidden="true" />

            <header className={styles.glassHeader}>
              <div className={styles.headerCopy}>
                <p className={styles.eyebrow}>Creative Technologist &amp; Engineer</p>
                <h1>Siming Wang</h1>
              </div>
              <p className={styles.edition} aria-label="Portfolio edition 2026">@26</p>
            </header>

            <div
              className={`${styles.projectGrid} ${
                activeIdentity === 'artist'
                  ? styles.projectGridArtist
                  : activeIdentity === 'builder'
                    ? styles.projectGridBuilder
                    : styles.projectGridTechnologist
              }`}
              aria-label={`${identityOptions.find((option) => option.id === activeIdentity)?.label} project gallery`}
            >
              {displayedProjects.map((post, index) => {
                const presentation = projectPresentation[post.id];
                const isComingSoon = post.status === 'coming-soon';
                const mediaClass = presentation?.mediaAspect === 'portrait'
                  ? styles.projectCardPortrait
                  : styles.projectCardLandscape;
                const cardContent = (
                  <>
                    {isComingSoon ? (
                      <span className={styles.placeholderArtwork} aria-hidden="true">
                        <span className={styles.placeholderMark}>+</span>
                        <span className={styles.placeholderLine} />
                        <span className={styles.placeholderLineShort} />
                      </span>
                    ) : (
                      <img
                        className={styles.projectImage}
                        src={getPublicAssetUrl(post.thumbnail)}
                        alt=""
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                    )}
                    <span className={styles.projectVeil} aria-hidden="true" />
                    <span className={styles.projectNumber}>{String(index + 1).padStart(2, '0')}</span>
                    <span className={styles.projectContent}>
                      <span className={styles.projectCategory}>{presentation?.category}</span>
                      <span className={styles.projectTitle}>{post.title}</span>
                      <span className={styles.projectCta} aria-hidden="true">
                        {isComingSoon ? 'Coming Soon' : 'View project'}
                      </span>
                    </span>
                  </>
                );

                if (isComingSoon) {
                  return (
                    <article
                      key={post.id}
                      className={`${styles.projectCard} ${styles.projectPlaceholder} ${mediaClass}`}
                      aria-label={`${String(index + 1).padStart(2, '0')}. ${post.title}, Coming Soon`}
                    >
                      {cardContent}
                    </article>
                  );
                }

                return (
                  <Link
                    key={post.id}
                    href={getPostPageRoute(post.id)}
                    className={`${styles.projectCard} ${mediaClass}`}
                    style={{ '--image-position': presentation?.imagePosition ?? 'center' } as CSSProperties}
                    aria-label={`${String(index + 1).padStart(2, '0')}. ${post.title}, ${presentation?.category ?? ''}`}
                    onMouseEnter={() => setActiveProject(post)}
                    onMouseLeave={(event) => {
                      if (event.currentTarget !== document.activeElement) setActiveProject(null);
                    }}
                    onFocus={() => setActiveProject(post)}
                    onBlur={() => setActiveProject(null)}
                  >
                    {cardContent}
                  </Link>
                );
              })}
            </div>

            <footer className={styles.glassFooter}>
              <span>Selected work</span>
              <span>Move to explore depth</span>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
