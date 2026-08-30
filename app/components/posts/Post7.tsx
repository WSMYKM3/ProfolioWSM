'use client';

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

const PROMPT_INPUTS = [
  { title: 'Scene Objects', detail: 'Masks, position, scale, and depth' },
  { title: 'Camera Direction', detail: 'Angle, framing, and movement path' },
  { title: 'Edit Tips', detail: 'Voice notes for action, mood, and light' },
];

const bodyStyle = {
  fontFamily: 'var(--serif)',
  fontSize: 'clamp(18px, 1.7vw, 22px)',
  lineHeight: 1.7,
  color: 'var(--ink)',
} as const;

const TOOL_STACK = [
  { group: 'Vision & Segmentation', tools: ['Python', 'YOLOv8-seg', 'SAM 3', 'DPT'] },
  { group: 'iPhone AR', tools: ['SwiftUI', 'ARKit', 'RealityKit'] },
  { group: 'Speech & Prompting', tools: ['Apple Speech', 'SFSpeechRecognizer', 'AI Agent'] },
  { group: 'Early Prototype', tools: ['Unity'] },
];

export default function Post7() {
  const isMobile = useIsMobile();
  const { handleImageClick, overlay } = useImageEnlarger();
  useSketchUnderlineReveal();

  return (
    <>
      {overlay}

      <div className="post-content">
        <EditorialSection id="why-reroll" kicker="CHAPTER 01" title="Why Reroll" kickerVariant="rust">
          <div style={{ maxWidth: 920, margin: '0 auto' }}>
            <p style={bodyStyle}>
              Reroll replaces complex 3D tools with a{' '}
              <SketchUnderline color="orange">familiar directing workflow</SketchUnderline>
              : place, move, frame, and speak.
            </p>
            <div
              data-anim="punch"
              style={{
                marginTop: 36,
                padding: isMobile ? '22px 18px' : '28px 34px',
                border: '1px solid rgba(26, 20, 13, 0.18)',
                borderLeft: '5px solid var(--rust)',
                background: 'var(--bone)',
                boxShadow: '5px 6px 0 rgba(26, 20, 13, 0.08)',
                fontFamily: 'var(--sans)',
                fontSize: 'clamp(16px, 2vw, 25px)',
                letterSpacing: '0.08em',
                color: 'var(--ink)',
                textAlign: 'center',
              }}
            >
              Look → Place → Move → Frame → Speak
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
              src="/Reroll/cameramove.png"
              alt="Reroll AR scene editing and camera movement interface"
              caption="Spatial editing and camera-movement previsualization on iPhone"
              variant="contain"
              tilt="left"
              dataAnim="rotate-in"
              width="min(1040px, 100%)"
              onClick={() =>
                handleImageClick(
                  '/Reroll/cameramove.png',
                  'Spatial editing and camera-movement previsualization on iPhone',
                )
              }
            />
          </div>
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
                    padding: isMobile ? '20px 18px' : '24px 22px',
                    background: 'var(--bone)',
                    border: '1px solid rgba(26, 20, 13, 0.14)',
                    borderTop: '4px solid var(--teal-shadow)',
                    boxShadow: '4px 5px 0 rgba(26, 20, 13, 0.07)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--sans)', color: 'var(--rust)', letterSpacing: '0.14em', fontSize: '0.72rem' }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 style={{ margin: '10px 0 8px', fontFamily: 'var(--sans)', fontSize: '1rem', color: 'var(--ink)' }}>
                    {input.title}
                  </h3>
                  <p style={{ margin: 0, fontFamily: 'var(--serif)', lineHeight: 1.5, color: 'var(--ink)' }}>
                    {input.detail}
                  </p>
                </article>
              ))}
            </div>
            <div style={{ textAlign: 'center', fontFamily: 'var(--sans)', color: 'var(--rust)', letterSpacing: '0.14em', fontSize: '0.8rem' }}>
              ↓ AI AGENT SYNTHESIS ↓
            </div>
            <article
              data-anim="punch"
              style={{
                padding: isMobile ? '24px 20px' : '30px 32px',
                background: 'var(--ink)',
                color: 'var(--bone)',
                border: '1px solid var(--ink)',
                borderLeft: '6px solid var(--rust)',
                boxShadow: '6px 7px 0 rgba(26, 20, 13, 0.12)',
              }}
            >
              <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--sans)', letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: '0.82rem', color: 'var(--rust)' }}>
                Final Refined Prompt
              </h3>
              <p style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: 'clamp(17px, 1.5vw, 21px)', lineHeight: 1.55, color: 'var(--bone)' }}>
                A generation-ready prompt that describes what is in the scene, how the camera moves, and what the creator wants to change.
              </p>
            </article>
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
                  background: 'var(--bone)',
                  border: '1px solid rgba(26, 20, 13, 0.14)',
                  borderTop: `5px solid ${index % 2 === 0 ? 'var(--teal-shadow)' : 'var(--rust)'}`,
                  boxShadow: '5px 6px 0 rgba(26, 20, 13, 0.07)',
                }}
              >
                <h3
                  style={{
                    margin: '0 0 20px',
                    fontFamily: 'var(--sans)',
                    fontSize: '0.82rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: index % 2 === 0 ? 'var(--teal-shadow)' : 'var(--rust)',
                  }}
                >
                  {stack.group}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {stack.tools.map((tool) => (
                    <span
                      key={tool}
                      style={{
                        padding: '8px 12px',
                        border: '1px solid rgba(26, 20, 13, 0.18)',
                        borderRadius: 999,
                        fontFamily: 'var(--sans)',
                        fontSize: '0.88rem',
                        color: 'var(--ink)',
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
