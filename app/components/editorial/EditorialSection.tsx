'use client';

import type { CSSProperties, ReactNode } from 'react';

interface EditorialSectionProps {
  id: string;
  /** Small uppercase label above the title. Common values: "CHAPTER 01", "CREDITS", "SHOWREEL". */
  kicker?: string;
  /** Section title in Fraunces italic. */
  title: string;
  /** Rust colour on the kicker for chapter-flagship sections. */
  kickerVariant?: 'default' | 'rust';
  /** Optional scroll-driven entry for the section as a whole. Defaults to `slide-up`. */
  dataAnim?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * Editorial chapter section — kicker + Fraunces italic title + body.
 * Matches Post1's Ideation / UX Design / Prototype chapter pattern.
 */
export default function EditorialSection({
  id,
  kicker,
  title,
  kickerVariant = 'default',
  dataAnim,
  className,
  style,
  children,
}: EditorialSectionProps) {
  return (
    <section
      id={id}
      className={`ed-section${className ? ' ' + className : ''}`}
      style={style}
    >
      {kicker && (
        <span
          className={`ed-kicker${kickerVariant === 'rust' ? ' ed-kicker--rust' : ''}`}
          data-anim={dataAnim ?? 'slide-up'}
        >
          {kicker}
        </span>
      )}
      <h2 className="ed-section__title" data-anim={dataAnim ?? 'slide-up'}>
        {title}
      </h2>
      {children}
    </section>
  );
}
