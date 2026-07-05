'use client';

import {
  EditorialSection,
  EditorialSubtitle,
  MediaFrame,
  MediaGrid,
  MediaGridItem,
  useImageEnlarger,
  useSketchUnderlineReveal,
  useIsMobile,
} from '../editorial';
import { getPostById } from '@/app/lib/posts';

// YouTube watch URL → embed URL
function convertToEmbedUrl(url: string): string {
  if (!url) return url;
  if (url.includes('/embed/')) return url;
  if (url.includes('youtube.com/watch')) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0];
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
}

const STAGE1_RECORDING_ITEMS: MediaGridItem[] = [
  { path: '/webm/Signie/hand1.webm', description: 'Hand guiding animation', isVideo: true },
  { path: '/webm/Signie/hand2.webm', description: 'Hand guiding animation with customized hand model', isVideo: true },
  { path: '/webm/Signie/fb2.webm', description: 'Full body animation recorded by Meta Quest headset', isVideo: true },
  { path: '/Signiepics/handrecord.png', description: 'I record via Unity recorder + FBX converter, all in Unity' },
];

const STAGE1_BUBBLE_ITEMS: MediaGridItem[] = [
  { path: '/webm/Signie/bubble1.webm', description: 'Bubble guide 1', isVideo: true },
  { path: '/webm/Signie/bubble2.webm', description: 'Bubble guide 2', isVideo: true },
];

const STAGE2_ITEMS: MediaGridItem[] = [
  { path: '/Signiepics/mixwords.png', description: 'Pattern of learning and testing with mixed mechanism' },
  { path: '/Signiepics/manager.jpg', description: 'Manager prefab for learning a new word' },
  { path: '/webm/Signie/learn.webm', description: 'Follow the tutor animation to learn', isVideo: true },
  { path: '/webm/Signie/test1.webm', description: 'Test 1 — Hand gesture test', isVideo: true },
  { path: '/webm/Signie/test2.webm', description: 'Test 2 — Rhythm-game testing of ASL alphabet', isVideo: true },
  { path: '/webm/Signie/test3.webm', description: 'Test 3 — Pick correct lines based on animation played by tutor', isVideo: true },
];

const CONTRIBUTIONS = [
  'make hand interaction of learning process',
  'GameManager which manages the application experience, from learning to playful game testing',
  "add microgesture to integrate Speech-to-Text driving live translation of the tutor's animation",
];

const bodyStyle = {
  fontFamily: 'var(--serif)',
  fontSize: 'clamp(18px, 1.7vw, 22px)',
  lineHeight: 1.7,
  color: 'var(--ink)',
} as const;

const stageNoteStyle = {
  fontFamily: 'var(--serif)',
  fontStyle: 'italic',
  fontSize: 'clamp(15px, 1.3vw, 18px)',
  color: 'var(--shadow-warm)',
  textAlign: 'center' as const,
  marginTop: 24,
  marginBottom: 8,
};

