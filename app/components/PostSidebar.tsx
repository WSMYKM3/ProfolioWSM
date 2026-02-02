'use client';

import { useState, useEffect, useRef } from 'react';

interface Section {
  id: string;
  label: string;
  subsections?: { id: string; label: string }[];
}

interface PostSidebarProps {
  sections: Section[];
  projectTitle?: string;
}

export default function PostSidebar({ sections, projectTitle }: PostSidebarProps) {
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

    // Observe all sections and subsections
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        sectionRefs.current.set(section.id, element);
        observerRef.current?.observe(element);
      }

      // Observe subsections
      section.subsections?.forEach(subsection => {
        const subElement = document.getElementById(subsection.id);
        if (subElement) {
          sectionRefs.current.set(subsection.id, subElement);
          observerRef.current?.observe(subElement);
        }
      });
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
      const offset = 100; // Offset from top
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (isMobile) {
    return null;
  }

  return (
    <aside
      style={{
        width: '220px',
        paddingRight: '32px',
        paddingTop: '20px',
        flexShrink: 0
      }}
    >
      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        {sections.map((section) => (
          <div key={section.id}>
            <button
              onClick={() => handleClick(section.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '8px 12px',
                fontSize: '0.95rem',
                fontWeight: activeSection === section.id ? 600 : 400,
                color: activeSection === section.id ? '#fff' : '#b0b0b0',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '6px',
                transition: 'all 0.2s ease',
                position: 'relative',
                fontFamily: 'var(--font-inter), sans-serif'
              }}
              onMouseEnter={(e) => {
                if (activeSection !== section.id) {
                  e.currentTarget.style.color = '#d0d0d0';
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== section.id) {
                  e.currentTarget.style.color = '#b0b0b0';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {activeSection === section.id && (
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '3px',
                    height: '60%',
                    backgroundColor: '#fff',
                    borderRadius: '0 2px 2px 0'
                  }}
                />
              )}
              {section.label}
            </button>
            {section.subsections && section.subsections.length > 0 && (
              <div
                style={{
                  marginLeft: '16px',
                  marginTop: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                {section.subsections.map((subsection) => (
                  <button
                    key={subsection.id}
                    onClick={() => handleClick(subsection.id)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '6px 12px',
                      fontSize: '0.85rem',
                      fontWeight: activeSection === subsection.id ? 500 : 400,
                      color: activeSection === subsection.id ? '#fff' : '#888',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '6px',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      fontFamily: 'var(--font-inter), sans-serif'
                    }}
                    onMouseEnter={(e) => {
                      if (activeSection !== subsection.id) {
                        e.currentTarget.style.color = '#b0b0b0';
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeSection !== subsection.id) {
                        e.currentTarget.style.color = '#888';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {activeSection === subsection.id && (
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '2px',
                          height: '50%',
                          backgroundColor: '#fff',
                          borderRadius: '0 1px 1px 0'
                        }}
                      />
                    )}
                    {subsection.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}

