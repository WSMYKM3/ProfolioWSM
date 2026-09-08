'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import TopNav from '@/app/components/TopNav';
import { workPosts, type Post, type ProjectIdentity } from '@/app/lib/posts';
import { getPostPageRoute } from '@/app/lib/navigation';
import { getPublicAssetUrl } from '@/app/lib/publicAsset';
import styles from '@/app/about/page.module.css';

interface ProjectPresentation {
  imagePosition: string;
  mediaAspect?: 'landscape' | 'portrait';
  showFullImage?: boolean;
}

const projectPresentation: Record<string, ProjectPresentation> = {
  'post-10': {
    imagePosition: 'center',
    mediaAspect: 'landscape',
  },
  'post-9': { imagePosition: 'center' },
  'post-8': {
    imagePosition: 'center',
    mediaAspect: 'landscape',
  },
  'post-7': { imagePosition: 'center 44%', mediaAspect: 'portrait' },
  'post-1': { imagePosition: 'center' },
  'post-2': { imagePosition: 'center 38%' },
  'post-3': { imagePosition: 'center' },
  'post-4': { imagePosition: 'center' },
  'post-5': { imagePosition: 'center' },
  'post-6': { imagePosition: 'center' },
};

const identityOptions: Array<{
  id: Extract<ProjectIdentity, 'builder' | 'creative-technologist'>;
  label: string;
  description: string;
  colorClass: string;
}> = [
  {
    id: 'builder',
    label: 'AI / Builder',
    description: 'I build useful, creative products with AI.',
    colorClass: styles.identityButtonBlue,
  },
  {
    id: 'creative-technologist',
    label: 'Creative Technologist',
    description: 'I use creative technology to build interactive experiences.',
    colorClass: styles.identityButtonRed,
  },
];

type ProjectView = 'featured' | Extract<ProjectIdentity, 'builder' | 'creative-technologist'>;

const featuredOption = {
  id: 'featured' as const,
  label: 'Featured',
  description: 'Three projects that best represent my AI product, XR, and robotics work.',
  colorClass: styles.identityButtonYellow,
};

const featuredProjectIds = ['post-7', 'post-2', 'post-8'] as const;

const studyStripRows = [
  [
    { id: '01', projectId: 'post-9', src: '/AIGlass/aiglassthumb.webp', alt: 'AI Glass film project' },
    { id: '02', projectId: 'post-7', src: '/Reroll/thumbnail.webp', alt: 'Reroll AI filmmaking project' },
    { id: '03', projectId: 'post-8', src: '/SortingFactory/thumb5.webp', alt: 'Sorting Factory robotics project' },
    { id: '04', projectId: 'post-10', src: '/Couldve/Thumb1.webp', alt: 'Couldve mobile product project' },
  ],
  [
    { id: '05', projectId: 'post-1', src: '/datnie.png', alt: 'Datnie mixed reality dating project' },
    { id: '06', projectId: 'post-2', src: '/linkedinthumbnail.png', alt: 'Signie sign-language learning project' },
    { id: '07', projectId: 'post-3', src: '/iandaithumb.jpg', alt: 'I and AI interactive installation' },
    { id: '08', projectId: 'post-5', src: '/toolboxthumb.png', alt: 'The Toolbox mixed reality project' },
  ],
] as const;

