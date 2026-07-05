'use client';

import { useEffect, useState } from 'react';

/**
 * Boolean flag: is the viewport ≤ 768 px wide?
 * Post components use this to swap grid columns / stack layouts.
 * Server-side default is `false`.
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}
