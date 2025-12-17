'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopNav() {
  const pathname = usePathname();
  
  // Helper function to check if a link is active
  const isActive = (href: string) => {
    if (href === '/') {
      // About Me page is the home page
      return pathname === '/';
    }
    if (href === '/work') {
      // Work page can be "/work" or "/work/[slug]"
      return pathname === '/work' || pathname.startsWith('/work/');
    }
    // For other links, check exact match or if pathname starts with the href
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div className="top-nav-wrapper">
      <div className="top-nav-social-icons">
        <a 
          href="https://www.linkedin.com/in/siming-wang-321a18303/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="top-nav-social-icon"
          aria-label="LinkedIn"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="currentColor"/>
          </svg>
        </a>
        <a 
          href="https://www.youtube.com/@WSM-z4j" 
          target="_blank" 
          rel="noopener noreferrer"
          className="top-nav-social-icon"
          aria-label="YouTube"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor"/>
          </svg>
        </a>
      </div>
      <nav className="top-nav">
        <Link 
          href="/" 
          className={`top-nav-link ${isActive('/') ? 'active' : ''}`}
        >
          About Me
        </Link>
        <Link 
          href="/work" 
          className={`top-nav-link ${isActive('/work') ? 'active' : ''}`}
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
    </div>
  );
}

