'use client';

import { useEffect } from 'react';

export default function FontLoader() {
  useEffect(() => {
    // Detect basePath from current location
    // If pathname starts with /ProfolioWSM, we're on GitHub Pages
    const pathname = window.location.pathname;
    const basePath = pathname.startsWith('/ProfolioWSM') ? '/ProfolioWSM' : '';
    const fontPath = `${basePath}/font/RotioDemo.otf`;

    // Check if font-face already exists
    const existingStyle = document.getElementById('rotio-font-face');
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create and inject font-face style
    const style = document.createElement('style');
    style.id = 'rotio-font-face';
    style.textContent = `
      @font-face {
        font-family: 'Rotio';
        src: url('${fontPath}') format('opentype');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return null;
}
