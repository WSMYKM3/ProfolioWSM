'use client';

import type { CSSProperties, ReactNode } from 'react';

interface EditorialSubtitleProps {
  id?: string;
  children: ReactNode;
  style?: CSSProperties;
}

/**
 * Stage subheading inside an EditorialSection.
 * Renders `<h3 className="ed-section__subtitle">`.
 */
export default function EditorialSubtitle({ id, children, style }: EditorialSubtitleProps) {
  return (
    <h3
      id={id}
      className="ed-section__subtitle"
      style={{ scrollMarginTop: 100, ...style }}
      data-anim="slide-up"
    >
      {children}
    </h3>
  );
}
