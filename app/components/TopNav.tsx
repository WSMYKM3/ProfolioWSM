'use client';

import Link from 'next/link';

export default function TopNav() {
  return (
    <nav className="top-nav">
      <Link href="/" className="top-nav-link">Work</Link>
      <Link href="/daily-practice" className="top-nav-link">Daily practice</Link>
      <Link href="/about" className="top-nav-link">About Me</Link>
      <Link href="/resume" className="top-nav-link">Resume</Link>
      <Link href="/contact" className="top-nav-link">Contact</Link>
    </nav>
  );
}

