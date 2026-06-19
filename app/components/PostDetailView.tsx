'use client';

import { useState, useEffect } from 'react';
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
function splitIntoSegments(text: string, count = 3): string[] {
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
    out.push(parts.slice(i, i + perBucket).join(', '));
  }
  return out;
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

  const getSections = () => {
    const baseSections = [
      { id: 'project-title', label: post.title },
      { id: 'intro', label: 'Intro' },
    ];
    if (post.id === 'post-1') {
      return [
        ...baseSections,
        { id: 'ideation', label: 'Ideation' },
        { id: 'ux-design', label: 'UX Design' },
        {
          id: 'prototype',
          label: 'Prototype',
          subsections: [
            { id: 'animation-trailer', label: 'Animation Trailer' },
            { id: 'prototype-stage1', label: 'Stage 1 — UE Production' },
            { id: 'prototype-stage2', label: 'Stage 2 — Unity Development' },
          ],
        },
      ];
    }
    if (post.id === 'post-2') {
      return [
        ...baseSections,
        { id: 'ideation', label: 'Ideation' },
        {
          id: 'process',
          label: 'Process',
          subsections: [
            { id: 'process-stage1', label: 'Stage 1' },
            { id: 'process-stage2', label: 'Stage 2' },
            { id: 'process-stage3', label: 'Stage 3' },
          ],
        },
        { id: 'contributions', label: 'My Contributions' },
      ];
    }
    if (post.id === 'post-3') {
      return [
        ...baseSections,
        { id: 'achievement', label: 'Achievement' },
        { id: 'tools', label: 'Tools' },
        { id: 'installation-draft', label: 'Installation Draft' },
        {
          id: 'process',
          label: 'Process',
          subsections: [
            { id: 'process-stage1', label: 'Stage 1' },
            { id: 'process-stage2', label: 'Stage 2' },
            { id: 'process-stage3', label: 'Stage 3' },
            { id: 'process-stage4', label: 'Stage 4' },
          ],
        },
        { id: 'contributions', label: 'My Contributions', subsections: [{ id: 'live-scene', label: 'Live Scene' }] },
      ];
    }
    if (post.id === 'post-4') {
      return [
        { id: 'project-title', label: post.title },
        { id: 'videos', label: 'Videos' },
        { id: 'intro', label: 'Intro' },
        { id: 'tools', label: 'Tools' },
        { id: 'motion-capture', label: 'Motion Capture' },
        { id: 'metahuman', label: 'Metahuman' },
      ];
    }
    if (post.id === 'post-5') {
      return [
        ...baseSections,
        { id: 'video', label: 'Video' },
        { id: 'ideation', label: 'Ideation' },
        { id: 'stage1', label: 'Stage 1 — XR' },
        { id: 'stage2', label: 'Stage 2 — AI Assistant' },
      ];
    }
    if (post.id === 'post-6') {
      return [
        ...baseSections,
        { id: 'video', label: 'Video' },
        { id: 'introduction', label: 'Introduction' },
        {
          id: 'game-design',
          label: 'Game Design',
          subsections: [
            { id: 'technical-solution', label: '1.1 Technical solution' },
            { id: 'enemies-weapons', label: '1.2 Enemies & weapons' },
          ],
        },
        {
          id: 'my-prototype',
          label: 'My Prototype',
          subsections: [
            { id: 'ragdoll-scripts', label: '1.1 Ragdoll scripts' },
            { id: 'double-damage', label: '1.2 Double damage' },
            { id: 'shield-parts', label: '1.3 Shield parts' },
            { id: 'gamemanager', label: '1.4 GameManager' },
          ],
        },
      ];
    }
    return baseSections;
  };

  const introSegments = splitIntoSegments(post.description || '', 3);
  const showHeroMedia = post.id !== 'post-4' && post.id !== 'post-5' && post.id !== 'post-6';

  const isDatnie = post.id === 'post-1';

  return (
    <div className={`post-detail-view post-detail-view-page ${isDatnie ? '' : 'post-detail-view--dim-description'}`}>
      {/* ─── HERO ─── */}
      <section className="ed-hero" id="project-title">
        <svg className="deco" style={{ top: '14%', left: '6%', width: 64, height: 64, color: 'var(--rust)' }}
             data-anim="sticker" data-rest="-12">
          <use href="#squiggle" />
        </svg>
        <svg className="deco" style={{ top: '22%', right: '8%', width: 52, height: 52, color: 'var(--blue-cold)' }}
             data-anim="sticker" data-rest="14">
          <use href="#asterisk" />
        </svg>
        <svg className="deco" style={{ bottom: '12%', right: '14%', width: 56, height: 56, color: 'var(--olive)' }}
             data-anim="sticker" data-rest="-8">
          <use href="#star-sm" />
        </svg>

        <div className="ed-hero__inner">
          <span className="ed-kicker ed-hero__kicker" data-anim="slide-up">{kicker}</span>
          <h1 className="ed-hero__mark" data-scrub-mark>{post.title}</h1>
          {post.description && (
            <p className="ed-hero__tag" data-split>{post.description.split('.')[0]}.</p>
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

      {/* ─── META STRIP — four hairline columns ─── */}
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

          {/* Intro — segmented bouncy reveal */}
          {post.id !== 'post-6' && post.description && (
            <section id="intro" className="ed-intro">
              <span className="ed-kicker ed-kicker--rust" style={{ marginBottom: 20, display: 'block' }}>
                INTRO
              </span>
              {introSegments.map((segment, idx) => (
                <p key={idx} className="ed-intro__body" data-split-lines>
                  {post.id === 'post-1' && segment.includes('no more repeated conversation') ? (
                    segment.split('no more repeated conversation').map((part, i, arr) =>
                      i === arr.length - 1 ? (
                        part
                      ) : (
                        <span key={i}>
                          {part}
                          <em>no more repeated conversation</em>
                        </span>
                      )
                    )
                  ) : (
                    segment
                  )}
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
