'use client';

import { useEffect } from 'react';

/**
 * Observes every `.sketch-underline` element on the current page and adds
 * the `.drawn` class to its inner `<path>` as it enters the viewport, so
 * the hand-drawn underline animation "draws in" on scroll.
 *
 * Call once at the top of any Post component that uses <SketchUnderline>.
 * Post1 (Datnie) is the reference implementation.
 */
export function useSketchUnderlineReveal() {
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
