'use client';

import Image from 'next/image';
import { getPublicAssetUrl } from '@/app/lib/publicAsset';
import {
  EditorialSection,
  MediaFrame,
  MediaGrid,
  type MediaGridItem,
  useImageEnlarger,
  useSketchUnderlineReveal,
  useIsMobile,
} from '../editorial';
import { SketchUnderline } from '../SketchUnderline';

const IMAGE_TO_SCENE_ITEMS: MediaGridItem[] = [
  {
    path: '/Reroll/originpic.png',
    alt: 'Original reference image used by Reroll',
    description: 'Original reference image',
    variant: 'contain',
  },
  {
    path: '/Reroll/output_objectdetection.png',
    alt: 'YOLOv8-seg detection and DPT relative-depth result',
    description: 'YOLOv8-seg detection + DPT relative depth',
    variant: 'contain',
  },
];

const DIRECT_AR_ITEMS: MediaGridItem[] = [
  {
    path: '/Reroll/jsonPoints.webp',
    alt: 'Camera path points recorded as structured JSON',
    description: 'Camera path recorded as JSON points',
    variant: 'contain',
  },
  {
    path: '/Reroll/scene.webp',
    alt: 'Editable Reroll scene in the iPhone AR camera',
    description: 'Editable AR scene on iPhone',
    variant: 'contain',
  },
];

const PROMPT_INPUTS = [
  {
    title: 'Scene Objects',
    detail: 'Masks, position, scale, and depth',
    background: '#DFFF57',
    ink: '#24320C',
    shadow: '#8DBB21',
  },
  {
    title: 'Camera Direction',
    detail: 'Angle, framing, and movement path',
    background: '#78D9FF',
    ink: '#10324A',
    shadow: '#3488ED',
  },
  {
    title: 'Edit Tips',
    detail: 'Voice notes for action, mood, and light',
    background: '#FF8CC6',
    ink: '#4B1735',
    shadow: '#D94C92',
  },
];

const PROMPT_OUTPUTS = [
  {
    src: '/Reroll/ch.png',
    alt: 'Chinese refined prompt generated from the Reroll scene',
    label: 'Chinese Prompt',
    width: 960,
    height: 678,
    background: '#FFB45C',
    shadow: '#FF6B45',
  },
  {
    src: '/Reroll/en.png',
    alt: 'English refined prompt generated from the Reroll scene',
    label: 'English Prompt',
    width: 1497,
    height: 1059,
    background: '#7EE5E1',
    shadow: '#3B9EEB',
  },
];

const bodyStyle = {
  fontFamily: 'var(--serif)',
  fontSize: 'clamp(18px, 1.7vw, 22px)',
  lineHeight: 1.7,
  color: 'var(--ink)',
} as const;

const TOOL_STACK = [
  {
    group: 'Vision & Segmentation',
    tools: ['Python', 'YOLOv8-seg', 'SAM 3', 'DPT'],
    background: '#EEF5D8',
    ink: '#24320C',
    shadow: '#C7D69D',
  },
  {
    group: 'iPhone AR',
    tools: ['SwiftUI', 'ARKit', 'RealityKit'],
    background: '#E3F3F8',
    ink: '#10324A',
    shadow: '#B7D7E1',
  },
  {
    group: 'Speech & Prompting',
    tools: ['Apple Speech', 'SFSpeechRecognizer', 'AI Agent'],
    background: '#F7E7EF',
    ink: '#4B1735',
    shadow: '#DDBDCC',
  },
  {
    group: 'Early Prototype',
    tools: ['Unity'],
    background: '#F5EBDD',
    ink: '#4C260C',
    shadow: '#DEC8AB',
  },
];

