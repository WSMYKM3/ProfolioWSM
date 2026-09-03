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
import Post7 from './posts/Post7';
import Post8 from './posts/Post8';
import Post9 from './posts/Post9';
import Post10 from './posts/Post10';
import PostSidebar from './PostSidebar';

const postComponents: Record<string, React.ComponentType> = {
  'post-1': Post1,
  'post-2': Post2,
  'post-3': Post3,
  'post-4': Post4,
  'post-5': Post5,
  'post-6': Post6,
  'post-7': Post7,
  'post-8': Post8,
  'post-9': Post9,
  'post-10': Post10,
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
  if (url.includes('player.bilibili.com/')) return url;
  if (url.includes('bilibili.com/video/')) {
    const bvid = url.match(/\/video\/(BV[a-zA-Z0-9]+)/)?.[1];
    if (bvid) {
      return `https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0&autoplay=0`;
    }
  }
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

function isIframeVideoUrl(url: string): boolean {
  return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('player.bilibili.com');
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
  'post-7': 'object edits, camera movement, and spoken direction',
  'post-8': 'multiple SO-101 digital twins in parallel',
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

  const isDatnie = post.id === 'post-1';
  const isMirror = post.id === 'post-3';
  const isToolbox = post.id === 'post-5';
  const heroVideoUrl = isMirror
    ? convertToEmbedUrl('https://www.youtube.com/watch?v=D7zAp-WNIjM')
    : videoUrl;
  const hideGeneratedIntro = isDatnie || post.id === 'post-2' || post.id === 'post-4' || isToolbox || post.id === 'post-6' || post.id === 'post-7' || post.id === 'post-8' || post.id === 'post-9' || post.id === 'post-10';
  const showIntro = !hideGeneratedIntro && Boolean(post.description);

  // Sidebar nav: prepend the project title anchor, then read per-project
  // sections from posts.ts (Post.sections). Insert 'intro' as the second
  // item unless the post already lists 'intro' explicitly at a custom
  // position (e.g. post-4 lists intro after "Videos").
  const getSections = () => {
    const sections = post.sections ?? [];
    const hasIntro = sections.some((s) => s.id === 'intro');
    return [
      { id: 'project-title', label: post.title },
      ...(!hasIntro && showIntro ? [{ id: 'intro', label: 'Intro' }] : []),
      ...sections,
    ];
  };

  // The full project page uses only top-level content chapters for its
  // compact progress rail. The modal keeps the complete navigation tree.
  const railSections = (post.sections ?? []).map(({ id, label }) => ({ id, label }));

  const introSegments = splitIntoSegments(post.description || '', 2).map((s) => summarizeSegment(s));
  return (
    <div
      className={`post-detail-view post-detail-view-page ${
        isDatnie ? 'post-detail-view--datnie' : isMirror ? 'post-detail-view--mirror' : 'post-detail-view--dim-description'
      }`}
    >
      {/* ─── HEADER — compact two-column project summary ─── */}
      <section className="ed-hero" id="project-title">
        <div className="ed-hero__layout">
          <div className="ed-hero__summary">
            <h1 className={`ed-hero__mark${post.title.length > 18 ? ' ed-hero__mark--long' : ''}`} data-anim="slide-up">
              {post.title}
            </h1>

            <div className="ed-hero__facts">
              <div className="ed-hero__fact" data-anim="slide-up">
                <span className="ed-meta__label">Role</span>
                <p className="ed-meta__value">{post.role || 'Creative Technologist'}</p>
              </div>
              <div className="ed-hero__fact" data-anim="slide-up">
                <span className="ed-meta__label">Timeline</span>
                <p className="ed-meta__value">{post.date}</p>
              </div>
              {post.softwareTools && post.softwareTools.length > 0 && (
                <div className="ed-hero__fact" data-anim="slide-up">
                  <span className="ed-meta__label">Tools</span>
                  <div className="ed-meta__value ed-meta__tools">
                    {post.softwareTools.map((tool) => (
                      <SoftwareIcon key={tool} name={tool} size={24} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="ed-hero__showcase" data-anim="slide-up">
            <div className="ed-hero__media">
              {post.heroPlaceholder ? (
                <div className="ed-hero__media-placeholder" role="img" aria-label={post.heroPlaceholder}>
                  <span className="ed-hero__media-placeholder-index">
                    {post.id === 'post-9' ? 'FILM / 00' : 'R / 07'}
                  </span>
                  <span className="ed-hero__media-placeholder-mark" aria-hidden="true">▶</span>
                  <span className="ed-hero__media-placeholder-label">{post.heroPlaceholder}</span>
                </div>
              ) : heroVideoUrl ? (
                isIframeVideoUrl(heroVideoUrl) ? (
                  <iframe
                    src={heroVideoUrl}
                    title={post.videoTitle || post.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video src={heroVideoUrl} controls autoPlay muted loop />
                )
              ) : (
                <Image
                  src={getImageSrc(post.thumbnail)}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 68vw"
                  style={{ objectFit: 'cover' }}
                />
              )}
            </div>

            {post.alternateVideoUrl && (
              <a
                className="ed-hero__alternate-video"
                href={post.alternateVideoUrl}
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className="ed-hero__youtube-icon"
                  viewBox="0 0 24 17"
                  aria-hidden="true"
                >
                  <path d="M23.5 2.66A3.02 3.02 0 0 0 21.38.52C19.5 0 12 0 12 0S4.5 0 2.62.52A3.02 3.02 0 0 0 .5 2.66 31.7 31.7 0 0 0 0 8.5a31.7 31.7 0 0 0 .5 5.84 3.02 3.02 0 0 0 2.12 2.14C4.5 17 12 17 12 17s7.5 0 9.38-.52a3.02 3.02 0 0 0 2.12-2.14A31.7 31.7 0 0 0 24 8.5a31.7 31.7 0 0 0-.5-5.84Z" fill="#FF0033" />
                  <path d="m9.6 12.14 6.26-3.64L9.6 4.86v7.28Z" fill="#fff" />
                </svg>
                {post.alternateVideoLabel || 'Watch alternate video'}
                <span aria-hidden="true">↗</span>
              </a>
            )}

            <div className="ed-hero__showcase-footer">
              {post.description && (isDatnie ? (
                <p className="ed-hero__tag">
                  Datnie matches you by learning both your and{' '}
                  <span className="sketch-underline blue">your crush’s vibe from past conversations</span>, so there’s{' '}
                  <span className="sketch-underline orange">no need to repeat yourself.</span>
                </p>
              ) : isToolbox ? (
                <p className="ed-hero__tag">
                  <span className="sketch-underline orange">AI assistant</span> for customer purchasing
                </p>
              ) : (
                <p className="ed-hero__tag">{post.description.split('.')[0]}.</p>
              ))}

              {post.features && post.features.length > 0 && (
                <div className="ed-hero__focus">
                  <span className="ed-meta__label">Focus</span>
                  <div className="ed-meta__features">
                    {post.features.map((feature) => (
                      <span key={feature} className="ed-meta__feature">{feature}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

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
        className="ed-body-layout"
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: 'min(100vw, 1612px)',
          margin: '0 auto',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {!isMobile && (
          <div className={`ed-sidebar-wrap ${isPageView ? 'ed-sidebar-wrap--rail' : 'ed-sidebar-wrap--panel'}`}>
            <PostSidebar
              sections={isPageView ? railSections : getSections()}
              isPageView={isPageView}
              variant={isPageView ? 'rail' : 'panel'}
            />
          </div>
        )}

        <div className="ed-body-content" style={{ flex: 1, minWidth: 0 }}>
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
          {showIntro && (
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
                          src={getImageSrc(p.compactThumbnail ?? p.thumbnail)}
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
