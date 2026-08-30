'use client';

import {
  EditorialSection,
  MediaGrid,
  useImageEnlarger,
  useIsMobile,
  useSketchUnderlineReveal,
} from '../editorial';
import { SketchUnderline } from '../SketchUnderline';

const dataGroups = [
  ['Robot', 'Six joint observations and control actions'],
  ['Workflow', 'State, action phase, and active target'],
  ['Vision', 'Frame, class, confidence, and Track ID'],
  ['Decision', 'World position, time remaining, execute or skip'],
  ['Outcome', 'Result, failure reason, pick time, and cycle time'],
];

export default function Post8() {
  const isMobile = useIsMobile();
  const { handleImageClick, overlay } = useImageEnlarger();
  useSketchUnderlineReveal();

  return (
    <>
      {overlay}

      <div className="post-content sorting-factory-post">
        <EditorialSection id="inspiration" kicker="CHAPTER 01" title="Inspiration" kickerVariant="rust">
          <div className="sf-copy" data-anim="slide-up">
            <p>
              NVIDIA-style physical simulation inspired me to build a{' '}
              <SketchUnderline color="orange">Unity training environment</SketchUnderline>{' '}
              for my SO-101 instead of recording every episode by hand.
            </p>
            <p>
              <SketchUnderline color="blue">Multiple digital twins run in parallel</SketchUnderline>, collecting observations, actions, and outcomes faster than one physical arm.
            </p>
          </div>

        </EditorialSection>

        <EditorialSection id="vision-solution" kicker="CHAPTER 02" title="Vision Solution">
          <div className="sf-copy" data-anim="slide-up">
            <p>
              <SketchUnderline color="purple">A Python server</SketchUnderline> receives JPEG frames and ROI data from each Unity camera through WebSocket.
            </p>
            <p>
              <SketchUnderline color="green">YOLO detects objects and ByteTrack stabilizes Track IDs</SketchUnderline>. Results return to the matching Unity arm.
            </p>
          </div>

        </EditorialSection>

        <EditorialSection id="robotics-picking" kicker="CHAPTER 03" title="Robotics Pick Demo" kickerVariant="rust">
          <div className="sf-copy" data-anim="slide-up">
            <p>
              Detection alone does not trigger a pick.{' '}
              <SketchUnderline color="orange">A red Latest Pick Line</SketchUnderline>{' '}
              marks the last safe start point.
            </p>
            <p>
              Unity predicts the time to that line. If it is too short, the arm{' '}
              <SketchUnderline color="pink">abandons the pick</SketchUnderline>.
            </p>
          </div>

          <div className="sf-code-panel" data-anim="slide-up">
            <header className="sf-code-panel__header">
              <span>UNITY / C#</span>
              <strong>PickWindowEvaluator.cs</strong>
              <span>TIME-AWARE PICK DECISION</span>
            </header>
            <pre aria-label="Time-aware pick decision algorithm"><code>{`float distanceToLine = Mathf.Max(0f, latestPickS - target.pathS);
float timeRemaining = distanceToLine / conveyorSpeed;
float timeRequired = estimatedPickSeconds + safetyMargin;

if (!target.confirmed || !arm.IsIdle)
    return;

if (timeRemaining < timeRequired)
{
    Record(target, "SKIPPED", "INSUFFICIENT_TIME", timeRemaining);
    return;
}

if (!target.TryClaim(arm.Id))
    return;

StartPick(target, result =>
{
    target.ReleaseClaim();
    Record(
        target,
        result.Success ? "SUCCESS" : "FAILED",
        result.FailureReason,
        timeRemaining
    );
});`}</code></pre>
            <footer className="sf-code-panel__footer">
              <span><strong>01</strong> Predict time to the red line</span>
              <span><strong>02</strong> Skip when time is insufficient</span>
              <span><strong>03</strong> Record success or failure</span>
            </footer>
          </div>

          <div className="sf-subchapter" data-anim="slide-up">
            <span>CONTROL PANEL</span>
            <h3>Web Control Panel</h3>
          </div>

          <div className="sf-copy" data-anim="slide-up">
            <p>
              The web panel shows each arm&apos;s{' '}
              <SketchUnderline color="blue">camera, target, decision, action, and result</SketchUnderline>.
            </p>
            <p>
              <SketchUnderline color="pink">Skips and failures</SketchUnderline> keep their reason, Track ID, timing, and joint data. Global controls manage the session, conveyor, arms, and cameras.
            </p>
          </div>

          <MediaGrid
            items={[
              {
                path: '/SortingFactory/control-room.webp',
                alt: 'Browser control room with live workstation cameras and pick results',
                description: 'Live cameras, decisions, and pick results',
              },
              {
                path: '/SortingFactory/data-logging.webp',
                alt: 'Per-arm telemetry and recorded pick outcomes',
                description: 'Skipped and failed picks stay in the session record',
              },
            ]}
            columns={2}
            isMobile={isMobile}
            idPrefix="sorting-control-room"
            onItemClick={handleImageClick}
            gap={isMobile ? 30 : 42}
          />

          <div className="sf-data-rate" data-anim="punch">
            <strong>10 Hz</strong>
            <span>Structured recording for every robotic arm</span>
          </div>

          <div className="sf-data-grid">
            {dataGroups.map(([title, detail], index) => (
              <article key={title} data-anim={index % 2 === 0 ? 'slide-left' : 'slide-right'}>
                <span className="sf-index">{String(index + 1).padStart(2, '0')}</span>
                <strong>{title}</strong>
                <p>{detail}</p>
              </article>
            ))}
          </div>

        </EditorialSection>
      </div>

      <style jsx>{`
        .sorting-factory-post {
          --sf-border: rgba(26, 20, 13, 0.16);
        }
        .sf-copy {
          max-width: 980px;
          margin: 0 auto 48px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 34px;
          font-family: var(--serif);
          font-size: clamp(18px, 1.7vw, 22px);
          line-height: 1.72;
          color: var(--ink);
        }
        .sf-copy p { margin: 0; }
        .sf-copy--single {
          display: block;
          max-width: 900px;
        }
        .sf-index {
          font-family: var(--sans);
          font-size: 11px;
          letter-spacing: 0.18em;
          color: var(--rust);
        }
        .sf-subchapter {
          max-width: 1020px;
          margin: 90px auto 42px;
          padding-top: 26px;
          border-top: 1px solid var(--sf-border);
        }
        .sf-subchapter > span {
          font: 500 11px/1 var(--sans);
          letter-spacing: .22em;
          color: var(--rust);
        }
        .sf-subchapter h3 {
          margin: 15px 0 0;
          font: italic 700 clamp(40px, 6vw, 76px)/1.08 var(--serif);
          color: var(--ink);
        }
        .sf-code-panel {
          max-width: 1040px;
          margin: 0 auto 70px;
          overflow: hidden;
          border: 1px solid rgba(26, 20, 13, .28);
          background: #171b19;
          box-shadow: 8px 10px 0 rgba(198, 74, 40, .24);
        }
        .sf-code-panel__header {
          padding: 16px 20px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 18px;
          border-bottom: 1px solid rgba(255, 255, 255, .12);
          background: #232b28;
          color: var(--bone);
        }
        .sf-code-panel__header span {
          font: 500 10px/1 var(--sans);
          letter-spacing: .16em;
          color: var(--rust);
        }
        .sf-code-panel__header strong {
          font: 500 13px/1 var(--sans);
          letter-spacing: .06em;
        }
        .sf-code-panel pre {
          margin: 0;
          padding: clamp(24px, 4vw, 46px);
          overflow-x: auto;
          color: #f1dfb2;
          font: 500 clamp(12px, 1.45vw, 16px)/1.72 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          tab-size: 2;
        }
        .sf-code-panel code { white-space: pre; }
        .sf-code-panel__footer {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid rgba(255, 255, 255, .12);
          background: #232b28;
        }
        .sf-code-panel__footer span {
          padding: 18px 20px;
          font: 500 11px/1.45 var(--sans);
          letter-spacing: .05em;
          color: rgba(255, 245, 220, .72);
        }
        .sf-code-panel__footer span + span {
          border-left: 1px solid rgba(255, 255, 255, .12);
        }
        .sf-code-panel__footer strong {
          margin-right: 8px;
          color: var(--rust);
        }
        .sf-data-rate {
          max-width: 1020px;
          margin: 70px auto 34px;
          padding: 30px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          background: var(--teal-shadow);
          color: var(--bone);
        }
        .sf-data-rate strong {
          font: italic 700 clamp(44px, 7vw, 82px)/1 var(--serif);
          color: var(--tungsten);
        }
        .sf-data-rate span {
          font: 500 12px/1.5 var(--sans);
          letter-spacing: .14em;
          text-transform: uppercase;
        }
        .sf-data-grid {
          max-width: 1020px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .sf-data-grid article {
          padding: 24px;
          background: var(--bone);
          border: 1px solid var(--sf-border);
        }
        .sf-data-grid article:last-child { grid-column: 1 / -1; }
        .sf-data-grid strong {
          display: block;
          margin-top: 14px;
          font: italic 700 28px/1.1 var(--serif);
        }
        .sf-data-grid p {
          margin: 10px 0 0;
          font: 14px/1.55 var(--sans);
          color: var(--muted);
        }
        @media (max-width: 820px) {
          .sf-copy,
          .sf-data-grid { grid-template-columns: 1fr; }
          .sf-code-panel__header { grid-template-columns: 1fr; }
          .sf-code-panel__header span:last-child { display: none; }
          .sf-code-panel__footer { grid-template-columns: 1fr; }
          .sf-code-panel__footer span + span {
            border-left: 0;
            border-top: 1px solid rgba(255, 255, 255, .12);
          }
          .sf-data-grid article:last-child { grid-column: auto; }
          .sf-data-rate { align-items: flex-start; flex-direction: column; }
        }
      `}</style>
    </>
  );
}
