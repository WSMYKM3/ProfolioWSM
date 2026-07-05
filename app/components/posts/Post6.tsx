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
import { getPostById } from '@/app/lib/posts';

function convertToEmbedUrl(url: string): string {
  if (!url) return url;
  if (url.includes('/embed/')) return url;
  if (url.includes('youtube.com/watch')) {
    const id = url.split('v=')[1]?.split('&')[0];
    if (id) return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]?.split('?')[0];
    if (id) return `https://www.youtube.com/embed/${id}`;
  }
  return url;
}

const INTRO_ITEMS: MediaGridItem[] = [
  { path: '/AetherTag/elemental counter system.png', description: 'Elemental counter system diagram' },
];

const TECHNICAL_ITEMS: MediaGridItem[] = [
  { path: '/AetherTag/Technical Design.png', description: 'Technical solution' },
  { path: '/AetherTag/prototype2.png', description: 'Combat system' },
  { path: '/AetherTag/userJourney.png', description: 'User journey' },
];

const ENEMIES_ITEMS: MediaGridItem[] = [
  { path: '/AetherTag/ene.png', description: 'Enemies of "water, fire, wind" elements' },
  { path: '/AetherTag/pro.png', description: 'Three types of projectile' },
  { path: '/AetherTag/wands.png', description: 'Three types of wand assets' },
];

const RAGDOLL_ITEMS: MediaGridItem[] = [
  { path: '/AetherTag/Ragdoll.png', description: 'Ragdoll setting for enemy' },
  { path: '/AetherTag/radgollscripts.png', description: 'Scripts to call "Dead" function' },
];

const DOUBLE_DAMAGE_ITEMS: MediaGridItem[] = [
  { path: '/AetherTag/health.png', description: 'Double damage by detecting the tag and Projectile.cs' },
];

const SHIELD_ITEMS: MediaGridItem[] = [
  { path: '/AetherTag/shied.png', description: 'Shield of four parts, timeout to be destroyed and rebuilt' },
  { path: '/AetherTag/s1.png', description: 'Shield Script 1' },
  { path: '/AetherTag/s2.png', description: 'Shield Script 2' },
];

const GAMEMANAGER_ITEMS: MediaGridItem[] = [
  { path: '/AetherTag/gamemanager.png', description: 'GameManager script' },
  { path: '/AetherTag/gamemanager2.png', description: 'GameManager' },
];

const bodyStyle = {
  fontFamily: 'var(--serif)',
  fontSize: 'clamp(18px, 1.7vw, 22px)',
  lineHeight: 1.7,
  color: 'var(--ink)',
  textAlign: 'center' as const,
  maxWidth: 900,
  margin: '0 auto 40px',
};

export default function Post6() {
  const isMobile = useIsMobile();
  const { handleImageClick, overlay } = useImageEnlarger();
  useSketchUnderlineReveal();

  const post = getPostById('post-6');
  const videoUrl = post?.videoUrl;

  return (
    <>
      {overlay}

      <div className="post-content">
        {/* ─── Video ─── */}
        {videoUrl && (
          <EditorialSection id="video" kicker="SHOWREEL" title="Aether Tag">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <MediaFrame
                src={convertToEmbedUrl(videoUrl)}
                alt="Aether Tag walkthrough"
                caption="Walkthrough video"
                isYouTube
                variant="default"
                tilt="left"
                dataAnim="rotate-in"
                width="min(900px, 96%)"
              />
            </div>
          </EditorialSection>
        )}

        {/* ─── Introduction ─── */}
        <EditorialSection id="introduction" kicker="CHAPTER 01" title="Introduction" kickerVariant="rust">
          <p style={bodyStyle}>
            We aim to create a{' '}
            <span className="sketch-underline green">
              non-violent laser tag game
              <svg viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M 2 5 Q 50 8, 100 4 T 198 6" pathLength="1" /></svg>
            </span>{' '}
            that can facilitate competitive dynamics without overt violence. In our shooting game we introduce an{' '}
            <span className="sketch-underline orange">
              &quot;elemental counter system&quot;
              <svg viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M 3 4 Q 60 9, 120 3 Q 160 7, 197 5" pathLength="1" /></svg>
            </span>
            : Water {'>'} Fire {'>'} Wind {'>'} Water. When a superior bullet hits the type of enemy it restrains, the{' '}
            <span className="sketch-underline blue">
              damage is doubled
              <svg viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M 2 4 Q 70 9, 130 3 Q 170 8, 198 5" pathLength="1" /></svg>
            </span>
            .
          </p>
          <MediaGrid
            items={INTRO_ITEMS}
            columns={1}
            isMobile={isMobile}
            idPrefix="intro"
            onItemClick={handleImageClick}
          />
        </EditorialSection>

        {/* ─── Game Design ─── */}
        <EditorialSection id="game-design" kicker="CHAPTER 02" title="Game Design">
          <EditorialSubtitle id="technical-solution">
            1.1 Technical solution
          </EditorialSubtitle>
          <MediaGrid
            items={TECHNICAL_ITEMS}
            columns={3}
            isMobile={isMobile}
            idPrefix="tech"
            onItemClick={handleImageClick}
          />

          <EditorialSubtitle id="enemies-weapons" style={{ marginTop: 80 }}>
            1.2 Enemies & weapons
          </EditorialSubtitle>
          <MediaGrid
            items={ENEMIES_ITEMS}
            columns={3}
            isMobile={isMobile}
            idPrefix="enemies"
            onItemClick={handleImageClick}
          />
        </EditorialSection>

        {/* ─── My Prototype ─── */}
        <EditorialSection id="my-prototype" kicker="CHAPTER 03" title="My Prototype" kickerVariant="rust">
          <EditorialSubtitle id="ragdoll-scripts">
            1.1 Ragdoll by scripts
          </EditorialSubtitle>
          <MediaGrid
            items={RAGDOLL_ITEMS}
            isMobile={isMobile}
            idPrefix="ragdoll"
            onItemClick={handleImageClick}
          />

          <EditorialSubtitle id="double-damage" style={{ marginTop: 80 }}>
            1.2 Double damage by tag detection + Projectile.cs
          </EditorialSubtitle>
          <MediaGrid
            items={DOUBLE_DAMAGE_ITEMS}
            columns={1}
            isMobile={isMobile}
            idPrefix="double-damage"
            onItemClick={handleImageClick}
          />

          <EditorialSubtitle id="shield-parts" style={{ marginTop: 80 }}>
            1.3 Four parts of the shield
          </EditorialSubtitle>
          <MediaGrid
            items={SHIELD_ITEMS}
            columns={3}
            isMobile={isMobile}
            idPrefix="shield"
            onItemClick={handleImageClick}
          />

          <EditorialSubtitle id="gamemanager" style={{ marginTop: 80 }}>
            1.4 GameManager
          </EditorialSubtitle>
          <MediaGrid
            items={GAMEMANAGER_ITEMS}
            isMobile={isMobile}
            idPrefix="gamemanager"
            onItemClick={handleImageClick}
          />
        </EditorialSection>
      </div>
    </>
  );
}
