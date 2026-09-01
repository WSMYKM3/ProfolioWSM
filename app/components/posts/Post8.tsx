'use client';

import {
  EditorialSection,
  MediaGrid,
  useImageEnlarger,
  useIsMobile,
  useSketchUnderlineReveal,
} from '../editorial';
import { SketchUnderline } from '../SketchUnderline';

const toolGroups = [
  {
    title: 'Simulation & Robotics',
    tools: ['Unity 6', 'C#', 'SO-101', 'IK'],
    tone: 'sage',
  },
  {
    title: 'Vision & Tracking',
    tools: ['Python', 'YOLO26n', 'ByteTrack'],
    tone: 'blue',
  },
  {
    title: 'Services & Communication',
    tools: ['FastAPI', 'WebSocket', 'REST API'],
    tone: 'pink',
  },
  {
    title: 'Data & Monitoring',
    tools: ['CSV', 'Real-time Telemetry', 'Browser Control Room'],
    tone: 'sand',
  },
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

        <EditorialSection id="vision-solution" kicker="CHAPTER 02" title="Vision & Robotics">
          <div className="sf-copy" data-anim="slide-up">
            <p>
              <SketchUnderline color="purple">A Python server</SketchUnderline> receives JPEG frames and ROI data from each Unity camera through WebSocket.
            </p>
            <p>
              <SketchUnderline color="green">YOLO detects objects and ByteTrack stabilizes Track IDs</SketchUnderline>. Results return to the matching Unity arm.
            </p>
          </div>

          <div className="sf-copy sf-copy--pick" data-anim="slide-up">
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

          <div className="sf-primary-media">
            <MediaGrid
              items={[
                {
                  path: '/SortingFactory/redline.webp',
                  alt: 'Unity sorting line showing YOLO detections and the red latest pick line',
                  description: 'YOLO detection and the time-aware Latest Pick Line inside Unity',
                },
              ]}
              columns={1}
              isMobile={isMobile}
              idPrefix="sorting-redline"
              onItemClick={handleImageClick}
            />
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

          <div className="sf-copy sf-copy--single" data-anim="slide-up">
            <p>
              Every initiated action ends as a success, failure, or abandoned attempt. The outcome—together with its reason, Track ID, timing, and joint data—is written to that session&apos;s CSV file, creating structured episodes for future robotics training.
            </p>
          </div>

        </EditorialSection>

        <EditorialSection id="web-control-panel" kicker="CHAPTER 03" title="Web Control Panel" kickerVariant="rust">
          <div className="sf-copy" data-anim="slide-up">
            <p>
              The control room gives me a live view of all three robotic arms, including each arm&apos;s{' '}
              <SketchUnderline color="blue">work state, successful picks, and failed picks</SketchUnderline>.
            </p>
            <p>
              <SketchUnderline color="pink">Success and failure rates</SketchUnderline> stay visible throughout the session, making it easier to monitor performance and preserve consistent statistics for later analysis.
            </p>
          </div>

          <div className="sf-primary-media">
            <MediaGrid
              items={[
                {
                  path: '/SortingFactory/controlroom.webp',
                  alt: 'Browser control room showing the live status and pick statistics of three robotic arms',
                  description: 'Live arm status, success rate, and failure rate across all three workstations',
                },
              ]}
              columns={1}
              isMobile={isMobile}
              idPrefix="sorting-control-room"
              onItemClick={handleImageClick}
            />
          </div>

        </EditorialSection>

        <EditorialSection id="tool-stack" kicker="CHAPTER 04" title="Tool Stack">
          <div className="sf-tool-grid">
            {toolGroups.map((group, index) => (
              <article
                key={group.title}
                className={`sf-tool-card sf-tool-card--${group.tone}`}
                data-anim={index % 2 === 0 ? 'slide-left' : 'slide-right'}
              >
                <span className="sf-tool-card__index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{group.title}</h3>
                <div className="sf-tool-card__tags">
                  {group.tools.map((tool) => <span key={tool}>{tool}</span>)}
                </div>
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
          margin-top: 58px;
        }
        .sf-copy--pick { margin-top: 86px; }
        .sf-primary-media {
          max-width: 1100px;
          margin: 0 auto 72px;
        }
        .sf-code-panel {
          max-width: 780px;
          margin: 0 auto;
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
        .sf-tool-grid {
          max-width: 980px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 26px;
        }
        .sf-tool-card {
          min-height: 220px;
          padding: 30px;
          border: 2px solid rgba(255, 255, 255, .9);
          border-radius: 28px;
          box-shadow: 0 10px 0 var(--sf-card-shadow);
        }
        .sf-tool-card--sage {
          --sf-card-shadow: #c5d696;
          background: #edf4d6;
        }
        .sf-tool-card--blue {
          --sf-card-shadow: #add8e7;
          background: #e1f2f8;
        }
        .sf-tool-card--pink {
          --sf-card-shadow: #ddb9cb;
          background: #f7e6ef;
        }
        .sf-tool-card--sand {
          --sf-card-shadow: #dfc49d;
          background: #f5ead9;
        }
        .sf-tool-card__index {
          display: inline-flex;
          width: 36px;
          height: 36px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, .7);
          font: 500 11px/1 var(--sans);
          letter-spacing: .05em;
        }
        .sf-tool-card h3 {
          margin: 24px 0 22px;
          font: italic 700 clamp(23px, 2.8vw, 34px)/1.05 var(--serif);
          text-transform: uppercase;
          color: var(--ink);
        }
        .sf-tool-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .sf-tool-card__tags span {
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, .82);
          box-shadow: 0 3px 0 rgba(26, 20, 13, .14);
          font: 600 12px/1 var(--sans);
          color: var(--ink);
        }
        @media (max-width: 820px) {
          .sf-copy,
          .sf-tool-grid { grid-template-columns: 1fr; }
          .sf-code-panel__header { grid-template-columns: 1fr; }
          .sf-code-panel__header span:last-child { display: none; }
          .sf-code-panel__footer { grid-template-columns: 1fr; }
          .sf-code-panel__footer span + span {
            border-left: 0;
            border-top: 1px solid rgba(255, 255, 255, .12);
          }
          .sf-tool-card { min-height: 0; }
        }
      `}</style>
    </>
  );
}
