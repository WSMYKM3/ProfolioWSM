'use client';

import {
  EditorialSection,
  MediaGrid,
  MediaGridItem,
  useImageEnlarger,
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

export default function Post4() {
  const isMobile = useIsMobile();
  const { handleImageClick, overlay } = useImageEnlarger();

  return (
    <>
      {overlay}

      <div className="post-content">
        {/* ─── Videos handled by PostDetailView's post-4 branch ─── */}

        {/* ─── Motion Capture + Motion Data Cleaning ─── */}
        <EditorialSection
          id="motion-capture"
          kicker="CHAPTER 01"
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
        <EditorialSection id="metahuman" kicker="CHAPTER 02" title="Metahuman">
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
