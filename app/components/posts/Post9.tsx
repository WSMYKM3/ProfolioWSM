'use client';

import {
  EditorialSection,
  MediaFrame,
  MediaGrid,
  useImageEnlarger,
  useIsMobile,
} from '../editorial';

const fishingImages = [
  { path: '/AIGlass/fishing/1.jpeg', alt: 'Fisherman and dog facing Brighton Pier at the start of the advert' },
  { path: '/AIGlass/fishing/2.png', alt: 'Fisherman reacting as the quiet opening turns into chaos' },
  { path: '/AIGlass/fishing/3.png', alt: 'Split frame of the fisherman and dog as a seagull steals the fish' },
  { path: '/AIGlass/fishing/4.jpeg', alt: 'Dog poised to chase on Brighton beach' },
];

const chasingImages = [
  { path: '/AIGlass/chasing/1.jpeg', alt: 'Dog starting the chase near Brighton Pier' },
  { path: '/AIGlass/chasing/2.png', alt: 'Seagull flying low through a Brighton street' },
  { path: '/AIGlass/chasing/3.png', alt: 'Fisherman following the dog through the Brighton Lanes' },
  { path: '/AIGlass/chasing/4.png', alt: 'Crowd watching a street performer make a giant bubble' },
  { path: '/AIGlass/chasing/5.png', alt: 'Split frame of the seagull with the fish and the surprised fisherman' },
];

const buskingImages = [
  { path: '/AIGlass/busking/1.png', alt: 'Street performer shaping a giant iridescent bubble in the Brighton Lanes' },
  { path: '/AIGlass/busking/2.png', alt: 'Low chase shot of the dog running between the crowd' },
  { path: '/AIGlass/busking/3.png', alt: 'The crowd reaching for phones as the spectacle unfolds' },
  { path: '/AIGlass/busking/4.png', alt: 'People fumbling to record the moment on their phones' },
  { path: '/AIGlass/busking/5.jpeg', alt: 'The giant bubble filling the frame before it bursts' },
  { path: '/AIGlass/busking/6.png', alt: 'The giant bubble bursting above the cobblestones' },
  { path: '/AIGlass/busking/7.png', alt: 'AI-glasses wearer standing calmly in front of the scrambling crowd' },
];

export default function Post9() {
  const isMobile = useIsMobile();
  const { handleImageClick, overlay } = useImageEnlarger();

  return (
    <>
      {overlay}

      <div className="post-content aiglass-post">
        <EditorialSection id="character" kicker="CHAPTER 01" title="Character" kickerVariant="rust">
          <p className="aiglass-copy" data-anim="slide-up">
            The campaign begins with a Brighton fisherman who feels instantly recognisable: bold colour,
            weathered texture, and enough eccentricity to make the first frame memorable.
          </p>
          <div className="aiglass-character-grid">
            <MediaFrame
              src="/AIGlass/character/1.png"
              alt="Full-length character study of the Brighton fisherman"
              variant="contain"
              className="aiglass-character-portrait"
              dataAnim="slide-left"
              onClick={() => handleImageClick('/AIGlass/character/1.png', 'Full-length character study of the Brighton fisherman')}
            />
            <MediaFrame
              src="/AIGlass/character/2.webp"
              alt="Wide character portrait of the Brighton fisherman with fishing nets"
              variant="default"
              dataAnim="slide-right"
              onClick={() => handleImageClick('/AIGlass/character/2.webp', 'Wide character portrait of the Brighton fisherman with fishing nets')}
            />
          </div>
        </EditorialSection>

        <EditorialSection id="fishing" kicker="CHAPTER 02" title="Fishing">
          <p className="aiglass-copy" data-anim="slide-up">
            Golden-hour Brighton starts like a warm documentary. The fisherman lands his catch, the dog
            watches, and a seagull turns the calm setup into the advert&apos;s opening hook.
          </p>
          <MediaGrid
            items={fishingImages}
            columns={2}
            isMobile={isMobile}
            idPrefix="aiglass-fishing"
            className="aiglass-gallery"
            hideCaptions
            onItemClick={handleImageClick}
            gap={isMobile ? 22 : 32}
          />
        </EditorialSection>

        <EditorialSection id="chasing" kicker="CHAPTER 03" title="Chasing" kickerVariant="rust">
          <p className="aiglass-copy" data-anim="slide-up">
            The stolen fish pulls the story from the seafront into The Lanes. Low camera angles, quick
            reactions, and tightening streets build a fast but readable chain of comic chaos.
          </p>
          <MediaGrid
            items={chasingImages}
            columns={2}
            isMobile={isMobile}
            idPrefix="aiglass-chasing"
            className="aiglass-gallery aiglass-gallery--odd"
            hideCaptions
            onItemClick={handleImageClick}
            gap={isMobile ? 22 : 32}
          />
        </EditorialSection>

        <EditorialSection id="busking" kicker="CHAPTER 04" title="Busking">
          <p className="aiglass-copy" data-anim="slide-up">
            A giant soap bubble becomes the visual peak. While the crowd fumbles for phones, the final
            reveal lands the product idea: the AI-glasses wearer was present and recording all along.
          </p>
          <MediaGrid
            items={buskingImages}
            columns={2}
            isMobile={isMobile}
            idPrefix="aiglass-busking"
            className="aiglass-gallery aiglass-gallery--odd"
            hideCaptions
            onItemClick={handleImageClick}
            gap={isMobile ? 22 : 32}
          />
        </EditorialSection>
      </div>
    </>
  );
}
