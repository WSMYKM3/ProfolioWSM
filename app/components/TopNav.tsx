'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopNav() {
  const pathname = usePathname();
  
  // Helper function to check if a link is active
  const isActive = (href: string) => {
    if (href === '/') {
      // Work page can be either "/" or "/work"
      return pathname === '/' || pathname === '/work' || pathname.startsWith('/work/');
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <nav className="top-nav">
      <Link 
        href="/" 
        className={`top-nav-link ${isActive('/') ? 'active' : ''}`}
      >
        Work
      </Link>
      <Link 
        href="/daily-practice" 
        className={`top-nav-link ${isActive('/daily-practice') ? 'active' : ''}`}
      >
        Daily practice
      </Link>
      <Link 
        href="/about" 
        className={`top-nav-link ${isActive('/about') ? 'active' : ''}`}
      >
        About Me
      </Link>
      <Link 
        href="/resume" 
        className={`top-nav-link ${isActive('/resume') ? 'active' : ''}`}
      >
        Resume
      </Link>
      <Link 
        href="/contact" 
        className={`top-nav-link ${isActive('/contact') ? 'active' : ''}`}
      >
        Contact
      </Link>
    </nav>
  );
}

