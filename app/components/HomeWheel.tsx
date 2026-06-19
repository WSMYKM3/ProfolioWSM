'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { posts } from '@/app/lib/posts';
import { getPostPageRoute } from '@/app/lib/navigation';
import { getPublicAssetUrl } from '@/app/lib/publicAsset';

interface HomeWheelProps {
  name?: string; // kept for back-compat; no longer rendered
  tag: string;
}

const CYCLE_COUNT = 12;
const INTRO_FADE_START = 0.06;
const INTRO_FADE_END = 0.12;

const pad = (v: number) => String(v).padStart(2, '0');
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

function getCategory(tags: string[] | undefined): string {
  if (!tags) return '';
  const cat = tags.find((t) => t.toLowerCase() !== 'featured');
  return cat ? cat.toUpperCase() : '';
}

/** Trim a long description down to a short pinned caption. */
function summarize(text: string | undefined, limit = 90): string {
  if (!text) return '';
  // Prefer the first sentence; otherwise hard-cap at `limit` chars on a word boundary.
  const firstSentence = text.match(/[^.!?]+[.!?]/)?.[0]?.trim();
  const candidate = firstSentence ?? text;
  if (candidate.length <= limit) return candidate;
  const cut = candidate.slice(0, limit);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut) + '…';
}