export default function AboutLiquidGlass() {
  const sceneRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const studyStripRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Post | null>(null);
  const [activeView, setActiveView] = useState<ProjectView>('featured');

  const displayedProjects = activeView === 'featured'
    ? featuredProjectIds
        .map((id) => workPosts.find((post) => post.id === id))
        .filter((post): post is Post => Boolean(post))
    : workPosts.filter((post) => {
        if (post.id === 'post-9') return false;
        if (activeView === 'creative-technologist') {
          return post.identity === 'creative-technologist' || post.identity === 'artist';
        }
        return post.identity === 'builder';
      });
  const aiFilmProject = workPosts.find((post) => post.id === 'post-9');
  const activeViewOption = activeView === 'featured'
    ? featuredOption
    : identityOptions.find((option) => option.id === activeView)!;

  const handleViewChange = (view: ProjectView) => {
    setActiveProject(null);
    setActiveView(view);
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

  useEffect(() => {
    const strip = studyStripRef.current;
    if (!strip) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (reduceMotion.matches || !finePointer.matches) return;

    const cards = Array.from(strip.querySelectorAll<HTMLElement>('[data-study-card]'));
    const physics = cards.map((card) => ({
      card,
      image: card.querySelector<HTMLElement>('[data-study-card-image]'),
      x: 0,
      y: 0,
      impulseX: 0,
      impulseY: 0,
      springX: 0,
      springY: 0,
    }));
    const pointer = {
      x: 0,
      y: 0,
      movementX: 0,
      movementY: 0,
      seen: false,
    };
    let animationFrame = 0;
    let previousTime = performance.now();

    const animateCards = (time: number) => {
      const delta = Math.min(2, Math.max(0.5, (time - previousTime) / 16.667));
      previousTime = time;
      const moveX = Math.max(-18, Math.min(18, pointer.movementX));
      const moveY = Math.max(-18, Math.min(18, pointer.movementY));
      pointer.movementX = 0;
      pointer.movementY = 0;
      let isMoving = false;

      physics.forEach((item) => {
        const bounds = item.card.getBoundingClientRect();
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;

        if (pointer.seen) {
          const normalizedX = (pointer.x - centerX) / (bounds.width * 1.45);
          const normalizedY = (pointer.y - centerY) / (bounds.height * 1.9);
          const distance = Math.hypot(normalizedX, normalizedY);
          const proximity = Math.pow(Math.max(0, 1 - distance), 4) * 0.2;

          item.impulseX += moveX * proximity;
          item.impulseY += moveY * proximity;
        }

        item.impulseX *= Math.pow(0.78, delta);
        item.impulseY *= Math.pow(0.78, delta);
        item.x += item.impulseX * delta;
        item.y += item.impulseY * delta;

        item.springX *= Math.pow(0.72, delta);
        item.springY *= Math.pow(0.72, delta);
        item.springX += -item.x * 0.12 * delta;
        item.springY += -item.y * 0.12 * delta;
        item.x += item.springX * delta;
        item.y += item.springY * delta;

        item.x = Math.max(-4, Math.min(4, item.x));
        item.y = Math.max(-3, Math.min(3, item.y));

        if (Math.abs(item.x) < 0.01) item.x = 0;
        if (Math.abs(item.y) < 0.01) item.y = 0;

        const speed = Math.min(
          1,
          Math.hypot(item.impulseX + item.springX, item.impulseY + item.springY) / 6,
        );
        const rotation = Math.max(-0.8, Math.min(0.8, (item.springX - item.springY) * -0.18));

        item.image?.style.setProperty('--study-x', `${item.x.toFixed(2)}px`);
        item.image?.style.setProperty('--study-y', `${item.y.toFixed(2)}px`);
        item.image?.style.setProperty('--study-rotation', `${rotation.toFixed(2)}deg`);
        item.image?.style.setProperty('--study-stretch', (1 + speed * 0.018).toFixed(3));
        item.image?.style.setProperty('--study-squash', (1 - speed * 0.012).toFixed(3));

        if (
          Math.abs(item.x) > 0.01 ||
          Math.abs(item.y) > 0.01 ||
          Math.abs(item.impulseX) > 0.01 ||
          Math.abs(item.impulseY) > 0.01 ||
          Math.abs(item.springX) > 0.01 ||
          Math.abs(item.springY) > 0.01
        ) {
          isMoving = true;
        }
      });

      if (pointer.seen || isMoving) {
        animationFrame = window.requestAnimationFrame(animateCards);
      } else {
        animationFrame = 0;
      }
    };

    const requestFrame = () => {
      if (animationFrame) return;
      previousTime = performance.now();
      animationFrame = window.requestAnimationFrame(animateCards);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (pointer.seen) {
        pointer.movementX += event.clientX - pointer.x;
        pointer.movementY += event.clientY - pointer.y;
      }
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.seen = true;
      requestFrame();
    };

    const handlePointerLeave = () => {
      pointer.seen = false;
      pointer.movementX = 0;
      pointer.movementY = 0;
      requestFrame();
    };

    strip.addEventListener('pointermove', handlePointerMove, { passive: true });
    strip.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      strip.removeEventListener('pointermove', handlePointerMove);
      strip.removeEventListener('pointerleave', handlePointerLeave);
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

        <section className={styles.homeIntro} aria-labelledby="home-intro-title">
          <div className={styles.homeIntroMeta}>
            <p className={styles.homeIntroLocation}>Based in Shanghai</p>
            <p className={styles.homeIntroRole}>AI Builder · Creative Technologist</p>
          </div>
          <h2 id="home-intro-title">
            <span>Building useful products with AI.</span>
            <span>Creative technology, applied.</span>
          </h2>
          <p className={styles.homeIntroText}>
            I turn real user and creator-workflow problems into working AI products and interactive prototypes.
          </p>
          <p className={styles.trustLine}>Hackathon Winner · OpenAI Build Week · AWE USA Presenter</p>
        </section>

        <aside className={styles.studyBlock} aria-label="Portfolio image highlights">
          <div ref={studyStripRef} className={styles.studyStrip} aria-label="Portfolio image highlights">
            {studyStripRows.map((row, rowIndex) => (
              <div className={styles.studyStripRow} key={rowIndex}>
                <div
                  className={`${styles.studyStripTrack} ${
                    rowIndex === 1 ? styles.studyStripTrackReverse : ''
                  }`}
                >
                  {[0, 1].map((copyIndex) => (
                    <div
                      className={styles.studyStripSet}
                      key={copyIndex}
                      aria-hidden={copyIndex === 1}
                    >
                      {row.map((item) => (
                        <Link
                          className={styles.studyStripItem}
                          key={`${copyIndex}-${item.id}`}
                          href={getPostPageRoute(item.projectId)}
                          aria-label={`View ${item.alt}`}
                          tabIndex={copyIndex === 1 ? -1 : undefined}
                          data-study-card
                        >
                          <img
                            src={getPublicAssetUrl(item.src)}
                            alt={item.alt}
                            draggable={false}
                            data-study-card-image
                          />
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className={styles.studyNote}>
            <span>Portfolio study</span>
            <span>01 / 26</span>
          </p>
        </aside>

        <section className={styles.glassStage} aria-label="Selected portfolio projects">
          <aside
            className={`${styles.projectPreview} ${activeProject ? styles.projectPreviewVisible : ''} ${
              activeProject?.id === 'post-4' ? styles.projectPreviewCompact : ''
            }`}
            aria-live="polite"
            aria-hidden={!activeProject}
          >
            <span className={styles.projectPreviewLine} aria-hidden="true" />
            <p className={styles.projectPreviewCategory}>
              {activeProject?.cardDescription ?? ''}
            </p>
            <h2 className={styles.projectPreviewTitle}>{activeProject?.title ?? ''}</h2>
          </aside>

          <div
            className={`${styles.glassPanel} ${activeView === 'creative-technologist' ? styles.glassPanelCreative : ''}`}
            ref={panelRef}
          >
            <div className={styles.glassShine} aria-hidden="true" />

            <header className={styles.glassHeader}>
              <div className={styles.headerMain}>
                <div className={`${styles.identityColumn} ${activeViewOption.colorClass}`}>
                  <div className={styles.identitySwitcher} aria-label="Filter projects by identity">
                    <button
                      type="button"
                      className={`${styles.featuredButton} ${activeView === 'featured' ? styles.featuredButtonActive : ''}`}
                      aria-pressed={activeView === 'featured'}
                      aria-controls="identity-description project-gallery"
                      onClick={() => handleViewChange('featured')}
                    >
                      Featured
                    </button>
                    {identityOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        className={`${styles.identityButton} ${option.colorClass} ${activeView === option.id ? styles.identityButtonActive : ''}`}
                        aria-pressed={activeView === option.id}
                        aria-controls="identity-description project-gallery"
                        onClick={() => handleViewChange(option.id)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <div className={styles.headerLowerRow}>
                    <div className={styles.headerCopy}>
                      <h1>Siming Wang</h1>
                    </div>
                    <p
                      id="identity-description"
                      key={activeView}
                      className={styles.identityDescription}
                      aria-live="polite"
                    >
                      {activeViewOption.description}
                    </p>
                  </div>
                </div>
              </div>
              <p className={styles.edition} aria-label="Portfolio edition 2026">@26</p>
            </header>

            <div
              id="project-gallery"
              className={`${styles.projectGallery} ${activeView === 'creative-technologist' ? styles.projectGalleryCreative : ''}`}
            >
              <div
                className={`${styles.projectGrid} ${
                  activeView === 'featured'
                    ? styles.projectGridFeatured
                    : activeView === 'builder'
                      ? styles.projectGridBuilder
                      : styles.projectGridCreative
                }`}
                aria-label={`${activeViewOption.label} project gallery`}
              >
                {displayedProjects.map((post, index) => {
                  const presentation = projectPresentation[post.id];
                  const isComingSoon = post.status === 'coming-soon';
                  const mediaClass = presentation?.mediaAspect === 'portrait'
                    ? styles.projectCardPortrait
                    : styles.projectCardLandscape;
                  const fullImageClass = presentation?.showFullImage
                    ? styles.projectCardFullImage
                    : '';
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
                          src={getPublicAssetUrl(post.aboutThumbnail ?? post.thumbnail)}
                          alt=""
                          loading={index === 0 ? 'eager' : 'lazy'}
                        />
                      )}
                      <span className={styles.projectVeil} aria-hidden="true" />
                      <span className={styles.projectContent}>
                        <span className={styles.projectTitle} aria-label={post.title}>
                          {post.id === 'post-10' ? (
                            <>
                              <span aria-hidden="true">Could</span>
                              <br aria-hidden="true" />
                              <span aria-hidden="true">’ve</span>
                            </>
                          ) : post.title}
                        </span>
                      </span>
                    </>
                  );

                  if (isComingSoon) {
                    return (
                      <article
                        key={post.id}
                        data-project-id={post.id}
                        className={`${styles.projectCard} ${styles.projectPlaceholder} ${mediaClass} ${fullImageClass}`}
                        aria-label={`${String(index + 1).padStart(2, '0')}. ${post.title}, Coming Soon`}
                      >
                        {cardContent}
                      </article>
                    );
                  }

                  return (
                    <Link
                      key={post.id}
                      data-project-id={post.id}
                      href={getPostPageRoute(post.id)}
                      className={`${styles.projectCard} ${mediaClass} ${fullImageClass}`}
                      style={{ '--image-position': presentation?.imagePosition ?? 'center' } as CSSProperties}
                      aria-label={`${String(index + 1).padStart(2, '0')}. ${post.title}, ${post.cardDescription ?? ''}`}
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

              {activeView === 'creative-technologist' && aiFilmProject && (
                <section className={styles.aiFilmSection} aria-labelledby="ai-film-ads-title">
                  <div className={styles.aiFilmHeader}>
                    <div>
                      <span className={styles.aiFilmEyebrow}>New section</span>
                      <h2 id="ai-film-ads-title">AI film / Ads</h2>
                    </div>
                  </div>
                  <Link
                    href={getPostPageRoute(aiFilmProject.id)}
                    className={styles.aiFilmOngoingCard}
                    aria-label={`Open ${aiFilmProject.title}, ${aiFilmProject.subtitle}, an ongoing project`}
                    onMouseEnter={() => setActiveProject(aiFilmProject)}
                    onMouseLeave={(event) => {
                      if (event.currentTarget !== document.activeElement) setActiveProject(null);
                    }}
                    onFocus={() => setActiveProject(aiFilmProject)}
                    onBlur={() => setActiveProject(null)}
                  >
                    <img
                      className={styles.aiFilmProjectImage}
                      src={getPublicAssetUrl(aiFilmProject.thumbnail)}
                      alt=""
                      loading="lazy"
                    />
                    <span className={styles.aiFilmProjectCopy}>
                      <span>{aiFilmProject.title}</span>
                    </span>
                  </Link>
                </section>
              )}
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
