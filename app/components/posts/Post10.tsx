'use client';

import Image from 'next/image';
import { EditorialSection } from '../editorial';
import { getPublicAssetUrl } from '@/app/lib/publicAsset';

const loopSteps = [
  { index: '01', title: 'Almost buy', copy: 'A purchase is considered, then resisted.' },
  { index: '02', title: 'Record it', copy: 'Name the temptation, enter the amount and optionally keep a photo.' },
  { index: '03', title: 'Earn credit', copy: 'A hidden rate turns the avoided payment into spendable balance.' },
  { index: '04', title: 'Choose again', copy: 'Keep growing the number—or redirect it into something else.' },
];

const buildChecks = [
  ['Ledger', 'Persistent transactions, totals and recovery'],
  ['Commerce', 'Cart, atomic checkout and order history'],
  ['Native feel', 'Haptics, animation and local reminders'],
  ['Quality', 'Strict typing, linting and unit tests'],
  ['Platforms', 'Production bundles for iOS and Android'],
  ['Privacy', 'Accounts, settings and photos stay on-device'],
];

interface ScreenshotCardProps {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  copy?: string;
  tone?: 'acid' | 'pink' | 'mint' | 'blue' | 'paper';
  priority?: boolean;
}

function ScreenshotCard({
  src,
  alt,
  eyebrow,
  title,
  copy,
  tone = 'paper',
  priority = false,
}: ScreenshotCardProps) {
  return (
    <figure className={`couldve-shot couldve-shot--${tone}`} data-anim="slide-up">
      <div className="couldve-shot__media">
        <Image
          src={getPublicAssetUrl(src)}
          alt={alt}
          width={456}
          height={914}
          sizes="(max-width: 680px) 82vw, (max-width: 1000px) 42vw, 320px"
          priority={priority}
        />
      </div>
      <figcaption>
        <span>{eyebrow}</span>
        <strong>{title}</strong>
        {copy && <p>{copy}</p>}
      </figcaption>
    </figure>
  );
}

