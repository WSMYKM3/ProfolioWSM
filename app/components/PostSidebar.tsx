'use client';

import { useEffect, useState } from 'react';

interface Section {
  id: string;
  label: string;
  subsections?: { id: string; label: string }[];
}

interface PostSidebarProps {
  sections: Section[];
  isPageView?: boolean;
  variant?: 'panel' | 'rail';
}

export default function PostSidebar({
  sections,
  isPageView = false,
  variant = 'panel',
}: PostSidebarProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionKey = sections
    .flatMap((section) => [section.id, ...(section.subsections?.map((subsection) => subsection.id) ?? [])])
    .join('|');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= (variant === 'rail' ? 900 : 768));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [variant]);

  useEffect(() => {
    if (isMobile || sections.length === 0) return;

    setActiveSection(sections[0].id);

    if (variant === 'rail') {
      const scroller = document.querySelector<HTMLElement>('.project-detail-main');
      const targets = sections
        .map((section) => ({ section, element: document.getElementById(section.id) }))
        .filter((item): item is { section: Section; element: HTMLElement } => Boolean(item.element));

      if (targets.length === 0) return;

      let animationFrame = 0;
      const updateActiveSection = () => {
        animationFrame = 0;
        const rootRect = scroller?.getBoundingClientRect() ?? {
          top: 0,
          height: window.innerHeight,
        };
        const activationY = rootRect.top + rootRect.height * 0.28;
        let nextActive = targets[0].section.id;

        for (const target of targets) {
          if (target.element.getBoundingClientRect().top <= activationY) {
            nextActive = target.section.id;
          } else {
            break;
          }
        }

        setActiveSection((current) => (current === nextActive ? current : nextActive));
      };

      const queueUpdate = () => {
        if (animationFrame) return;
        animationFrame = window.requestAnimationFrame(updateActiveSection);
      };

      const scrollTarget: HTMLElement | Window = scroller ?? window;
      scrollTarget.addEventListener('scroll', queueUpdate, { passive: true });
      window.addEventListener('resize', queueUpdate);
      updateActiveSection();

      return () => {
        scrollTarget.removeEventListener('scroll', queueUpdate);
        window.removeEventListener('resize', queueUpdate);
        if (animationFrame) window.cancelAnimationFrame(animationFrame);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingSections = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => ({ id: entry.target.id, top: entry.boundingClientRect.top }))
          .sort((a, b) => Math.abs(a.top - 120) - Math.abs(b.top - 120));

        if (intersectingSections[0]) {
          setActiveSection(intersectingSections[0].id);
          return;
        }

        const aboveViewport = entries
          .filter((entry) => entry.boundingClientRect.bottom < 150)
          .map((entry) => ({ id: entry.target.id, bottom: entry.boundingClientRect.bottom }))
          .sort((a, b) => b.bottom - a.bottom);

        if (aboveViewport[0]) setActiveSection(aboveViewport[0].id);
      },
      {
        root: null,
        rootMargin: '-120px 0px -60% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);

      section.subsections?.forEach((subsection) => {
        const subElement = document.getElementById(subsection.id);
        if (subElement) observer.observe(subElement);
      });
    });

    return () => observer.disconnect();
    // sectionKey tracks meaningful navigation changes without rerunning this
    // effect for a freshly allocated but otherwise identical sections array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionKey, isMobile, variant]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  if (isMobile) return null;

  if (variant === 'rail') {
    return (
      <aside className="project-chapter-rail">
        <nav className="project-chapter-rail__nav" aria-label="Project chapters">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                type="button"
                className="project-chapter-rail__item"
                aria-label={`Go to ${section.label}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => handleClick(section.id)}
              >
                <span className="project-chapter-rail__tick" aria-hidden="true" />
                <span className="project-chapter-rail__label">{section.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    );
  }

  return (
    <aside
      style={{
        width: '220px',
        paddingRight: '32px',
        paddingTop: '20px',
        flexShrink: 0,
        ...(isPageView
          ? {
              position: 'fixed',
              top: '50%',
              left: '40px',
              transform: 'translateY(-50%)',
              maxHeight: 'calc(100vh - 40px)',
              overflowY: 'auto',
              zIndex: 50,
            }
          : {}),
      }}
    >
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                fontFamily: 'var(--font-inter), sans-serif',
              }}
              onMouseEnter={(event) => {
                if (activeSection !== section.id) {
                  event.currentTarget.style.color = '#d0d0d0';
                  event.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                }
              }}
              onMouseLeave={(event) => {
                if (activeSection !== section.id) {
                  event.currentTarget.style.color = '#b0b0b0';
                  event.currentTarget.style.backgroundColor = 'transparent';
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
                    borderRadius: '0 2px 2px 0',
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
                  gap: '4px',
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
                      fontFamily: 'var(--font-inter), sans-serif',
                    }}
                    onMouseEnter={(event) => {
                      if (activeSection !== subsection.id) {
                        event.currentTarget.style.color = '#b0b0b0';
                        event.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                      }
                    }}
                    onMouseLeave={(event) => {
                      if (activeSection !== subsection.id) {
                        event.currentTarget.style.color = '#888';
                        event.currentTarget.style.backgroundColor = 'transparent';
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
                          borderRadius: '0 1px 1px 0',
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