export default function HomeWheel({ tag }: HomeWheelProps) {
  const router = useRouter();

  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const stageCopyRef = useRef<HTMLDivElement | null>(null);
  const kickerRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const captionRef = useRef<HTMLParagraphElement | null>(null);
  const currentIndexRef = useRef<HTMLSpanElement | null>(null);
  const totalIndexRef = useRef<HTMLSpanElement | null>(null);
  const progressBarRef = useRef<HTMLSpanElement | null>(null);
  const wheelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wheel = wheelRef.current;
    const stageCopy = stageCopyRef.current;
    const intro = introRef.current;
    if (!section || !wheel || !stageCopy || !intro) return;

    // Release the global html/body height-100% so the long sticky-wheel section
    // can scroll the document instead of being trapped inside body's overflow.
    document.documentElement.classList.add('home-wheel-active');
    document.body.classList.add('home-wheel-active');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // total counter
    if (totalIndexRef.current) totalIndexRef.current.textContent = pad(posts.length);
    // set scroll length: posts.length * cycleCount * 105vh — controlled by CSS var
    document.documentElement.style.setProperty('--project-count', String(posts.length * CYCLE_COUNT));

    // Build the cards in the DOM directly (no React re-renders during scroll)
    const cards: HTMLElement[] = posts.map((post, index) => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.setAttribute('aria-label', post.title);
      card.dataset.postId = post.id;
      card.tabIndex = 0;
      card.innerHTML = `
        <img src="${getPublicAssetUrl(post.thumbnail)}" alt="" loading="${index < 2 ? 'eager' : 'lazy'}" />
        <div class="project-card__label">
          <span>${pad(index + 1)}</span>
          <span>${getCategory(post.tags)}</span>
        </div>
      `;
      const img = card.querySelector('img');
      img?.addEventListener('error', (e) => {
        (e.currentTarget as HTMLElement).classList.add('is-hidden');
      });
      const navigate = () => {
        router.push(getPostPageRoute(post.id));
      };
      card.addEventListener('click', navigate);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate();
        }
      });
      wheel.appendChild(card);
      return card;
    });

    let activeIndex = -1;
    let ticking = false;

    const updateCopy = (idx: number) => {
      if (idx === activeIndex) return;
      activeIndex = idx;
      const p = posts[idx];
      if (titleRef.current) titleRef.current.textContent = p.title;
      if (kickerRef.current) kickerRef.current.textContent = getCategory(p.tags);
      if (captionRef.current) captionRef.current.textContent = summarize(p.description);
      if (currentIndexRef.current) currentIndexRef.current.textContent = pad(idx + 1);
    };

    const getScrollState = () => {
      const rect = section.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const maxScroll = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = clamp((window.scrollY - top) / maxScroll, 0, 1);
      return { progress };
    };

    const draw = () => {
      ticking = false;
      const { progress: rawProgress } = getScrollState();

      // Both layers stay visible throughout the wheel scroll —
      // intro chip lives permanently in the top-right corner.
      intro.style.opacity = '1';
      intro.style.pointerEvents = 'auto';
      stageCopy.style.opacity = '1';

      const scrollPosition = rawProgress * posts.length * CYCLE_COUNT;
      const position = scrollPosition % posts.length;
      const nextActive = Math.floor(position + 0.5) % posts.length;
      const radiusX = Math.min(window.innerWidth * 0.43, 720);
      const progressInProject = scrollPosition % 1;

      updateCopy(nextActive);
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progressInProject})`;
      }

      cards.forEach((card, index) => {
        const offset = index - position;
        const wrapped = offset - Math.round(offset / posts.length) * posts.length;
        const distance = Math.abs(wrapped);
        const theta = wrapped * 0.82;
        const laneLift = (((index % 3) - 1) * 34) / (distance + 1);
        const x = Math.sin(theta) * radiusX + wrapped * Math.min(window.innerWidth * 0.06, 110);
        const y =
          wrapped * Math.min(window.innerHeight * 0.15, 138) +
          (1 - Math.cos(theta)) * 42 -
          Math.min(window.innerHeight * 0.04, 42) +
          laneLift;
        const scale = clamp(1.02 - distance * 0.11 + (index % 2) * 0.035, 0.66, 1.08);
        const rotate = wrapped * -10 + (index % 2 === 0 ? -2.5 : 2.5);
        const depth = Math.round(100 - distance * 18);
        const opacity = clamp(1.08 - distance * 0.25, 0, 1);
        const blur = distance > 2.6 ? 1.2 : 0;

        card.style.zIndex = String(depth);
        card.style.opacity = opacity.toFixed(3);
        card.style.filter = `saturate(${clamp(1.08 - distance * 0.12, 0.78, 1.08).toFixed(3)}) blur(${blur}px)`;
        card.style.transform = [
          `translate3d(calc(-50% + ${x.toFixed(2)}px), calc(-50% + ${y.toFixed(2)}px), 0)`,
          `rotate(${rotate.toFixed(2)}deg)`,
          `scale(${scale.toFixed(3)})`,
        ].join(' ');
      });
    };

    const requestDraw = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(draw);
    };

    // Reduced motion: render a flat fallback (no transforms, cards stacked
    // top-to-bottom inside the wheel container). Skip scroll listeners.
    if (reduceMotion) {
      wheel.classList.add('reduce-motion');
      // Show the first project's copy by default; intro stays visible too.
      updateCopy(0);
      intro.style.opacity = '1';
      stageCopy.style.opacity = '1';
      return () => {
        cards.forEach((c) => c.remove());
      };
    }

    window.addEventListener('scroll', requestDraw, { passive: true });
    window.addEventListener('resize', requestDraw);
    window.addEventListener('load', requestDraw);
    requestDraw();

    return () => {
      window.removeEventListener('scroll', requestDraw);
      window.removeEventListener('resize', requestDraw);
      window.removeEventListener('load', requestDraw);
      cards.forEach((c) => c.remove());
      document.documentElement.classList.remove('home-wheel-active');
      document.body.classList.remove('home-wheel-active');
    };
  }, [router]);

  return (
    <section
      id="project-wheel"
      className="wheel-section"
      aria-label="Project showcase"
      ref={sectionRef}
    >
      <div className="showcase" ref={stageRef}>
        {/* Intro chip — small block in the top-right corner.
            Fades out as you enter the wheel. */}
        <div className="home-wheel-intro" ref={introRef}>
          <p className="home-wheel-intro__kicker">PORTFOLIO · 2026</p>
          <p className="home-wheel-intro__tag">{tag}</p>
        </div>

        {/* Stage copy — kicker + active project title, crossfades in over the intro */}
        <div className="stage-copy" ref={stageCopyRef} aria-live="polite">
          <p className="project-kicker" ref={kickerRef}>
            {getCategory(posts[0]?.tags)}
          </p>
          <h2 ref={titleRef}>{posts[0]?.title}</h2>
        </div>

        <div className="wheel-shell" aria-hidden="true">
          <div className="orbit-line" />
          <div className="project-wheel" ref={wheelRef} />
        </div>

        {/* Embedded showreel video with two short stand legs below,
            sitting just above the footer's progress line. */}
        <div className="home-wheel-tv" aria-label="Showreel video">
          <iframe
            className="home-wheel-tv__video"
            src="https://www.youtube.com/embed/ThW5sgK06q0?autoplay=1&mute=1&loop=1&playlist=ThW5sgK06q0&playsinline=1&modestbranding=1&rel=0"
            title="Showreel"
            loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
          <svg
            className="home-wheel-tv__stand"
            viewBox="0 0 100 30"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <path d="M 50 1 L 30 29" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M 50 1 L 70 29" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        <div className="project-footer">
          <div className="counter" aria-label="Current project">
            <span ref={currentIndexRef}>01</span>
            <span className="slash">/</span>
            <span ref={totalIndexRef}>{pad(posts.length)}</span>
          </div>
          <div className="progress-track" aria-hidden="true">
            <span ref={progressBarRef} />
          </div>
          <p ref={captionRef}>{summarize(posts[0]?.description)}</p>
        </div>
      </div>
    </section>
  );
}