export default function Post7() {
  const isMobile = useIsMobile();
  const { handleImageClick, overlay } = useImageEnlarger();
  useSketchUnderlineReveal();

  return (
    <>
      {overlay}

      <div className="post-content reroll-post">
        <EditorialSection id="why-reroll" kicker="CHAPTER 01" title="Why Reroll" kickerVariant="rust">
          <div style={{ maxWidth: 920, margin: '0 auto' }}>
            <div
              aria-label="Workflow comparison"
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) auto minmax(0, 1fr)',
                gap: isMobile ? 14 : 16,
                alignItems: 'stretch',
              }}
            >
              <article
                data-anim="slide-left"
                style={{
                  padding: isMobile ? '24px 20px' : '30px 28px',
                  border: '1px solid rgba(26, 20, 13, 0.16)',
                  borderTop: '5px solid var(--teal-shadow)',
                  background: 'var(--bone)',
                  boxShadow: '5px 6px 0 rgba(26, 20, 13, 0.08)',
                  borderRadius: 24,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={getPublicAssetUrl('/Reroll/logo-display.webp')}
                  alt="Reroll"
                  width={360}
                  height={165}
                  sizes="140px"
                  style={{
                    display: 'block',
                    width: isMobile ? 120 : 140,
                    height: 'auto',
                    margin: '0 0 14px',
                  }}
                />
                <h3 style={{ margin: '0 0 18px', fontFamily: 'var(--sans)', fontSize: 'clamp(20px, 2vw, 28px)', lineHeight: 1.2, color: 'var(--ink)' }}>
                  Reference image → AI-guided prompt
                </h3>
                <p style={{ ...bodyStyle, margin: 0, fontSize: '1rem', lineHeight: 1.55 }}>
                  Start with one reference image. Use the phone{' '}
                  <SketchUnderline color="green">AR camera</SketchUnderline>{' '}
                  to edit objects and add voice tips. AI turns them into a stronger prompt for video generation.
                </p>
                <MediaFrame
                  src="/Reroll/sam3.png"
                  alt="SAM 3 segmentation of objects in the Reroll reference scene"
                  caption="masked objects to be edited in phone AR scene"
                  variant="contain"
                  width="100%"
                  style={{ marginTop: 24 }}
                  onClick={() =>
                    handleImageClick(
                      '/Reroll/sam3.png',
                      'SAM 3 segmentation of objects in the Reroll reference scene',
                    )
                  }
                />
              </article>

              <div
                aria-hidden="true"
                style={{
                  alignSelf: 'center',
                  justifySelf: 'center',
                  display: 'grid',
                  placeItems: 'center',
                  width: isMobile ? 58 : 68,
                  height: isMobile ? 58 : 68,
                  margin: isMobile ? '-2px 0' : 0,
                  borderRadius: '50%',
                  border: '3px solid var(--bone)',
                  background: '#7457ff',
                  color: '#fff',
                  boxShadow: '0 7px 0 #3f2ab8, 0 10px 22px rgba(63, 42, 184, 0.22)',
                  fontFamily: 'var(--sans)',
                  fontSize: isMobile ? '1rem' : '1.15rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  lineHeight: 1,
                  zIndex: 1,
                }}
              >
                VS
              </div>

              <article
                data-anim="slide-right"
                style={{
                  padding: isMobile ? '24px 20px' : '30px 28px',
                  border: '1px solid rgba(26, 20, 13, 0.16)',
                  borderTop: '5px solid var(--rust)',
                  background: 'var(--bone)',
                  boxShadow: '5px 6px 0 rgba(26, 20, 13, 0.08)',
                  borderRadius: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <p style={{ margin: '0 0 10px', fontFamily: 'var(--sans)', fontSize: '0.75rem', letterSpacing: '0.16em', color: 'var(--rust)', textTransform: 'uppercase' }}>
                  Traditional Director Tools
                </p>
                <h3 style={{ margin: '0 0 18px', fontFamily: 'var(--sans)', fontSize: 'clamp(20px, 2vw, 28px)', lineHeight: 1.2, color: 'var(--ink)' }}>
                  3D scene → rendered previs video
                </h3>
                <p style={{ ...bodyStyle, margin: 0, fontSize: '1rem', lineHeight: 1.55 }}>
                  Traditional director tools are harder for beginners. They may require building a scene in 3D software and rendering a previs video. Not everyone knows 3D, and the process takes time.
                </p>
              </article>
            </div>
          </div>
        </EditorialSection>

        <EditorialSection id="image-to-scene" kicker="CHAPTER 02" title="From Image to Editable Scene">
          <p style={{ ...bodyStyle, maxWidth: 920, margin: '0 auto 42px' }}>
            YOLOv8-seg separates subjects, while DPT estimates relative depth. Together they turn{' '}
            <SketchUnderline color="blue">one image into editable scene data</SketchUnderline>{' '}
            for the iPhone.
          </p>
          <MediaGrid
            items={IMAGE_TO_SCENE_ITEMS}
            isMobile={isMobile}
            idPrefix="reroll-image-to-scene"
            onItemClick={handleImageClick}
            gap={isMobile ? 32 : 44}
          />
          <div style={{ maxWidth: 920, margin: `${isMobile ? 42 : 70}px auto 30px` }}>
            <p
              style={{
                margin: '0 0 12px',
                fontFamily: 'var(--sans)',
                fontSize: '0.78rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--rust)',
              }}
            >
              Update — SAM 3
            </p>
            <p style={{ ...bodyStyle, margin: 0 }}>
              Tests showed that SAM 3 produces cleaner segmentation than YOLOv8-seg. Its masks preserve each object&apos;s shape, so the AR camera displays{' '}
              <SketchUnderline color="orange">object silhouettes instead of boxes</SketchUnderline>.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MediaFrame
              src="/Reroll/objectdetection.jpg"
              alt="SAM 3 object masks preserving the shape of detected scene objects"
              caption="Update: SAM 3 masks preserve object silhouettes for AR"
              variant="contain"
              tilt="right"
              dataAnim="rotate-in"
              width="min(1080px, 100%)"
              onClick={() =>
                handleImageClick(
                  '/Reroll/objectdetection.jpg',
                  'SAM 3 object masks preserving object silhouettes for AR',
                )
              }
            />
          </div>
        </EditorialSection>

        <EditorialSection id="direct-in-ar" kicker="CHAPTER 03" title="Direct the Scene in AR" kickerVariant="rust">
          <p style={{ ...bodyStyle, maxWidth: 920, margin: '0 auto 42px' }}>
            Place the detected scene on a surface, then edit each object. The{' '}
            <SketchUnderline color="green">iPhone becomes the camera</SketchUnderline>
            : move through the space to test angle, framing, and motion.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MediaFrame
              src="/Reroll/mainpath.webp"
              alt="Reroll phone AR camera following a directed movement path"
              caption="AR camera path for physical camera movement"
              variant="contain"
              tilt="left"
              dataAnim="rotate-in"
              width="min(1040px, 100%)"
              onClick={() =>
                handleImageClick(
                  '/Reroll/mainpath.webp',
                  'AR camera path for physical camera movement',
                )
              }
            />
          </div>
          <MediaGrid
            items={DIRECT_AR_ITEMS}
            isMobile={isMobile}
            idPrefix="reroll-direct-ar"
            onItemClick={handleImageClick}
            gap={isMobile ? 24 : 32}
          />
          <p style={{ ...bodyStyle, maxWidth: 920, margin: '46px auto 0' }}>
            A Unity test validated the JSON pipeline. The prototype then moved to ARKit and RealityKit for a phone-first experience.
          </p>
        </EditorialSection>

        <EditorialSection id="speak-direction" kicker="CHAPTER 04" title="Speak Your Direction">
          <p style={{ ...bodyStyle, maxWidth: 920, margin: '0 auto 42px' }}>
            Apple&apos;s <SketchUnderline color="purple">Speech framework</SketchUnderline> uses{' '}
            <code style={{ fontFamily: 'monospace', fontSize: '0.88em' }}>SFSpeechRecognizer</code> to transcribe each direction. Voice adds action, mood, light, and timing, while every note{' '}
            <SketchUnderline color="purple">stays linked to the selected object</SketchUnderline>.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MediaFrame
              src="/Reroll/stt.png"
              alt="Speech-to-text note attached to an AR object"
              caption="Object-bound speech-to-text directing note"
              variant="contain"
              tilt="right"
              dataAnim="rotate-in"
              width="min(1040px, 100%)"
              onClick={() =>
                handleImageClick(
                  '/Reroll/stt.png',
                  'Object-bound speech-to-text directing note',
                )
              }
            />
          </div>
        </EditorialSection>

        <EditorialSection id="refined-prompt" kicker="CHAPTER 05" title="Final Refined Prompt" kickerVariant="rust">
          <p style={{ ...bodyStyle, maxWidth: 920, margin: '0 auto 42px' }}>
            An AI agent combines scene objects, camera movement, and the user&apos;s edit tips into{' '}
            <SketchUnderline color="orange">one refined prompt</SketchUnderline>. That prompt guides the AI video model.
          </p>
          <div
            style={{
              maxWidth: 980,
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? 18 : 24,
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: isMobile ? 14 : 18,
              }}
            >
              {PROMPT_INPUTS.map((input, index) => (
                <article
                  key={input.title}
                  data-anim="slide-up"
                  style={{
                    minHeight: isMobile ? 0 : 190,
                    padding: isMobile ? '22px 20px' : '26px 24px',
                    background: input.background,
                    border: '2px solid rgba(255, 255, 255, 0.72)',
                    borderRadius: isMobile ? 22 : 28,
                    boxShadow: `0 10px 0 ${input.shadow}`,
                    color: input.ink,
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.7)',
                      fontFamily: 'var(--sans)',
                      color: input.ink,
                      letterSpacing: '0.08em',
                      fontSize: '0.7rem',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 style={{ margin: '18px 0 8px', fontFamily: 'var(--sans)', fontSize: 'clamp(18px, 1.6vw, 24px)', lineHeight: 1.1, color: input.ink }}>
                    {input.title}
                  </h3>
                  <p style={{ margin: 0, fontFamily: 'var(--serif)', lineHeight: 1.45, color: input.ink }}>
                    {input.detail}
                  </p>
                </article>
              ))}
            </div>
            <div
              style={{
                alignSelf: 'center',
                padding: '10px 18px',
                borderRadius: 999,
                background: '#7457FF',
                boxShadow: '0 6px 0 #3F2AB8',
                textAlign: 'center',
                fontFamily: 'var(--sans)',
                color: '#FFFFFF',
                letterSpacing: '0.14em',
                fontSize: '0.76rem',
              }}
            >
              ↓ AI AGENT SYNTHESIS ↓
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))',
                gap: isMobile ? 22 : 28,
              }}
            >
              {PROMPT_OUTPUTS.map((output, index) => (
                <button
                  key={output.src}
                  type="button"
                  data-anim={index === 0 ? 'slide-left' : 'slide-right'}
                  aria-label={`Enlarge ${output.label}`}
                  onClick={() => handleImageClick(output.src, output.alt)}
                  style={{
                    width: '100%',
                    padding: isMobile ? 10 : 12,
                    border: '2px solid rgba(255, 255, 255, 0.78)',
                    borderRadius: isMobile ? 24 : 30,
                    background: output.background,
                    boxShadow: `0 11px 0 ${output.shadow}`,
                    cursor: 'zoom-in',
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      margin: '2px 4px 10px',
                      padding: '7px 12px',
                      borderRadius: 999,
                      background: 'rgba(255, 255, 255, 0.78)',
                      color: '#24170E',
                      fontFamily: 'var(--sans)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {output.label}
                  </span>
                  <Image
                    src={getPublicAssetUrl(output.src)}
                    alt={output.alt}
                    width={output.width}
                    height={output.height}
                    sizes={isMobile ? 'calc(100vw - 48px)' : '46vw'}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: 'auto',
                      margin: 0,
                      borderRadius: isMobile ? 17 : 22,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </EditorialSection>

        <EditorialSection id="tool-stack" kicker="CHAPTER 06" title="Tool Stack" kickerVariant="rust">
          <div
            style={{
              maxWidth: 980,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: isMobile ? 16 : 22,
            }}
          >
            {TOOL_STACK.map((stack, index) => (
              <article
                key={stack.group}
                data-anim="slide-up"
                style={{
                  padding: isMobile ? '24px 20px' : '30px 28px',
                  minHeight: isMobile ? 0 : 190,
                  background: stack.background,
                  border: '2px solid rgba(255, 255, 255, 0.74)',
                  borderRadius: isMobile ? 22 : 28,
                  boxShadow: `0 10px 0 ${stack.shadow}`,
                  color: stack.ink,
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.7)',
                    fontFamily: 'var(--sans)',
                    color: stack.ink,
                    letterSpacing: '0.08em',
                    fontSize: '0.7rem',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3
                  style={{
                    margin: '18px 0 20px',
                    fontFamily: 'var(--sans)',
                    fontSize: 'clamp(18px, 1.6vw, 24px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.01em',
                    textTransform: 'uppercase',
                    color: stack.ink,
                  }}
                >
                  {stack.group}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {stack.tools.map((tool) => (
                    <span
                      key={tool}
                      style={{
                        padding: '9px 13px',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                        borderRadius: 999,
                        background: 'rgba(255, 255, 255, 0.68)',
                        boxShadow: '0 3px 0 rgba(26, 20, 13, 0.12)',
                        fontFamily: 'var(--sans)',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: stack.ink,
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </EditorialSection>
      </div>
    </>
  );
}
