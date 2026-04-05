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
}

export function SketchUnderline({ color, children, path = DEFAULT_PATH }: SketchUnderlineProps) {
  return (
    <span className={`sketch-underline ${color}`}>
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
}
