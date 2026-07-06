'use client';

import {
  EditorialSection,
  EditorialSubtitle,
  MediaFrame,
  MediaGrid,
  MediaStrip,
  MediaGridItem,
  useImageEnlarger,
  useSketchUnderlineReveal,
  useIsMobile,
} from '../editorial';

const STAGE1_ITEMS: MediaGridItem[] = [
  {
    path: '/IandAI/tdcommunication.png',
    description:
      'To support multi-device communication during the exhibition, I set up a shared network address that allowed systems to exchange information in real time.',
  },
  {
    path: '/webm/Mirrormirror/CommunicationPro.webm',
    description:
      'This demonstrates the transfer of data from TouchDesigner to Unreal Engine, enabling MetaHuman to generate output and respond to user speech.',
    isVideo: true,
  },
];

const STAGE2_ITEMS: MediaGridItem[] = [
  {
    path: '/IandAI/statemachine.png',
    description:
      "I used a Switch node in TouchDesigner to control different states sent to Unreal Engine's MetaHuman, with Python scripts managing greeting, dialogue, and closing states.",
  },
  {
    path: '/IandAI/pythons1.png',
    description:
      'After the user speaks, their input is stored in a table, and my code monitors changes in the table to update the interaction state.',
  },
];

const STAGE3_ITEMS: MediaGridItem[] = [
  {
    path: '/webm/Mirrormirror/lipsync.webm',
    description:
      'MetaHuman lip sync controlled via the Runtime MetaHuman Lip Sync plugin, with OSC-driven speech and mouth animation handled through Blueprints and an Animation Blueprint.',
    isVideo: true,
  },
  {
    path: '/IandAI/mesh data transfer.png',
    description:
      'In Blender, I used the Mesh Data Transfer add-on to ensure the sculpted MetaHuman mesh shares the same skeletal structure as the original MetaHuman, preserving correct facial deformation and animation.',
  },
];

const STAGE4_ITEMS: MediaGridItem[] = [
  {
    path: '/webm/Mirrormirror/wakenwords detect.webm',
    description:
      'Accent variability was handled by lowering the wake-word detection threshold; successful triggers send a pulse to TouchDesigner for visual switching, using the lightweight vosk-model-small-en-us-0.15 model.',
    isVideo: true,
  },
  {
    path: '/IandAI/wakenwords.png',
    description:
      "Based on a collaborator's requirement, I implemented a Python-based wake-word detection system that activates the experience and switches scenes when \"mirror mirror\" is detected.",
  },
];

const LIVE_SCENE_ITEMS: MediaGridItem[] = [
  { path: '/IandAI/twogirls.jpeg' },
  { path: '/IandAI/p.jpg' },
  { path: '/IandAI/installation1.jpg' },
  { path: '/IandAI/installation2.jpg' },
  { path: '/IandAI/installation3.jpg' },
  { path: '/IandAI/speak.jpg' },
  { path: '/IandAI/audience.jpg' },
  { path: '/IandAI/watch.jpg' },
  { path: '/IandAI/hands.jpeg' },
  { path: '/IandAI/sofa.jpg' },
];

const CONTRIBUTIONS = [
  'localhost in mobile device (an iPad) to trigger chatting with AI and inactivity fallback system',
  'Wake words to trigger chatting start (Python), and connected to TouchDesigner',
  'OSC connection — MetaHuman speech content from TouchDesigner',
  'TouchDesigner chatting state machine',
];

