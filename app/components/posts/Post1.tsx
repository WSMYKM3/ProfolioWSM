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

const STAGE1_ITEMS: MediaGridItem[] = [
  { path: '/gifs/groommaking1.webm', description: 'Character Groom Blueprint making process, groom binding in blender', isVideo: true },
  { path: '/gifs/run.webm', description: 'Character running shot', isVideo: true },
  { path: '/webm/Datnie/trainshot.webm', description: 'Sequence of talking, here I "fake" the background by a depth image, and use Dollars MoCap to do motion capture in blender', isVideo: true },
  { path: '/webm/Datnie/train.webm', description: 'Movie cut of talking', isVideo: true },
  { path: '/webm/Datnie/trainout.webm', description: 'Sequence of walking', isVideo: true },
  { path: '/webm/Datnie/walk.webm', description: 'Movie cut of walking', isVideo: true },
  { path: '/webm/Datnie/logogroom.webm', description: 'Give our logo groom to look cute', isVideo: true },
  { path: '/webm/Datnie/logoshot.webm', description: 'Using a green screen to layer it as a transparent layer later', isVideo: true },
];

const STAGE2_ITEMS: MediaGridItem[] = [
  { path: '/DatnieStage2/uiunity.png', description: 'Unity Meta SDK' },
  { path: '/webm/Datnie/pivot.webm', description: 'Prototype a pivot to switch profile card', isVideo: true },
  { path: '/webm/Datnie/uinavigator.webm', description: 'UI navigator debug by keyboard first, then replaced by hand microgesture', isVideo: true },
  { path: '/webm/Datnie/grabcloud.webm', description: 'A cloth-simulation cloud popping up profile info (cut from final build)', isVideo: true },
  { path: '/webm/Datnie/grabcard.webm', description: 'Every info card is interactable and easy to grab', isVideo: true },
  { path: '/webm/Datnie/addtop.webm', description: 'A frequent answer is prompted to be added to the user\'s profile', isVideo: true },
  { path: '/DatnieStage2/rotater.png', description: 'The main GameObject auto-lays out icons on a ring and smoothly rotates to the next focused item' },
  { path: '/DatnieStage2/CodeRotate.png', description: 'Script rotating a circular UI carousel with smooth steps, index tracking, auto layout, and center-change events' },
];

export default function Post1() {
  const isMobile = useIsMobile();
  const { handleImageClick, overlay } = useImageEnlarger();
  useSketchUnderlineReveal();

  const bodyStyle = {
    fontFamily: 'var(--serif)',
    fontSize: 'clamp(18px, 1.7vw, 22px)',
    lineHeight: 1.7,
    color: 'var(--ink)',
  } as const;
  const ideationBodyStyle = {
    ...bodyStyle,
    fontSize: 'clamp(15px, 1.2vw, 18px)',
    lineHeight: 1.62,
  } as const;

  return (
    <>
      {overlay}

      <div className="post-content">
        {/* ─── Ideation ─── */}
        <EditorialSection id="ideation" kicker="CHAPTER 01" title="Ideation" kickerVariant="rust">
          <div
            style={{
              maxWidth: 760,
              margin: 0,
              textAlign: 'left',
            }}
          >
            <div>
              <p style={{ ...ideationBodyStyle, marginBottom: 16 }}>
                Inspired by a friend&apos;s frustration with{' '}
                <span className="sketch-underline orange">
                  dating apps
                  <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M 2 5 Q 50 8, 100 4 T 198 6" pathLength="1" />
                  </svg>
                </span>
                {' '}— endless queued messages, repeated conversations, and time spent hanging out only to find{' '}
                <span className="sketch-underline blue">
                  no shared interests
                  <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M 3 4 Q 60 9, 120 3 Q 160 7, 197 5" pathLength="1" />
                  </svg>
                </span>
                .
              </p>
              <p style={ideationBodyStyle}>
                So we&apos;re building a dating app that{' '}
                <span className="sketch-underline green">
                  recognizes your frequently mentioned answers and turns them into your profile automatically
                  <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M 2 6 Q 45 2, 100 7 T 198 4" pathLength="1" />
                  </svg>
                </span>
                , letting you{' '}
                <span className="sketch-underline purple">
                  chat freely
                  <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M 2 4 Q 70 9, 130 3 Q 170 8, 198 5" pathLength="1" />
                  </svg>
                </span>{' '}
                without repeating yourself.
              </p>
            </div>
          </div>
        </EditorialSection>

        {/* ─── UX Design ─── */}
        <EditorialSection id="ux-design" kicker="CHAPTER 02" title="UX Design">
          <div
            className="ed-grid-asym"
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: 40,
            }}
          >
            <MediaFrame
              src="/brainstorm.png"
              alt="Datnie UX Design"
              caption="Brainstorm sketches"
              dataAnim="slide-left"
              onClick={() => handleImageClick('/brainstorm.png', 'Datnie UX Design')}
            />
            <MediaFrame
              src="/webm/Datnie/uxboard.webm"
              alt="Datnie UX Design GIF"
              caption="UX board walkthrough"
              isVideo
              dataAnim="slide-right"
              onClick={() => handleImageClick('/webm/Datnie/uxboard.webm', 'Datnie UX Design GIF', true)}
            />
          </div>
        </EditorialSection>

        {/* ─── Prototype ─── */}
        <EditorialSection id="prototype" kicker="CHAPTER 03" title="Prototype" kickerVariant="rust">
          {/* Animation Trailer */}
          <div
            id="animation-trailer"
            style={{ display: 'flex', justifyContent: 'center', marginBottom: 60, scrollMarginTop: 100 }}
          >
            <MediaFrame
              src="https://www.youtube.com/embed/SdtlgYBgla8"
              alt="Animation Trailer"
              caption="Animation Trailer"
              isYouTube
              variant="default"
              tilt="left"
              dataAnim="rotate-in"
              width="min(720px, 92%)"
            />
          </div>

          {/* Stage 1 */}
          <EditorialSubtitle id="prototype-stage1">
            Stage 1 — Animation Trailer (UE) production
          </EditorialSubtitle>
          <MediaGrid
            items={STAGE1_ITEMS}
            isMobile={isMobile}
            idPrefix="stage1"
            onItemClick={handleImageClick}
          />

          {/* Stage 2 */}
          <EditorialSubtitle id="prototype-stage2" style={{ marginTop: 100 }}>
            Stage 2 — Unity Development
          </EditorialSubtitle>
          <MediaGrid
            items={STAGE2_ITEMS}
            isMobile={isMobile}
            idPrefix="stage2"
            onItemClick={handleImageClick}
          />
        </EditorialSection>
      </div>
    </>
  );
}