export default function Post2() {
  const isMobile = useIsMobile();
  const { handleImageClick, overlay } = useImageEnlarger();
  useSketchUnderlineReveal();

  const post = getPostById('post-2');
  const stage3VideoUrl = post?.stage3VideoUrl;
  const stage3Embed = stage3VideoUrl ? convertToEmbedUrl(stage3VideoUrl) : '';

  return (
    <>
      {overlay}

      <div className="post-content">
        {/* ─── Ideation ─── */}
        <EditorialSection id="ideation" kicker="CHAPTER 01" title="Ideation" kickerVariant="rust">
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={bodyStyle}>
              Signie is an immersive{' '}
              <span className="sketch-underline orange">
                ASL learning and real-time translation
                <svg viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M 2 5 Q 50 8, 100 4 T 198 6" pathLength="1" /></svg>
              </span>{' '}
              system powered by{' '}
              <span className="sketch-underline blue">
                hand tracking, micro-gestures, and AI feedback
                <svg viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M 3 6 Q 50 2, 95 7 Q 150 3, 197 6" pathLength="1" /></svg>
              </span>
              . It evolved from concept validation to interactive learning experiences, and ultimately to{' '}
              <span className="sketch-underline green">
                AI-glasses-based live translation
                <svg viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M 2 6 Q 45 2, 100 7 T 198 4" pathLength="1" /></svg>
              </span>
              .
            </p>
          </div>
        </EditorialSection>

        {/* ─── Process ─── */}
        <EditorialSection id="process" kicker="CHAPTER 02" title="Process">
          {/* Stage 1 */}
          <EditorialSubtitle id="process-stage1">
            Stage 1 — Prototype: Solve animation of tutors (hand & full body)
          </EditorialSubtitle>
          <p style={stageNoteStyle}>1. record hand-guiding / full-body animation, all in Unity</p>
          <MediaGrid
            items={STAGE1_RECORDING_ITEMS}
            isMobile={isMobile}
            idPrefix="stage1-record"
            onItemClick={handleImageClick}
          />
          <p style={{ ...stageNoteStyle, marginTop: 60 }}>2. add bubbles to guide hand movement</p>
          <MediaGrid
            items={STAGE1_BUBBLE_ITEMS}
            isMobile={isMobile}
            idPrefix="stage1-bubbles"
            onItemClick={handleImageClick}
          />

          {/* Stage 2 */}
          <EditorialSubtitle id="process-stage2" style={{ marginTop: 100 }}>
            Stage 2 — Develop learning and testing function
          </EditorialSubtitle>
          <p style={stageNoteStyle}>1. mix words of different levels of familiarity</p>
          <MediaGrid
            items={STAGE2_ITEMS}
            isMobile={isMobile}
            idPrefix="stage2"
            onItemClick={handleImageClick}
          />

          {/* Stage 3 */}
          <EditorialSubtitle id="process-stage3" style={{ marginTop: 100 }}>
            Stage 3 — AI Glasses: Live ASL Translation
          </EditorialSubtitle>
          <div style={{ maxWidth: 900, margin: '32px auto 40px' }}>
            <p style={{ ...bodyStyle, marginBottom: 16 }}>
              <strong>1. Micro-gesture input for hands-free system control</strong>
            </p>
            <p style={{ ...bodyStyle, marginBottom: 12 }}>
              <strong>Live Translation Pipeline</strong>
            </p>
            <ul
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(17px, 1.5vw, 20px)',
                lineHeight: 1.7,
                color: 'var(--ink)',
                marginLeft: 24,
                paddingLeft: 0,
              }}
            >
              <li style={{ marginBottom: 8 }}>Voice → Text using Wit.ai</li>
              <li>Text → Sign animation via animation state machine</li>
            </ul>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MediaFrame
              src={
                stage3Embed
                  ? `${stage3Embed}?autoplay=1&mute=1&loop=1&playlist=${
                      stage3VideoUrl!.includes('watch?v=')
                        ? stage3VideoUrl!.split('v=')[1]?.split('&')[0]
                        : stage3VideoUrl!.split('/embed/')[1]?.split('?')[0]
                    }`
                  : ''
              }
              alt="Live ASL Translation Demonstration"
              caption="Live ASL Translation Demonstration"
              isYouTube={!!stage3Embed}
              variant="default"
              tilt="right"
              dataAnim="rotate-in"
              width="min(900px, 96%)"
            />
          </div>
        </EditorialSection>

        {/* ─── My Contributions ─── */}
        <EditorialSection id="contributions" kicker="CREDITS" title="My Contributions" kickerVariant="rust">
          <div style={{ maxWidth: 900, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {CONTRIBUTIONS.map((line, index) => (
              <div
                key={index}
                data-anim="slide-up"
                style={{
                  padding: '20px 24px',
                  background: 'var(--bone)',
                  border: '1px solid rgba(26, 20, 13, 0.12)',
                  borderLeft: '4px solid var(--rust)',
                  boxShadow: '4px 5px 0 rgba(26, 20, 13, 0.08)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '1.05rem',
                    lineHeight: 1.6,
                    color: 'var(--ink)',
                    margin: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--sans)',
                      fontWeight: 500,
                      letterSpacing: '0.18em',
                      color: 'var(--rust)',
                      marginRight: 10,
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {line}
                </p>
              </div>
            ))}
          </div>
        </EditorialSection>
      </div>
    </>
  );
}
