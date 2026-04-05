'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';

export type SketchUnderlineColor = 'orange' | 'blue' | 'green' | 'purple' | 'pink';

const DEFAULT_PATH = 'M 2 5 Q 50 8, 100 4 T 198 6';

export interface SketchUnderlineProps {
  color: SketchUnderlineColor;
  children: ReactNode;
  /** SVG path d=... with pathLength="1" normalized stroke; omit for default sketch curve */
  path?: string;
  /** Keep phrase on one line so the SVG underline matches the full word (helps hyphenated terms). */
  nowrap?: boolean;
}

export function SketchUnderline({ color, children, path = DEFAULT_PATH, nowrap }: SketchUnderlineProps) {
  return (
    <span className={`sketch-underline ${color}${nowrap ? ' sketch-underline-nowrap' : ''}`}>
      {children}
      <svg viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden>
        <path d={path} pathLength={1} />
      </svg>
    </span>
  );
}

/** Observe .sketch-underline spans and add .drawn to inner path when they enter the viewport. */
export function useSketchUnderlineAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const path = el.querySelector('path');
            if (path) {
              const delay = parseFloat(el.dataset.delay || '0');
              const applyDrawn = () => {
                // Double rAF: commit initial stroke-dasharray to paint before transitioning to .drawn
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => path.classList.add('drawn'));
                });
              };
              if (delay > 0) {
                setTimeout(applyDrawn, delay * 1000);
              } else {
                applyDrawn();
              }
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: [0, 0.05, 0.1, 0.25], rootMargin: '0px 0px 48px 0px' }
    );

    document.querySelectorAll<HTMLElement>('.sketch-underline').forEach((el, i) => {
      el.dataset.delay = (i * 0.15).toFixed(2);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