const STATS = [
  { title: 'Participation in 3 days', value: '422', unit: 'plays' },
  { title: 'Fullplay Counts', value: '287', unit: 'plays' },
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

export default function Post3() {
  const isMobile = useIsMobile();
  const { handleImageClick, overlay } = useImageEnlarger();
  useSketchUnderlineReveal();

  return (
    <>
      {overlay}

      <div className="post-content">
        {/* ─── Live Scene ─── */}
        <EditorialSection id="live-scene" title="Live Scene" kickerVariant="rust">
          <MediaStrip
            items={LIVE_SCENE_ITEMS}
            idPrefix="live-scene"
            onItemClick={handleImageClick}
            scrollSpeed={52}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 20,
              marginTop: 40,
              maxWidth: 900,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {STATS.map((stat, index) => (
              <div
                key={stat.title}
                data-anim="slide-up"
                style={{
                  flex: 1,
                  padding: 24,
                  background: 'var(--bone)',
                  border: '1px solid rgba(26, 20, 13, 0.16)',
                  boxShadow: '4px 5px 0 rgba(26, 20, 13, 0.08)',
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--rust)',
                    marginBottom: 12,
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                  }}
                >
                  ↓ {stat.title}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--serif)',
                    fontStyle: 'italic',
                    fontSize: '2.6rem',
                    fontWeight: 700,
                    color: 'var(--ink)',
                    lineHeight: 1.15,
                  }}
                >
                  <span className={`sketch-underline ${index === 0 ? 'orange' : 'blue'}`}>
                    {stat.value}
                    <svg viewBox="0 0 200 10" preserveAspectRatio="none">
                      <path
                        d={index === 0 ? 'M 2 5 Q 50 8, 100 4 T 198 6' : 'M 3 4 Q 60 9, 120 3 Q 160 7, 197 5'}
                        pathLength="1"
                      />
                    </svg>
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '1rem', color: 'var(--muted)', marginTop: 4 }}>
                  {stat.unit}
                </div>
              </div>
            ))}
          </div>
        </EditorialSection>

        {/* ─── Achievement ─── */}
        <EditorialSection id="achievement" kicker="CHAPTER 01" title="Achievement" kickerVariant="rust">
          <p style={bodyStyle}>
            Supported by{' '}
            <span className="sketch-underline blue">
              Immersive Arts UK
              <svg viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M 2 5 Q 50 8, 100 4 T 198 6" pathLength="1" /></svg>
            </span>
            , Cryptic, the UKRI Innovate UK Immersive Tech Network, Co-STEAM, the Institute for Design Informatics, and Inspace. This is the first prototype presentation of this project — a{' '}
            <span className="sketch-underline orange">
              pop-up exhibition and performance at Inspace, Edinburgh
              <svg viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M 3 4 Q 60 9, 120 3 Q 160 7, 197 5" pathLength="1" /></svg>
            </span>
            , which is set to expand into a{' '}
            <span className="sketch-underline green">
              major exhibition in 2026 and 2027
              <svg viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M 2 4 Q 70 9, 130 3 Q 170 8, 198 5" pathLength="1" /></svg>
            </span>
            .
          </p>
        </EditorialSection>

        {/* ─── Process ─── */}
        <EditorialSection id="process" kicker="CHAPTER 02" title="Process">
          <EditorialSubtitle id="installation-draft">Installation Draft</EditorialSubtitle>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MediaFrame
              src="/IandAI/Draft.png"
              alt="Installation Draft Design"
              caption="Installation draft"
              variant="default"
              tilt="left"
              dataAnim="rotate-in"
              width="min(900px, 96%)"
              onClick={() => handleImageClick('/IandAI/Draft.png', 'Installation Draft Design')}
            />
          </div>

          <EditorialSubtitle id="process-stage1" style={{ marginTop: 80 }}>
            Stage 1 — Touchdesigner–Unreal Engine Communication Prototype
          </EditorialSubtitle>
          <MediaGrid items={STAGE1_ITEMS} isMobile={isMobile} idPrefix="stage1" onItemClick={handleImageClick} />

          <EditorialSubtitle id="process-stage2" style={{ marginTop: 80 }}>
            Stage 2 — State machine prototype
          </EditorialSubtitle>
          <MediaGrid items={STAGE2_ITEMS} isMobile={isMobile} idPrefix="stage2" onItemClick={handleImageClick} />

          <EditorialSubtitle id="process-stage3" style={{ marginTop: 80 }}>
            Stage 3 — MetaHuman realtime speech / lip sync
          </EditorialSubtitle>
          <MediaGrid items={STAGE3_ITEMS} isMobile={isMobile} idPrefix="stage3" onItemClick={handleImageClick} />

          <EditorialSubtitle id="process-stage4" style={{ marginTop: 80 }}>
            Stage 4 — Wake words &amp; localhost interactive interface
          </EditorialSubtitle>
          <MediaGrid items={STAGE4_ITEMS} isMobile={isMobile} idPrefix="stage4" onItemClick={handleImageClick} />
        </EditorialSection>

        {/* ─── My Contributions ─── */}
        <EditorialSection id="contributions" kicker="CREDITS" title="My Contributions" kickerVariant="rust">
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
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
                <p style={{ fontFamily: 'var(--serif)', fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--ink)', margin: 0 }}>
                  <span style={{ fontFamily: 'var(--sans)', fontWeight: 500, letterSpacing: '0.18em', color: 'var(--rust)', marginRight: 10 }}>
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
