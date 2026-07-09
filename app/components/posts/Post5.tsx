'use client';

import {
  EditorialSection,
  MediaFrame,
  MediaGrid,
  MediaGridItem,
  useImageEnlarger,
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

export default function Post5() {
  const isMobile = useIsMobile();
  const { handleImageClick, overlay } = useImageEnlarger();

  return (
    <>
      {overlay}

      <div className="post-content">
        {/* ─── Video ─── */}
        <EditorialSection id="video" kicker="SHOWREEL" title="The Tool Box" className="toolbox-showreel-section">
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

        {/* ─── Stage 1: XR Development ─── */}
        <EditorialSection id="stage1" kicker="CHAPTER 01" title="Stage 1 — XR Development">
          <MediaGrid
            items={STAGE1_ITEMS}
            columns={1}
            isMobile={isMobile}
            idPrefix="stage1"
            onItemClick={handleImageClick}
          />
        </EditorialSection>

        {/* ─── Stage 2: AI Assistant ─── */}
        <EditorialSection id="stage2" kicker="CHAPTER 02" title="Stage 2 — AI Assistant" kickerVariant="rust">
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
