'use client';

import { useEffect } from 'react';

type AnimPreset = {
  from: Record<string, number>;
  duration: number;
  ease: string;
};

const PRESETS: Record<string, AnimPreset> = {
  'slide-left':  { from: { x: -260, opacity: 0 }, duration: 1.0, ease: 'power3.out' },
  'slide-right': { from: { x: 260,  opacity: 0 }, duration: 1.0, ease: 'power3.out' },
  'slide-up':    { from: { y: 140,  opacity: 0 }, duration: 0.9, ease: 'power3.out' },
  'slide-down':  { from: { y: -140, opacity: 0 }, duration: 0.9, ease: 'power3.out' },
  'pop':         { from: { scale: 0, opacity: 0 }, duration: 0.75, ease: 'back.out(2.2)' },
  'rotate-in':   { from: { rotation: -55, scale: 0.3, opacity: 0 }, duration: 1.0, ease: 'back.out(1.7)' },
  'sticker':     { from: { y: -220, scale: 1.7, rotation: 30, opacity: 0 }, duration: 0.8, ease: 'back.out(2.5)' },
  'bounce-in':   { from: { y: -180, opacity: 0 }, duration: 1.2, ease: 'bounce.out' },
  'flip':        { from: { rotationX: 100, opacity: 0 }, duration: 0.9, ease: 'back.out(1.5)' },
  'punch':       { from: { scale: 0.25, opacity: 0 }, duration: 1.2, ease: 'elastic.out(1, 0.5)' },
};

export default function EditorialMotion() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let cancelled = false;
    const cleanups: Array<() => void> = [];

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }, SplitTypeMod] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('split-type'),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      // Drive ScrollTrigger off whichever element actually scrolls in this layout
      // (.main-content if the page kept the legacy scroll container, otherwise the document)
      const scroller =
        (document.querySelector('.main-content') as HTMLElement) ||
        document.scrollingElement ||
        document.documentElement;
      ScrollTrigger.defaults({ scroller });
      ScrollTrigger.scrollerProxy(scroller, {
        scrollTop(value) {
          if (arguments.length) (scroller as HTMLElement).scrollTop = value as number;
          return (scroller as HTMLElement).scrollTop;
        },
      });
      const onScroll = () => ScrollTrigger.update();
      scroller.addEventListener('scroll', onScroll, { passive: true });

      const SplitType = (SplitTypeMod as any).default || SplitTypeMod;

      // 1. data-anim presets — one ScrollTrigger per element
      document.querySelectorAll<HTMLElement>('[data-anim]').forEach((el) => {
        const key = el.dataset.anim || '';
        const preset = PRESETS[key];
        if (!preset) return;

        const rest = parseFloat(el.dataset.rest || '0');
        if (rest) gsap.set(el, { rotation: rest });

        gsap.from(el, {
          ...preset.from,
          duration: preset.duration,
          ease: preset.ease,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });

      // 2. data-split — per-word reveal
      document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
        const split = new SplitType(el, { types: 'words' });
        gsap.from(split.words, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'back.out(1.8)',
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        });
      });

      // 3. data-split-lines — bouncy reveal per element
      document.querySelectorAll<HTMLElement>('[data-split-lines]').forEach((el) => {
        const split = new SplitType(el, { types: 'words' });
        // randomize per-word rotation for the cinematic bounce
        split.words?.forEach((w: HTMLElement) => {
          w.style.display = 'inline-block';
          w.style.transformOrigin = 'center bottom';
        });
        gsap.from(split.words, {
          y: 60,
          rotation: () => gsap.utils.random(-12, 12),
          opacity: 0,
          duration: 0.9,
          ease: 'back.out(1.6)',
          stagger: 0.03,
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        });
      });

      // 4. data-scrub-mark — hero wordmark drift
      document.querySelectorAll<HTMLElement>('[data-scrub-mark]').forEach((el) => {
        gsap.to(el, {
          scale: 1.4,
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=600',
            scrub: true,
          },
        });
      });

      // 5. data-spin — continuous slow rotation
      document.querySelectorAll<HTMLElement>('[data-spin]').forEach((el) => {
        const speed = parseFloat(el.dataset.spin || '20'); // degrees per second
        gsap.to(el, { rotation: '+=360', duration: 360 / speed, ease: 'none', repeat: -1 });
      });

      // 6. data-marquee — infinite horizontal loop
      document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((el) => {
        // duplicate inner content so the loop feels seamless
        el.innerHTML = el.innerHTML + el.innerHTML;
        const w = el.scrollWidth / 2;
        gsap.to(el, { x: -w, duration: 30, ease: 'none', repeat: -1 });
      });

      // 7. data-count — number tween
      document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        const target = parseFloat(el.dataset.count || '0');
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toString();
          },
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        });
      });

      ScrollTrigger.refresh();

      cleanups.push(() => {
        scroller.removeEventListener('scroll', onScroll);
        ScrollTrigger.getAll().forEach((t) => t.kill());
      });
    })();

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
