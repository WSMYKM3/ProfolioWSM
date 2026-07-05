'use client';

import {
  EditorialSection,
  MediaGrid,
  MediaGridItem,
  useImageEnlarger,
  useSketchUnderlineReveal,
  useIsMobile,
} from '../editorial';

const MOCAP_ITEMS: MediaGridItem[] = [
  { path: '/mocapgifs/mocapclean.png', description: 'Overview' },
  { path: '/webm/MotionCapture/motioncapture.webm', description: 'Motion capture', isVideo: true },
  { path: '/webm/MotionCapture/mb1.webm', description: 'Retargeting', isVideo: true },
  { path: '/webm/MotionCapture/mb2.webm', description: 'Data cleaning', isVideo: true },
  { path: '/webm/MotionCapture/mb3.webm', description: 'It works', isVideo: true },
  { path: '/webm/MotionCapture/realtimevcam.webm', description: 'Real-time VCam testing', isVideo: true },
];

const METAHUMAN_ITEMS: MediaGridItem[] = [
  { path: '/webm/MotionCapture/facialmotion.webm', description: 'Facial motion', isVideo: true },
  { path: '/mocapgifs/facemesh.png', description: 'Face mesh' },
  { path: '/webm/MotionCapture/sequence.webm', description: 'Sequence', isVideo: true },
];

const bodyStyle = {
  fontFamily: 'var(--serif)',
  fontSize: 'clamp(18px, 1.7vw, 22px)',
  lineHeight: 1.7,
  color: 'var(--ink)',
  textAlign: 'center' as const,
  maxWidth: 900,
  margin: '0 auto',
};

export default function Post4() {
  const isMobile = useIsMobile();
  const { handleImageClick, overlay } = useImageEnlarger();
  useSketchUnderlineReveal();

  return (
    <>
      {overlay}

      <div className="post-content">
        {/* ─── Videos handled by PostDetailView's post-4 branch ─── */}

        {/* ─── Intro paragraph (in place of the standard Intro section) ─── */}
        <EditorialSection id="introduction" kicker="CHAPTER 01" title="A cinematic mocap short" kickerVariant="rust">
          <p style={bodyStyle}>
            A cinematic short film driven by{' '}
            <span className="sketch-underline orange">
              motion capture performance
              <svg viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M 2 5 Q 50 8, 100 4 T 198 6" pathLength="1" /></svg>
            </span>
            , combining Optitrack data with{' '}
            <span className="sketch-underline blue">
              Metahuman animation
              <svg viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M 3 6 Q 50 2, 95 7 Q 150 3, 197 6" pathLength="1" /></svg>
            </span>{' '}
            in Unreal Engine to produce a{' '}
            <span className="sketch-underline green">
              photorealistic real-time render
              <svg viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M 2 6 Q 45 2, 100 7 T 198 4" pathLength="1" /></svg>
            </span>
            .
          </p>
        </EditorialSection>

        {/* ─── Tools ─── */}
        <EditorialSection id="tools" kicker="CHAPTER 02" title="Tools">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              justifyContent: 'center',
              maxWidth: 800,
              margin: '0 auto',
            }}
          >
            {['Unreal Engine', 'Motion Builder', 'Optitrack Motion Capture'].map((tool) => (
              <span
                key={tool}
                data-anim="pop"
                style={{
                  padding: '12px 24px',
                  background: 'var(--bone)',
                  border: '1px solid rgba(26, 20, 13, 0.16)',
                  boxShadow: '4px 5px 0 rgba(26, 20, 13, 0.08)',
                  color: 'var(--ink)',
                  fontFamily: 'var(--serif)',
                  fontSize: '1.05rem',
                  fontStyle: 'italic',
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </EditorialSection>

        {/* ─── Motion Capture + Motion Data Cleaning ─── */}
        <EditorialSection
          id="motion-capture"
          kicker="CHAPTER 03"
          title="Motion Capture + Motion Data Cleaning"
          kickerVariant="rust"
        >
          <MediaGrid
            items={MOCAP_ITEMS}
            isMobile={isMobile}
            idPrefix="mocap"
            onItemClick={handleImageClick}
          />
        </EditorialSection>

        {/* ─── Metahuman ─── */}
        <EditorialSection id="metahuman" kicker="CHAPTER 04" title="Metahuman">
          <MediaGrid
            items={METAHUMAN_ITEMS}
            columns={3}
            isMobile={isMobile}
            idPrefix="metahuman"
            onItemClick={handleImageClick}
          />
        </EditorialSection>
      </div>
    </>
  );
}
