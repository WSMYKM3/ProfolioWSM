'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post, posts } from '@/app/lib/posts';
import SoftwareIcon from './SoftwareIcon';
import Image from 'next/image';
import Post1 from './posts/Post1';
import Post2 from './posts/Post2';
import Post3 from './posts/Post3';
import Post4 from './posts/Post4';
import Post5 from './posts/Post5';
import Post6 from './posts/Post6';
import PostSidebar from './PostSidebar';

const postComponents: Record<string, React.ComponentType> = {
  'post-1': Post1,
  'post-2': Post2,
  'post-3': Post3,
  'post-4': Post4,
  'post-5': Post5,
  'post-6': Post6,
};

interface PostDetailViewProps {
  post: Post;
  isPageView?: boolean;
}

function getImageSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}

function convertToEmbedUrl(url: string): string {
  if (!url) return url;
  if (url.includes('/embed/')) return url;
  if (url.includes('youtube.com/watch')) {
    const id = url.split('v=')[1]?.split('&')[0];
    if (id) return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]?.split('?')[0];
    if (id) return `https://www.youtube.com/embed/${id}`;
  }
  return url;
}

// Split a description into ~roughly equal sentence-bounded segments for the
// editorial bouncy intro reveal.
function splitIntoSegments(text: string, count = 2): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((s) => s.trim()).filter(Boolean) || [text];
  // If we don't have enough sentences, fall back to splitting on commas
  let parts = sentences;
  if (parts.length < count) {
    parts = text
      .split(/,(?![^"]*"[^"]*$)/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (parts.length <= count) return parts;
  const perBucket = Math.ceil(parts.length / count);
  const out: string[] = [];
  for (let i = 0; i < parts.length; i += perBucket) {
    const joined = parts
      .slice(i, i + perBucket)
      .join(', ')
      // Clean up "sentence., sentence" seams left when full sentences (which
      // already end in . ! ?) get joined with a comma separator.
      .replace(/([.!?])\s*,\s*/g, '$1 ')
      .replace(/\s{2,}/g, ' ');
    out.push(joined);
  }
  return out;
}

// Trim a segment down to a short, single-line-ish summary so the Intro
// section reads as a quick pull-quote rather than the full project writeup.
function summarizeSegment(text: string, limit = 130): string {
  const trimmed = text.trim();
  if (trimmed.length <= limit) return trimmed;
  const cut = trimmed.slice(0, limit);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trim() + '…';
}

// One key phrase per project to underline in the Intro section. Matched
// case-insensitively against the (already summarized) segment text — if the
// phrase got trimmed off by summarizeSegment, it's simply not highlighted.
const INTRO_HIGHLIGHTS: Record<string, string> = {
  'post-1': 'no more repeated conversation',
  'post-2': 'hand tracking, micro-gestures, and AI feedback',
  'post-3': 'human–AI intimacy',
  'post-4': 'motion capture and Metahuman animation',
  'post-5': 'AI assistant',
  'post-6': 'elemental counter system',
};

// Wrap the project's key phrase in <em> (rendered as an underline via CSS)
// wherever it appears in the given segment text.
function renderWithHighlight(segment: string, phrase?: string): React.ReactNode {
  if (!phrase) return segment;
  const idx = segment.toLowerCase().indexOf(phrase.toLowerCase());
  if (idx === -1) return segment;
  const before = segment.slice(0, idx);
  const match = segment.slice(idx, idx + phrase.length);
  const after = segment.slice(idx + phrase.length);
  return (
    <>
      {before}
      <em>{match}</em>
      {after}
    </>
  );
}

function projectKicker(post: Post, idx: number): string {
  const num = String(idx + 1).padStart(2, '0');
  const tagPart = post.tags
    ?.filter((t) => t !== 'featured')
    .slice(0, 2)
    .map((t) => t.toUpperCase())
    .join(' · ');
  return tagPart ? `PROJECT ${num} — ${tagPart}` : `PROJECT ${num}`;
}

export default function PostDetailView({ post, isPageView = false }: PostDetailViewProps) {
  const rawVideoUrl = post.videoUrl || (post.videoUrls && post.videoUrls.length > 0 ? post.videoUrls[0] : null);
  const videoUrl = rawVideoUrl ? convertToEmbedUrl(rawVideoUrl) : null;
  const PostContent = postComponents[post.id] || null;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const projectIdx = posts.findIndex((p) => p.id === post.id);
  const kicker = projectKicker(post, projectIdx);

  // Sidebar nav: prepend the project title anchor, then read per-project
  // sections from posts.ts (Post.sections). Insert 'intro' as the second
  // item unless the post already lists 'intro' explicitly at a custom
  // position (e.g. post-4 lists intro after "Videos").
  const getSections = () => {
    const sections = post.sections ?? [];
    const hasIntro = sections.some((s) => s.id === 'intro');
    return [
      { id: 'project-title', label: post.title },
      ...(hasIntro ? [] : [{ id: 'intro', label: 'Intro' }]),
      ...sections,
    ];
  };

  const introSegments = splitIntoSegments(post.description || '', 2).map((s) => summarizeSegment(s));
  const showHeroMedia = post.id !== 'post-4' && post.id !== 'post-5' && post.id !== 'post-6';

  const isDatnie = post.id === 'post-1';

  return (
    <div className={`post-detail-view post-detail-view-page ${isDatnie ? '' : 'post-detail-view--dim-description'}`}>
      {/* ─── HEADER — compact title + meta strip in one block ─── */}
      <section className="ed-hero" id="project-title">
        <svg className="deco" style={{ top: '10%', left: '5%', width: 48, height: 48, color: 'var(--rust)' }}
             data-anim="sticker" data-rest="-12">
          <use href="#squiggle" />
        </svg>
        <svg className="deco" style={{ top: '14%', right: '6%', width: 40, height: 40, color: 'var(--blue-cold)' }}
             data-anim="sticker" data-rest="14">
          <use href="#asterisk" />
        </svg>

        <div className="ed-hero__inner">
          <span className="ed-kicker ed-hero__kicker" data-anim="slide-up">{kicker}</span>
          <h1 className="ed-hero__mark" data-scrub-mark>{post.title}</h1>
          {post.description && (
            <p className="ed-hero__tag" data-split>{post.description.split('.')[0]}.</p>
          )}
        </div>

        {/* ─── META STRIP — four hairline columns, merged into the same header ─── */}
        <div className="ed-meta">
          <div className="ed-meta__col" data-anim="slide-up">
            <span className="ed-meta__label">Role</span>
            <p className="ed-meta__value">{post.role || 'Creative Technologist'}</p>
          </div>
          <div className="ed-meta__col" data-anim="slide-up">
            <span className="ed-meta__label">Timeline</span>
            <p className="ed-meta__value">{post.date}</p>
          </div>
          <div className="ed-meta__col" data-anim="slide-up">
            <span className="ed-meta__label">Tools</span>
            <div className="ed-meta__value ed-meta__tools">
              {post.softwareTools?.map((tool) => (
                <SoftwareIcon key={tool} name={tool} size={26} />
              ))}
            </div>
          </div>
          {post.features && post.features.length > 0 && (
            <div className="ed-meta__col" data-anim="slide-up">
              <span className="ed-meta__label">Features</span>
              <div className="ed-meta__value ed-meta__features">
                {post.features.map((f) => (
                  <span key={f} className="ed-meta__feature">{f}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── HERO MEDIA (polaroid frame for video/thumb) ─── */}
      {showHeroMedia && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '0 var(--ed-pad)',
            marginBottom: 40,
            marginTop: 40,
            position: 'relative',
          }}
        >
          <figure
            className="photo photo--tilt-l"
            data-anim="rotate-in"
            style={{ width: 'min(820px, 92%)' }}
          >
            <div className="photo__frame">
              {videoUrl ? (
                videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
                  <iframe
                    src={videoUrl}
                    title={post.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video src={videoUrl} controls autoPlay muted loop />
                )
              ) : (
                <Image src={getImageSrc(post.thumbnail)} alt={post.title} fill style={{ objectFit: 'cover' }} />
              )}
            </div>
            <figcaption className="photo__caption">{post.videoTitle || post.title}</figcaption>
          </figure>
        </div>
      )}

      {/* ─── post-4's special two-video block ─── */}
      {post.id === 'post-4' && (
        <section id="videos" className="ed-section">
          <span className="ed-kicker">SCREENINGS</span>
          <h2 className="ed-section__title">Videos</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr',
              gap: isMobile ? 24 : 40,
              alignItems: 'center',
            }}
          >
            <figure className="photo photo--tilt-l">
              <div className="photo__frame">
                <iframe
                  src={convertToEmbedUrl('https://www.youtube.com/watch?v=J0UV4jHnues')}
                  title="Behind the scenes"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <figcaption className="photo__caption">Behind the scenes</figcaption>
            </figure>
            <figure className="photo photo--tilt-r">
              <div className="photo__frame">
                <iframe
                  src={convertToEmbedUrl('https://www.youtube.com/watch?v=f7mk4TVj1jA')}
                  title="Full length video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <figcaption className="photo__caption">Full length video</figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* ─── BODY: sidebar + main ─── */}
      <div
        style={{
          display: 'flex',
          maxWidth: 'var(--ed-max)',
          margin: '0 auto',
          padding: '0 var(--ed-pad)',
          position: 'relative',
        }}
      >
        {!isMobile && (
          <div className="ed-sidebar-wrap">
            <PostSidebar sections={getSections()} isPageView={isPageView} />
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Post-2 special: two side-by-side videos before intro */}
          {post.id === 'post-2' && post.videoUrls && post.videoUrls.length >= 2 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: 32,
                margin: '60px 0',
              }}
            >
              {post.videoUrls.slice(0, 2).map((u, idx) => {
                const embed = convertToEmbedUrl(u);
                const t = post.videoTitles?.[idx] || `${post.title} Video ${idx + 1}`;
                const tilt = idx % 2 === 0 ? 'photo--tilt-l' : 'photo--tilt-r';
                return (
                  <figure key={idx} className={`photo ${tilt}`} data-anim="slide-up">
                    <div className="photo__frame">
                      {embed && (
                        <iframe
                          src={embed}
                          title={t}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )}
                    </div>
                    <figcaption className="photo__caption">{t}</figcaption>
                  </figure>
                );
              })}
            </div>
          )}

          {/* Intro — short summarized reveal with one underlined key phrase */}
          {post.id !== 'post-6' && post.description && (
            <section id="intro" className="ed-intro">
              <span className="ed-kicker ed-kicker--rust" style={{ marginBottom: 20, display: 'block' }}>
                INTRO
              </span>
              {introSegments.map((segment, idx) => (
                <p key={idx} className="ed-intro__body" data-split-lines>
                  {renderWithHighlight(segment, INTRO_HIGHLIGHTS[post.id])}
                </p>
              ))}
            </section>
          )}

          {PostContent && (
            <div>
              <PostContent />
            </div>
          )}
        </div>
      </div>

      {/* ─── EXPLORE MORE ─── */}
      {isPageView &&
        (() => {
          const currentIndex = posts.findIndex((p) => p.id === post.id);
          const otherPosts = posts
            .filter((p) => p.id !== post.id)
            .slice(currentIndex)
            .concat(posts.filter((p) => p.id !== post.id).slice(0, currentIndex))
            .slice(0, 3);
          if (otherPosts.length === 0) return null;
          return (
            <section className="ed-explore">
              <div className="ed-explore__kicker">
                <span className="ed-kicker">MORE WORK ↓</span>
              </div>
              <h2 className="ed-explore__title">Explore more</h2>
              <div className="ed-explore__grid">
                {otherPosts.map((p) => (
                  <Link key={p.id} href={`/projects/${p.id}`} className="ed-explore__item">
                    <figure className="photo">
                      <div className="photo__frame">
                        <Image
                          src={getImageSrc(p.thumbnail)}
                          alt={p.title}
                          fill
                          loading="lazy"
                          sizes="(max-width: 900px) 100vw, 33vw"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <figcaption className="photo__caption">{p.title}</figcaption>
                    </figure>
                    {(() => {
                      const cat = p.tags?.find((t) => t.toLowerCase() !== 'featured');
                      return cat ? <span className="ed-explore__kicker-line">{cat.toUpperCase()}</span> : null;
                    })()}
                    <h3 className="ed-explore__name">{p.title}</h3>
                    {p.description && <p className="ed-explore__desc">{p.description}</p>}
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}
    </div>
  );
}