export default function Post10() {
  return (
    <>
      <div className="post-content couldve-post">
        <EditorialSection id="idea" kicker="CHAPTER 01" title="The Idea" kickerVariant="rust">
          <div className="couldve-intro-grid">
            <div className="couldve-statement" data-anim="slide-left">
              <p className="couldve-overline">QUESTIONABLE FINANCIAL LOGIC INCLUDED</p>
              <p className="couldve-statement-copy">
                Save money<br />
                you never had.
              </p>
              <p className="couldve-statement-note">
                Could&apos;ve formalizes a familiar piece of mental accounting: “I almost spent it, so I
                kind of saved it.” The result is useful enough to feel motivating and absurd enough to
                make the logic visible.
              </p>
            </div>

            <figure className="couldve-idea-image" data-anim="slide-right">
              <Image
                src={getPublicAssetUrl('/Couldve/kouScreenshots/mainpath.webp')}
                alt="The project path that informed the Could've idea"
                width={684}
                height={1481}
                sizes="(max-width: 760px) 88vw, 380px"
                priority
              />
              <figcaption>From an observed moment to a product premise.</figcaption>
            </figure>
          </div>
        </EditorialSection>

        <EditorialSection id="loop" kicker="CHAPTER 02" title="A Dopamine Loop">
          <p className="couldve-lede" data-anim="slide-up">
            The product borrows the speed and certainty of a transaction approval, then redirects that
            feeling toward the choice not to spend.
          </p>

          <div className="couldve-loop" role="list" aria-label="Could've core product loop">
            {loopSteps.map((step, index) => (
              <article key={step.index} className="couldve-loop-card" role="listitem" data-anim={index % 2 ? 'slide-up' : 'pop'}>
                <span className="couldve-loop-index">{step.index}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
                {index < loopSteps.length - 1 && <span className="couldve-loop-arrow" aria-hidden="true">→</span>}
              </article>
            ))}
          </div>

          <div className="couldve-loop-screens">
            <ScreenshotCard
              src="/Couldve/kouScreenshots/record.webp"
              alt="Could've screen for recording a fifteen yuan purchase not made"
              eyebrow="INPUT / ONE QUICK DECISION"
              title="Record the thing you resisted."
              copy="A bottom sheet keeps the action close to the balance: label it, enter the amount and move on."
              tone="acid"
            />
            <ScreenshotCard
              src="/Couldve/kouScreenshots/earn.webp"
              alt="Could've reward screen crediting 97 percent of an avoided purchase"
              eyebrow="OUTPUT / IMMEDIATE REWARD"
              title="Make restraint feel tangible."
              copy="The percentage, credit and new balance land as one short celebratory beat."
              tone="pink"
            />
          </div>
        </EditorialSection>

        <EditorialSection id="real-world" kicker="CHAPTER 03" title="Link to Real World Apps" kickerVariant="rust">
          <div className="couldve-section-intro" data-anim="slide-up">
            <p>
              A balance matters when it can shape the next choice. Could&apos;ve links its fictional account
              to familiar real-world app patterns—shopping, ride hailing and food delivery—so the money
              users did not spend becomes a concrete permission to spend differently.
            </p>
            <span>ONE BALANCE<br />THREE DESTINATIONS</span>
          </div>

          <div className="couldve-three-up">
            <ScreenshotCard
              src="/Couldve/kouScreenshots/Goubao.webp"
              alt="Guobao shopping screen inside Could've"
              eyebrow="01 / COMMERCE"
              title="Goubao"
              copy="Turn an abstract balance into specific objects and deliberate trade-offs."
              tone="acid"
            />
            <ScreenshotCard
              src="/Couldve/kouScreenshots/Dache.webp"
              alt="Ride-hailing concept screen inside Could've"
              eyebrow="02 / MOBILITY"
              title="Dache"
              copy="Reframe saved money as permission to make an immediate trip."
              tone="mint"
            />
            <ScreenshotCard
              src="/Couldve/kouScreenshots/Waimai.webp"
              alt="Food-delivery concept screen inside Could've"
              eyebrow="03 / DELIVERY"
              title="Waimai"
              copy="Connect everyday restraint with a smaller, more joyful reward."
              tone="pink"
            />
          </div>
        </EditorialSection>

        <EditorialSection id="design" kicker="CHAPTER 04" title="Design (UX) & Visual">
          <div className="couldve-design-principles">
            <article data-anim="slide-left">
              <span>UX PRINCIPLE 01</span>
              <h3>Keep the next action visible.</h3>
              <p>
                The home screen places recent non-purchases and the three destinations in one continuous
                path. Users can understand what they earned, then decide where that balance should lead.
              </p>
            </article>
            <article data-anim="slide-right">
              <span>UX PRINCIPLE 02</span>
              <h3>Let users set the absurdity limit.</h3>
              <p>
                A configurable overdraft acknowledges that the account is motivational, not financial
                advice. Users choose how far below zero the experiment may go, keeping agency with them.
              </p>
            </article>
          </div>

          <div className="couldve-ux-grid">
            <ScreenshotCard
              src="/Couldve/kouScreenshots/directToApp.webp"
              alt="Could've home screen directing users to commerce, ride and delivery experiences"
              eyebrow="FLOW / DIRECT TO APP"
              title="Balance becomes a decision hub."
              tone="mint"
            />
            <ScreenshotCard
              src="/Couldve/kouScreenshots/Touzhi.webp"
              alt="Could've settings screen with a user-controlled overdraft limit"
              eyebrow="CONTROL / OVERDRAFT"
              title="A boundary the user owns."
              tone="acid"
            />
            <ScreenshotCard
              src="/Couldve/kouScreenshots/profile.webp"
              alt="Could've profile screen summarizing account behavior"
              eyebrow="REFLECTION / PROFILE"
              title="Questionable numbers, clearly explained."
              tone="paper"
            />
          </div>

          <div className="couldve-visual-note" data-anim="punch">
            <span>VISUAL SYSTEM</span>
            <strong>Acid fields. Hard outlines. Oversized numbers.</strong>
            <p>
              Loud editorial color makes the reward loop energetic; paper-white utility screens lower the
              volume when people need to review stats or change settings. The contrast creates one identity
              without making every screen equally intense.
            </p>
          </div>
        </EditorialSection>

        <EditorialSection id="build" kicker="CHAPTER 05" title="Built Like a Real App" kickerVariant="rust">
          <div className="couldve-checks">
            {buildChecks.map(([title, copy], index) => (
              <article key={title} data-anim="slide-up">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="couldve-final" data-anim="slide-up">
            <span>iOS SWIFT / REACT NATIVE</span>
            <strong>Fake money.<br />Real product decisions.</strong>
          </div>
        </EditorialSection>
      </div>

      <style jsx global>{`
        .couldve-post {
          --cv-acid: #f4ff00;
          --cv-ink: #0a0a0a;
          --cv-paper: #fffdf5;
          --cv-pink: #ff2aa1;
          --cv-mint: #54f2b0;
          --cv-blue: #3b82ff;
        }
        .couldve-intro-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(280px, .85fr);
          gap: clamp(34px, 6vw, 86px);
          align-items: center;
          max-width: 1100px;
          margin: 0 auto;
        }
        .couldve-statement {
          padding: clamp(28px, 5vw, 62px);
          border: 3px solid var(--cv-ink);
          border-radius: 34px;
          background: var(--cv-acid);
          box-shadow: 10px 12px 0 var(--cv-ink);
          transform: rotate(-1.25deg);
        }
        .couldve-overline {
          margin: 0 0 26px;
          font: 800 11px/1.2 var(--sans);
          letter-spacing: .14em;
        }
        .couldve-statement-copy {
          margin: 0;
          font: 900 clamp(46px, 6.5vw, 92px)/.86 var(--sans);
          letter-spacing: -.07em;
          text-transform: uppercase;
        }
        .couldve-statement-note {
          max-width: 620px;
          margin: 42px 0 0;
          font: 650 clamp(16px, 1.5vw, 20px)/1.48 var(--sans);
        }
        .couldve-idea-image {
          width: min(100%, 372px);
          margin: 0 auto;
          padding: 14px 14px 46px;
          border: 2px solid var(--cv-ink);
          background: #fff;
          box-shadow: 10px 12px 0 var(--cv-pink);
          transform: rotate(1.8deg);
        }
        .couldve-idea-image img {
          display: block;
          width: 100%;
          height: auto;
          border: 1px solid rgba(10, 10, 10, .2);
        }
        .couldve-idea-image figcaption {
          margin-top: 18px;
          font: 700 12px/1.4 var(--sans);
          text-align: center;
        }
        .couldve-lede {
          max-width: 760px;
          margin: 0 auto 54px;
          font: 500 clamp(19px, 2vw, 26px)/1.55 var(--serif);
          text-align: center;
        }
        .couldve-loop {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          max-width: 1120px;
          margin: 0 auto;
        }
        .couldve-loop-card {
          position: relative;
          min-height: 230px;
          padding: 24px;
          border: 2px solid var(--cv-ink);
          border-radius: 22px;
          background: var(--cv-paper);
          box-shadow: 5px 6px 0 var(--cv-ink);
        }
        .couldve-loop-card:nth-child(2) { background: #ffe6f4; }
        .couldve-loop-card:nth-child(3) { background: #e3fff2; }
        .couldve-loop-card:nth-child(4) { background: #e9f1ff; }
        .couldve-loop-index { font: 800 11px/1 var(--sans); letter-spacing: .16em; }
        .couldve-loop-card h3 { margin: 52px 0 14px; font: 900 27px/.95 var(--sans); text-transform: uppercase; }
        .couldve-loop-card p { margin: 0; font: 600 14px/1.5 var(--sans); }
        .couldve-loop-arrow {
          position: absolute;
          z-index: 2;
          top: calc(50% - 20px);
          right: -30px;
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border: 2px solid var(--cv-ink);
          border-radius: 50%;
          background: var(--cv-acid);
          font: 900 22px/1 var(--sans);
        }
        .couldve-loop-screens,
        .couldve-three-up,
        .couldve-ux-grid {
          display: grid;
          gap: clamp(22px, 3vw, 38px);
          max-width: 1080px;
          margin: 80px auto 0;
          align-items: start;
        }
        .couldve-loop-screens { grid-template-columns: repeat(2, minmax(0, 1fr)); max-width: 800px; }
        .couldve-three-up,
        .couldve-ux-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .couldve-shot {
          margin: 0;
          padding: clamp(14px, 2vw, 22px);
          border: 3px solid var(--cv-ink);
          border-radius: 30px;
          box-shadow: 8px 10px 0 var(--cv-ink);
        }
        .couldve-shot--acid { background: var(--cv-acid); }
        .couldve-shot--pink { background: #ffb9dd; }
        .couldve-shot--mint { background: #baf8dc; }
        .couldve-shot--blue { background: #b9d3ff; }
        .couldve-shot--paper { background: var(--cv-paper); }
        .couldve-shot__media {
          overflow: hidden;
          border: 2px solid var(--cv-ink);
          border-radius: 25px;
          background: #0a0a0a;
        }
        .couldve-shot__media img { display: block; width: 100%; height: auto; }
        .couldve-shot figcaption { padding: 24px 5px 5px; }
        .couldve-shot figcaption > span {
          display: block;
          margin-bottom: 12px;
          font: 800 9px/1.2 var(--sans);
          letter-spacing: .14em;
        }
        .couldve-shot figcaption > strong {
          display: block;
          font: 900 clamp(19px, 2.2vw, 27px)/1.02 var(--sans);
          text-transform: uppercase;
        }
        .couldve-shot figcaption p { margin: 14px 0 0; font: 600 13px/1.48 var(--sans); }
        .couldve-section-intro {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: clamp(28px, 5vw, 72px);
          max-width: 1050px;
          margin: 0 auto;
          align-items: center;
        }
        .couldve-section-intro p {
          margin: 0;
          font: 500 clamp(18px, 1.75vw, 23px)/1.65 var(--serif);
        }
        .couldve-section-intro span {
          display: grid;
          width: 154px;
          height: 154px;
          place-items: center;
          border: 3px solid var(--cv-ink);
          border-radius: 50%;
          background: var(--cv-acid);
          box-shadow: 7px 8px 0 var(--cv-ink);
          font: 900 15px/.98 var(--sans);
          text-align: center;
          transform: rotate(7deg);
        }
        .couldve-design-principles {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
          max-width: 1050px;
          margin: 0 auto;
        }
        .couldve-design-principles article {
          min-height: 280px;
          padding: clamp(28px, 4vw, 48px);
          border: 3px solid var(--cv-ink);
          border-radius: 30px;
          box-shadow: 8px 9px 0 var(--cv-ink);
        }
        .couldve-design-principles article:first-child { background: var(--cv-mint); transform: rotate(-1deg); }
        .couldve-design-principles article:last-child { background: var(--cv-acid); transform: rotate(1deg); }
        .couldve-design-principles span { font: 800 10px/1 var(--sans); letter-spacing: .15em; }
        .couldve-design-principles h3 { margin: 50px 0 18px; font: 900 clamp(28px, 3.4vw, 43px)/.98 var(--sans); text-transform: uppercase; }
        .couldve-design-principles p { margin: 0; font: 600 15px/1.58 var(--sans); }
        .couldve-ux-grid { margin-top: 72px; }
        .couldve-visual-note {
          display: grid;
          grid-template-columns: 1.25fr .75fr;
          max-width: 1050px;
          margin: 80px auto 0;
          padding: clamp(30px, 5vw, 62px);
          border: 3px solid var(--cv-ink);
          border-radius: 32px;
          background: var(--cv-pink);
          box-shadow: 10px 12px 0 var(--cv-acid);
          gap: 24px 50px;
        }
        .couldve-visual-note span { grid-column: 1 / -1; font: 800 10px/1 var(--sans); letter-spacing: .15em; }
        .couldve-visual-note strong { font: 900 clamp(36px, 5vw, 62px)/.92 var(--sans); letter-spacing: -.045em; text-transform: uppercase; }
        .couldve-visual-note p { margin: 0; align-self: end; font: 650 15px/1.55 var(--sans); }
        .couldve-checks {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          max-width: 1060px;
          margin: 0 auto;
          border-top: 2px solid var(--cv-ink);
          border-left: 2px solid var(--cv-ink);
        }
        .couldve-checks article {
          min-height: 190px;
          padding: 24px;
          border-right: 2px solid var(--cv-ink);
          border-bottom: 2px solid var(--cv-ink);
          background: var(--cv-paper);
        }
        .couldve-checks article:nth-child(2), .couldve-checks article:nth-child(6) { background: var(--cv-acid); }
        .couldve-checks article:nth-child(3) { background: #ffe3f2; }
        .couldve-checks article:nth-child(4) { background: #e0fff0; }
        .couldve-checks span { font: 800 10px/1 var(--sans); letter-spacing: .15em; }
        .couldve-checks h3 { margin: 34px 0 12px; font: 900 25px/1 var(--sans); text-transform: uppercase; }
        .couldve-checks p { margin: 0; font: 600 14px/1.45 var(--sans); }
        .couldve-final {
          display: flex;
          max-width: 1060px;
          margin: 44px auto 0;
          padding: clamp(30px, 5vw, 64px);
          border-radius: 30px;
          background: var(--cv-ink);
          color: var(--cv-acid);
          flex-direction: column;
          gap: 34px;
        }
        .couldve-final span { font: 700 10px/1 var(--sans); letter-spacing: .15em; }
        .couldve-final strong { font: 900 clamp(42px, 7vw, 82px)/.92 var(--sans); letter-spacing: -.055em; text-transform: uppercase; }
        @media (max-width: 900px) {
          .couldve-intro-grid { grid-template-columns: 1fr; }
          .couldve-loop { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .couldve-loop-arrow { display: none; }
          .couldve-three-up,
          .couldve-ux-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .couldve-checks { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .couldve-visual-note { grid-template-columns: 1fr; }
          .couldve-visual-note span { grid-column: 1; }
        }
        @media (max-width: 620px) {
          .couldve-statement { box-shadow: 6px 7px 0 var(--cv-ink); }
          .couldve-loop,
          .couldve-loop-screens,
          .couldve-three-up,
          .couldve-ux-grid,
          .couldve-design-principles,
          .couldve-checks,
          .couldve-section-intro { grid-template-columns: 1fr; }
          .couldve-loop-card { min-height: 190px; }
          .couldve-section-intro span { width: 122px; height: 122px; }
          .couldve-shot { box-shadow: 6px 7px 0 var(--cv-ink); }
          .couldve-idea-image { box-shadow: 6px 7px 0 var(--cv-pink); }
          .couldve-design-principles article { min-height: 0; }
          .couldve-visual-note { box-shadow: 7px 8px 0 var(--cv-acid); }
        }
      `}</style>
    </>
  );
}
