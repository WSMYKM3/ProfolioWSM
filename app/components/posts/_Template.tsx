'use client';

/**
 * ─── PROJECT POST TEMPLATE ─────────────────────────────────────────────────
 *
 * Copy this file to `PostN.tsx` (matching your new project's id, e.g. `Post7`),
 * fill in the sections, and register it in three places:
 *
 *   1. `app/components/PostDetailView.tsx` — add `'post-7': Post7` to the
 *      `postComponents` dictionary.
 *   2. `app/lib/posts.ts` — add an entry to the `posts` array with your
 *      project metadata AND the `sections` sidebar list.
 *   3. Optionally add a project route in `app/projects/[id]/page.tsx` if
 *      you're testing directly. (The dynamic route already handles new ids.)
 *
 * Reference implementation: `Post1.tsx` (Datnie).
 *
 * ─── Editorial primitives you can use ───────────────────────────────────────
 *
 * - <EditorialSection id kicker title kickerVariant="rust">        // Chapter
 * - <EditorialSubtitle id>                                          // Stage title
 * - <MediaFrame src alt caption isVideo/isYouTube variant tilt onClick/>
 * - <MediaGrid items={[...]} columns={2} isMobile onItemClick />   // Grid of frames
 * - <SketchUnderline color="orange">phrase</SketchUnderline>       // Hand-drawn underline
 * - useImageEnlarger() → { handleImageClick, overlay }             // Fullscreen media modal
 * - useSketchUnderlineReveal()                                     // Auto-draw underlines on scroll
 * - useIsMobile()                                                  // Boolean for layout swap
 *
 * ─── Scroll-driven attributes (auto-processed by EditorialMotion) ──────────
 *
 *   data-anim="slide-left|slide-right|slide-up|slide-down|pop|rotate-in|sticker|bounce-in|flip|punch"
 *   data-split-lines         // Bouncy word reveal for long paragraphs
 *   data-rest="<deg>"        // Resting rotation for sticker entries
 *
 * The primitives set sensible `data-anim` values already; only add them by
 * hand if you want something custom.
 * ───────────────────────────────────────────────────────────────────────────
 */

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

// 1. Declare the media grids for each stage as arrays outside the component.
const STAGE_1_ITEMS: MediaGridItem[] = [
  { path: '/your-project/asset-1.webm', description: 'Caption for asset 1', isVideo: true },
  { path: '/your-project/asset-2.png', description: 'Caption for asset 2' },
];

// Shared body text style — Fraunces serif on editorial cream paper.
const bodyStyle = {
  fontFamily: 'var(--serif)',
  fontSize: 'clamp(18px, 1.7vw, 22px)',
  lineHeight: 1.7,
  color: 'var(--ink)',
} as const;

export default function PostTemplate() {
  const isMobile = useIsMobile();
  const { handleImageClick, overlay } = useImageEnlarger();
  useSketchUnderlineReveal(); // Only needed if you use <span class="sketch-underline">

  return (
    <>
      {overlay}

      <div className="post-content">
        {/* ─── Chapter 1 ─── */}
        <EditorialSection id="ideation" kicker="CHAPTER 01" title="Ideation" kickerVariant="rust">
          <p style={{ ...bodyStyle, maxWidth: 900, margin: '0 auto' }}>
            One or two sentences setting up the project. Wrap key phrases in{' '}
            <span className="sketch-underline orange">
              coloured underlines
              <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M 2 5 Q 50 8, 100 4 T 198 6" pathLength="1" />
              </svg>
            </span>
            {' '}for emphasis. Available colours: orange, blue, green, purple, pink.
          </p>
        </EditorialSection>

        {/* ─── Chapter 2 — hero polaroid + grid ─── */}
        <EditorialSection id="prototype" kicker="CHAPTER 02" title="Prototype">
          {/* A single hero polaroid (video, image, or YouTube iframe) */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 60 }}>
            <MediaFrame
              src="https://www.youtube.com/embed/VIDEO_ID"
              alt="Project showreel"
              caption="Showreel"
              isYouTube
              variant="default"
              tilt="left"
              dataAnim="rotate-in"
              width="min(720px, 92%)"
            />
          </div>

          {/* A stage subtitle then a media grid */}
          <EditorialSubtitle id="stage-1">Stage 1 — Concepting</EditorialSubtitle>
          <MediaGrid
            items={STAGE_1_ITEMS}
            isMobile={isMobile}
            idPrefix="stage-1"
            onItemClick={handleImageClick}
          />
        </EditorialSection>
      </div>
    </>
  );
}
