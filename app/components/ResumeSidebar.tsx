'use client';

import { useState, useEffect, useRef } from 'react';

interface Section {
  id: string;
  label: string;
}

interface ResumeSidebarProps {
  sections: Section[];
}

// Helper function to add basePath for GitHub Pages
// Uses runtime detection to work correctly in both dev and production
function getFileSrc(src: string): string {
  // If it's already a full URL (http/https), return as is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  // Detect basePath from current location (runtime detection)
  // This works correctly in both development and GitHub Pages
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    const basePath = pathname.startsWith('/ProfolioWSM') ? '/ProfolioWSM' : '';
    return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
  }
  // Fallback for SSR (shouldn't happen in static export, but safe fallback)
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}

export default function ResumeSidebar({ sections }: ResumeSidebarProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Create Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: '-120px 0px -60% 0px', // Trigger when section is near the top (accounting for sticky header)
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    observerRef.current = new IntersectionObserver((entries) => {
      // Find all intersecting sections
      const intersectingSections = entries
        .filter(entry => entry.isIntersecting)
        .map(entry => ({
          id: entry.target.id,
          top: entry.boundingClientRect.top,
          ratio: entry.intersectionRatio,
          bottom: entry.boundingClientRect.bottom,
          height: entry.boundingClientRect.height
        }));

      if (intersectingSections.length > 0) {
        // Find the section that's closest to the top of the viewport (within the trigger zone)
        const triggerZoneTop = 120; // Top offset for sticky header
        const triggerZoneBottom = window.innerHeight * 0.4; // 40% from top
        
        // Sort by proximity to trigger zone top
        intersectingSections.sort((a, b) => {
          const aInZone = a.top >= triggerZoneTop && a.top <= triggerZoneBottom;
          const bInZone = b.top >= triggerZoneTop && b.top <= triggerZoneBottom;
          
          if (aInZone && !bInZone) return -1;
          if (!aInZone && bInZone) return 1;
          
          // Both in zone or both out - prefer the one closer to trigger zone top
          const aDistance = Math.abs(a.top - triggerZoneTop);
          const bDistance = Math.abs(b.top - triggerZoneTop);
          
          return aDistance - bDistance;
        });
        
        setActiveSection(intersectingSections[0].id);
      } else {
        // No sections intersecting - find the one that just passed above the viewport
        const allEntries = Array.from(entries);
        const aboveViewport = allEntries
          .filter(entry => entry.boundingClientRect.bottom < 150)
          .map(entry => ({
            id: entry.target.id,
            bottom: entry.boundingClientRect.bottom
          }))
          .sort((a, b) => b.bottom - a.bottom); // Closest to top
        
        if (aboveViewport.length > 0) {
          setActiveSection(aboveViewport[0].id);
        }
      }
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        sectionRefs.current.set(section.id, element);
        observerRef.current?.observe(element);
      }
    });

    // Set initial active section
    const firstSection = sections[0];
    if (firstSection) {
      setActiveSection(firstSection.id);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sections, isMobile]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Use scrollIntoView which respects scroll-margin-top CSS property
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (isMobile) {
    return null;
  }

  return (
    <aside className="resume-sidebar">
      <nav className="resume-sidebar-nav">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleClick(section.id)}
            className={`resume-sidebar-item ${activeSection === section.id ? 'active' : ''}`}
          >
            {activeSection === section.id && (
              <span className="resume-sidebar-indicator" />
            )}
            {section.label}
          </button>
        ))}
      </nav>
      <div className="resume-sidebar-download">
        <a 
          href={getFileSrc("/Siming_Wang_Creative_Technologist_XR_Resume.pdf")} 
          download
          className="resume-sidebar-download-button"
        >
          Download Resume
        </a>
      </div>
    </aside>
  );
}
