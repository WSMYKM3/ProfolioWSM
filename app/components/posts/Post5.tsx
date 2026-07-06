'use client';

import {
  EditorialSection,
  MediaFrame,
  MediaGrid,
  MediaGridItem,
  useImageEnlarger,
  useSketchUnderlineReveal,
  useIsMobile,
} from '../editorial';
import { getPublicAssetUrl } from '@/app/lib/publicAsset';

const STAGE1_ITEMS: MediaGridItem[] = [
  { path: '/TheToolbox/webm/zhankai.webm', description: 'An unfolding workstation animation that reveals a selection of Strauss tools.', isVideo: true },
  { path: '/TheToolbox/webm/safety.webm', description: 'For safety reasons, the system actively detects incompatible drill bits and displays a red warning to prevent incorrect operation.', isVideo: true },
  { path: '/TheToolbox/webm/drill.webm', description: 'A virtual hand acts as a professional guide, demonstrating the correct way to use the tool.', isVideo: true },
  { path: '/TheToolbox/webm/juzi.webm', description: 'Each tool on the workstation is presented within a specific usage scenario. For example, the saw is demonstrated cutting through steel rebar.', isVideo: true },
];

const STAGE2_ITEMS: MediaGridItem[] = [
  { path: '/TheToolbox/webm/aiassistant.webm', description: 'Add button to prompt safety rules and the price with link to Strauss website', isVideo: true },
  { path: '/TheToolbox/ais.png', description: 'AI Assistant structure including speech to text, OpenAI API, and text to speech' },
];

const bodyStyle = {
  fontFamily: 'var(--serif)',
  fontSize: 'clamp(18px, 1.7vw, 22px)',
  lineHeight: 1.7,
  color: 'var(--ink)',
  marginBottom: 20,
} as const;

export default function Post5() {
  const isMobile = useIsMobile();
  const { handleImageClick, overlay } = useImageEnlarger();
  useSketchUnderlineReveal();

  return (
    <>
      {overlay}

      <div className="post-content">
        {/* ─── Video ─── */}
        <EditorialSection id="video" kicker="SHOWREEL" title="The Tool Box">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <figure
              className="photo photo--tilt-l"
              data-anim="rotate-in"
              style={{ width: 'min(900px, 96%)' }}
            >
              <div className="photo__frame">
                <video
                  src={getPublicAssetUrl('/TheToolbox/thetoolbox.mp4')}
                  controls
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <figcaption className="photo__caption">The Tool Box — full showreel</figcaption>
            </figure>
          </div>
        </EditorialSection>

        {/* ─── Ideation ─── */}
        <EditorialSection id="ideation" kicker="CHAPTER 01" title="Ideation" kickerVariant="rust">
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={bodyStyle}>
              We want to build a platform which{' '}
              <span className="sketch-underline orange">
                encourage potential customers to try Strauss&apos; products
                <svg viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M 2 5 Q 50 8, 100 4 T 198 6" pathLength="1" /></svg>
              </span>{' '}
              with{' '}
              <span className="sketch-underline blue">
                virtual shopping guide
                <svg viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M 3 4 Q 60 9, 120 3 Q 160 7, 197 5" pathLength="1" /></svg>
              </span>{' '}
              and direct them to the Strauss website to purchase.
            </p>
            <p style={bodyStyle}>
              <span className="sketch-underline green">
                Guided by on-site Strauss staff
                <svg viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M 2 6 Q 45 2, 100 7 T 198 4" pathLength="1" /></svg>
              </span>
              , our team defined three core principles — Professionalism, Guided Experience, and Safety — which shaped the entire development process. The project was developed around these values, maintaining a clear conceptual and experiential{' '}
              <span className="sketch-underline purple">
                link to the Strauss website
                <svg viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M 2 4 Q 70 9, 130 3 Q 170 8, 198 5" pathLength="1" /></svg>
              </span>
              .
            </p>
          </div>
        </EditorialSection>

        {/* ─── Stage 1: XR Development ─── */}
        <EditorialSection id="stage1" kicker="CHAPTER 02" title="Stage 1 — XR Development">
          <MediaGrid
            items={STAGE1_ITEMS}
            columns={1}
            isMobile={isMobile}
            idPrefix="stage1"
            onItemClick={handleImageClick}
          />
        </EditorialSection>

        {/* ─── Stage 2: AI Assistant ─── */}
        <EditorialSection id="stage2" kicker="CHAPTER 03" title="Stage 2 — AI Assistant" kickerVariant="rust">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 40,
              maxWidth: 900,
              margin: '0 auto',
            }}
          >
            {STAGE2_ITEMS.map((item, i) => {
              const alt =
                item.alt ??
                item.description ??
                item.path.split('/').pop()?.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ') ??
                'Media';
              return (
                <MediaFrame
                  key={item.path}
                  src={item.path}
                  alt={alt}
                  caption={item.description}
                  isVideo={item.isVideo}
                  dataAnim={i % 2 === 0 ? 'slide-left' : 'slide-right'}
                  onClick={() => handleImageClick(item.path, item.description ?? alt, item.isVideo)}
                />
              );
            })}
          </div>
        </EditorialSection>
      </div>
    </>
  );
}
