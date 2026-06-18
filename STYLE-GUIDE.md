# Style Guide — Warm Cinematic / Editorial Pop

A portable design system. Copy this file, the `:root` block from `styles.css`,
the `<svg>` defs block from `index.html`, and `main.js` into a new project —
that's the whole DNA. Framework-free, ~300 lines of CSS and ~200 of JS.

---

## 1. Intent

Warm cinematic film-grade base — deep warm darks, tungsten lamp highlights,
dirty teals, oily muted pops — under an **editorial-collage rhythm**:
polaroid photos, pull-quotes, hairline-rule text columns, sticker accents
scattered like art on a wall. **Content-led, not decoration-led.**

What we are NOT: clean digital pop-art, Webflow templates, scattered sticker
chaos, hazard-tape dividers, symmetric ±2° rotations.

---

## 2. Tech stack

| Lib | CDN | Use |
|---|---|---|
| GSAP + ScrollTrigger | `cdn.jsdelivr.net/npm/gsap@3.12.5` | All scroll-driven motion |
| Lenis | `cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42` | Smooth inertial scroll |
| SplitType | `cdn.jsdelivr.net/npm/split-type@0.3.4` | Word/line text splitting |
| Fraunces (variable) | **bundled locally** `fonts/Fraunces.woff2` | All display + body italic |
| Space Grotesk | Google Fonts CDN | Kickers, labels, meta |

No framework. No build step. Open `index.html` in a browser.

---

## 3. Color palette

Drop this `:root` block at the top of your stylesheet. Every color is intentional.

```css
:root {
  /* ─── deep warm darks ─── */
  --ink:           #1a140d;   /* warm near-black; replaces pure #000 */
  --shadow-warm:   #322618;   /* base shadow tone */
  --shadow-deep:   #1c1409;   /* deepest shadow */
  --teal-shadow:   #2a423d;   /* dirty teal shadow corner */
  --teal-mid:      #4a655d;

  /* ─── tungsten highlights ─── */
  --tungsten:      #e8b85a;   /* lamp-glow yellow — NEVER digital #ffdd00 */
  --tungsten-dim:  #c89848;
  --cream-aged:    #f4e2b6;   /* parchment */
  --paper-warm:    #ead7a8;   /* film-stock cream — base background */
  --bone:          #fff5dc;   /* warm near-white */

  /* ─── oily pops ─── */
  --rust:          #c64a28;   /* oily red — accents, stickers */
  --rust-deep:     #8a3018;
  --orange:        #d97030;
  --blue-cold:     #4d80a4;   /* analog cinematic blue */
  --blue-deep:     #2c4e72;
  --olive:         #6b7a3f;

  --muted:         #6b5135;   /* muted body text */
}
```

**Section background recipe:** `--paper-warm` is the dominant page color.
Use `--shadow-warm`, `--rust-deep`, or `--teal-shadow` for **occasional**
moody sections (pull-quotes, pinned stage). Never solid `--rust` for a full
section — it screams.

**Sticker color rule:** stickers use `--rust`, `--tungsten`, `--blue-cold`,
`--olive`, `--rust-deep`. Never pure primaries. Never #ff0000.

---

## 4. Typography

Two faces. Fraunces does almost everything; Space Grotesk handles the
small UI bits.

```css
@font-face {
  font-family: "Fraunces";
  font-style: normal;
  font-weight: 400 900;
  font-display: swap;
  src: url("fonts/Fraunces.woff2") format("woff2-variations"),
       url("fonts/Fraunces.woff2") format("woff2");
}

:root {
  --serif: 'Fraunces', 'Times New Roman', serif;
  --sans:  'Space Grotesk', system-ui, sans-serif;
}
```

| Role | Face | Weight / style | Notes |
|---|---|---|---|
| Hero wordmark | Fraunces | 800, `opsz 144` | `font-variation-settings: "opsz" 144;` — max display optical size |
| Section titles | Fraunces | 700 italic | clamp(56px, 8vw, 130px) |
| Pull-quote body | Fraunces | 400 italic | clamp(28px, 4.2vw, 60px), the `em` inside gets `--rust` |
| Intro segments | Fraunces | 400 | clamp(24px, 2.6vw, 40px) |
| Body paragraphs | Fraunces | 400 | clamp(20px, 1.9vw, 28px), `opacity: 0.85` |
| Photo captions | Fraunces | 400 italic | 14–15px, color `--muted` |
| Hero tag | Fraunces | 400 italic | clamp(22px, 2.6vw, 36px) |
| Marquee | Fraunces | 600 italic | clamp(36px, 5vw, 76px) |
| Kickers / labels | Space Grotesk | 500 | 11–13px, `letter-spacing: 0.22em`, uppercase, color `--muted` or `--rust` |
| Nav meta | Fraunces | 400 italic | 14px |

**Rule:** if it's editorial, it's Fraunces italic. If it's UI metadata
(kicker, label, scroll cue), it's Space Grotesk uppercase with wide tracking.

---

## 5. Layout rhythm

```css
:root {
  --max: 1240px;                        /* content max-width */
  --pad: clamp(20px, 5vw, 80px);        /* responsive horizontal padding */
}
```

| What | Value | Why |
|---|---|---|
| Section vertical padding | 140–180px | Breathing room — the whole point |
| Section max-width | 1240px | Centered editorial column |
| Intro / quote max-width | ~900–1100px | Narrower for big serif type |
| Grid gap | 36–60px | Generous; photos need air |
| Polaroid tilt | -1.8° / +1.6° | **Asymmetric, never ±2°** |
| Photo stagger | `translateY(±20px)` via `:nth-child` | Items sit at different heights |

**The single most important layout rule:** use `:nth-child` /
`:nth-of-type` to give grid items different rotations / translateY /
shadow directions. Never apply the same transform to every card.

```css
/* good — asymmetric rhythm */
.card:nth-child(3n+1) { transform: rotate(-1.4deg) translateY(20px); }
.card:nth-child(3n+2) { transform: rotate(0.8deg)  translateY(-10px); }
.card:nth-child(3n+3) { transform: rotate(-0.6deg) translateY(40px); }

/* bad — AI tell */
.card { transform: rotate(2deg); }
```

---

## 6. Motion library

The whole motion system lives in `main.js`. Setup is the Lenis + GSAP
ticker sync — this is the *one piece you must get right* for smooth scroll
+ ScrollTrigger to feel native:

```js
const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

### `data-anim` preset table

Add `data-anim="<key>"` to any element to give it a scroll-triggered entry.

| `data-anim` | from-state | duration | ease | feeling |
|---|---|---|---|---|
| `slide-left` | `x: -260, opacity: 0` | 1.0 | `power3.out` | slides in from left |
| `slide-right` | `x: 260, opacity: 0` | 1.0 | `power3.out` | from right |
| `slide-up` | `y: 140, opacity: 0` | 0.9 | `power3.out` | rises |
| `slide-down` | `y: -140, opacity: 0` | 0.9 | `power3.out` | drops |
| `pop` | `scale: 0, opacity: 0` | 0.75 | `back.out(2.2)` | overshoots into place |
| `rotate-in` | `rotation: -55, scale: 0.3, opacity: 0` | 1.0 | `back.out(1.7)` | spins in |
| `sticker` | `y: -220, scale: 1.7, rotation: 30, opacity: 0` | 0.8 | `back.out(2.5)` | falls + settles at tilt |
| `bounce-in` | `y: -180, opacity: 0` | 1.2 | `bounce.out` | drops with real bounce |
| `flip` | `rotationX: 100, opacity: 0` | 0.9 | `back.out(1.5)` | flips on x-axis |
| `punch` | `scale: 0.25, opacity: 0` | 1.2 | `elastic.out(1, 0.5)` | elastic punch |

**Pair with `data-rest="<deg>"`** to set the resting rotation (gsap.set
runs before the from-state tween, so the tween ends at this rotation —
gives stickers their final tilt).

```html
<svg data-anim="sticker" data-rest="-12"><use href="#flower"/></svg>
```

### Special `data-` attributes

| Attribute | Selector | Effect |
|---|---|---|
| `data-split` | per-word reveal | Splits text into words, staggers `back.out(1.8)` 0.05s |
| `data-split-lines` | per-word inside masked lines | The **bouncy reveal** — `back.out(1.6)`, 0.03s stagger, random per-word rotation. **Multiple elements with this attribute each get their own ScrollTrigger** — this is the trick for sequential bouncy paragraph segments. |
| `data-scrub-mark` | scroll-scrubbed scale/drift | Hero wordmark scales 1.4× and drifts -50px as you scroll past hero |
| `data-pin-section` | pinned + scrubbed card progression | Section pins; inner `.stage-card` elements swipe through horizontally as the user scrolls. Each card swaps at its scroll position. |
| `data-marquee` | infinite horizontal loop | Track loops left infinitely, no easing |
| `data-count` | tween 0 → N | Number counts up when scrolled into view |
| `data-spin="<deg/s>"` | continuous rotation | Decorations spin slowly forever |

### Reduced motion

Wrap all setup in:

```js
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
  document.documentElement.classList.add('lenis');
  /* all gsap setup */
}
```

Reduced-motion users get a static, fully-readable page. Lenis off, no
animations, content visible from the start.

---

## 7. Components

### Hero

A wordmark + Fraunces italic tag + scroll cue. **No** giant decorations
on top of it.

```html
<section class="hero">
  <div class="hero__inner">
    <span class="hero__kicker" data-anim="slide-up">One-line context</span>
    <h1 class="hero__mark" data-scrub-mark>Project</h1>
    <p class="hero__tag" data-split>Italic editorial tagline.</p>
    <div class="hero__scroll-cue" data-anim="bounce-in">scroll ↓</div>
  </div>
</section>
```

Key CSS:

```css
.hero {
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  background: var(--paper-warm);
  position: relative;
}
.hero::before {
  /* tungsten lamp pool */
  content: ''; position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 50% 55%, rgba(232, 184, 90, 0.32), transparent 60%);
}
.hero__mark {
  font-family: var(--serif);
  font-weight: 800;
  font-variation-settings: "opsz" 144;
  font-size: clamp(96px, 22vw, 360px);
  letter-spacing: -0.04em;
}
```

### Meta strip

Four clean text columns separated by hairline rules. No colored cards.

```html
<section class="meta">
  <div class="meta__col" data-anim="slide-up">
    <span class="meta__label">Role</span>
    <p class="meta__value">XR developer</p>
  </div>
  <!-- ... -->
</section>
```

```css
.meta {
  display: grid; grid-template-columns: repeat(4, 1fr);
  padding: 110px var(--pad);
  border-top: 1px solid rgba(26, 20, 13, 0.18);
  border-bottom: 1px solid rgba(26, 20, 13, 0.18);
}
.meta__col { padding: 0 28px; border-left: 1px solid rgba(26, 20, 13, 0.12); }
.meta__col:first-child { border-left: 0; padding-left: 0; }
.meta__label { font-family: var(--sans); font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--muted); }
.meta__value { font-family: var(--serif); font-size: clamp(18px, 1.4vw, 22px); }
```

### Intro — segmented bouncy reveal

Split a long paragraph into 3–5 short segments. **Each segment gets its
own `data-split-lines`** — `splitLineReveal()` in `main.js` automatically
creates one ScrollTrigger per element, so each one bounces into place at
its own scroll point.

```html
<section class="intro">
  <p class="intro__body" data-split-lines>First short sentence.</p>
  <p class="intro__body" data-split-lines>Second short sentence.</p>
  <p class="intro__body" data-split-lines>Third short sentence.</p>
  <p class="intro__body" data-split-lines>Final beat.</p>
</section>
```

Use `:nth-of-type` to drift segments across the page asymmetrically:

```css
.intro__body { font-family: var(--serif); font-size: clamp(24px, 2.6vw, 40px); max-width: 700px; }
.intro__body + .intro__body { margin-top: 140px; }
.intro__body:nth-of-type(1) { margin-left: 0; }
.intro__body:nth-of-type(2) { margin-left: auto; text-align: right; }
.intro__body:nth-of-type(3) { margin-left: 8%; }
.intro__body:nth-of-type(4) { margin-left: auto; text-align: right; max-width: 600px; }
```

### Pull-quote with mood variants

Three colored room moods. Each has a tungsten light pool + corner shadow
overlay, plus an **oversized open-quote glyph at 25% opacity** behind the
text.

```html
<section class="quote quote--left quote--dark">
  <p class="quote__body" data-anim="slide-up">
    The hardest part wasn't the tech — it was feeling
    <em>present</em> with each other.
  </p>
  <cite class="quote__attr" data-anim="slide-up">— attribution</cite>
</section>
```

```css
.quote { position: relative; padding: 140px var(--pad); }
.quote__body {
  position: relative;
  font-family: var(--serif); font-style: italic;
  font-size: clamp(28px, 4.2vw, 60px);
  max-width: 900px;
}
.quote__body em { color: var(--rust); font-style: italic; }
.quote__body::before {
  content: '“';
  position: absolute; top: -0.6em; left: -0.15em;
  font-size: 11em; font-weight: 700; font-style: normal;
  color: var(--rust); opacity: 0.25;
  pointer-events: none;
}
.quote__attr {
  display: block;
  font-family: var(--sans); font-size: 12px;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--muted);
}

/* asymmetric pulls */
.quote--left  .quote__body { margin-right: auto; padding-right: 10%; }
.quote--right .quote__body { margin-left: auto;  padding-left: 10%; }

/* mood variants */
.quote--dark { background: var(--shadow-warm); color: var(--bone); }
.quote--rust { background: var(--rust-deep);   color: var(--bone); }
.quote--teal { background: var(--teal-shadow); color: var(--bone); }
```

### Polaroid photo placeholder

White frame, slight rotation, deep cinematic colored "image" inside with
film-grain SVG noise, handwritten Fraunces-italic caption.

```html
<figure class="photo photo--tilt-l" data-anim="rotate-in">
  <div class="photo__frame" data-shade="teal">
    <span class="photo__label">Brainstorm sketches</span>
  </div>
  <figcaption>marker on butcher paper</figcaption>
</figure>
```

```css
.photo {
  display: inline-block;
  background: var(--bone);
  padding: 14px 14px 42px;
  border: 1px solid rgba(26, 20, 13, 0.10);
  box-shadow:
    0 1px 1px rgba(26, 20, 13, 0.10),
    16px 22px 0 rgba(26, 20, 13, 0.06),
    0 8px 28px rgba(26, 20, 13, 0.18);
}
.photo__frame {
  position: relative;
  aspect-ratio: 4 / 3;
  display: flex; align-items: center; justify-content: center;
  background-image:
    radial-gradient(ellipse at 30% 25%, rgba(255, 245, 220, 0.18), transparent 55%),
    radial-gradient(ellipse at 70% 80%, rgba(20, 16, 11, 0.4), transparent 60%);
}
.photo__frame[data-shade="teal"]     { background-color: var(--teal-mid); }
.photo__frame[data-shade="rust"]     { background-color: var(--rust); }
.photo__frame[data-shade="cream"]    { background-color: var(--paper-warm); }
.photo__frame[data-shade="blue"]     { background-color: var(--blue-cold); }
.photo__frame[data-shade="olive"]    { background-color: var(--olive); }
.photo__frame[data-shade="tungsten"] { background-color: var(--tungsten); }

.photo--tilt-l { transform: rotate(-1.8deg); }
.photo--tilt-r { transform: rotate(1.6deg); }
.photo--lift   { transform: translateY(-24px); }
```

### Stage 1 — pinned scrub progression

A section that pins while inner cards swipe through horizontally as the
user scrolls. The full code lives in `pinnedStage()` in `main.js`.

```html
<section class="stage" data-pin-section>
  <div class="stage__pin">
    <div class="stage__heading"> ... </div>
    <div class="stage__track">
      <article class="stage-card"> ... </article>
      <article class="stage-card"> ... </article>
      <!-- N cards stack here, swipe through one at a time -->
    </div>
  </div>
</section>
```

The pin duration scales with card count: `cards.length * vh * 0.9`.

### Marquee

Infinite horizontal loop. Doubles its own HTML in JS so the loop is
seamless.

```html
<section class="marquee" aria-hidden="true">
  <div class="marquee__track" data-marquee>
    <span>Mixed reality</span><svg class="mq-star"><use href="#star-sm"/></svg>
    <span>Spatial design</span><svg class="mq-star"><use href="#star-sm"/></svg>
    <!-- repeat -->
  </div>
</section>
```

---

## 8. SVG sticker library

Drop this defs block at the top of `<body>`. Use sparingly — **no more
than 2 stickers per section**, never at symmetric corners, only in the
oily palette colors. They should feel like art pinned to a wall.

```html
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <symbol id="squiggle" viewBox="0 0 200 14">
      <path d="M3 7 Q16 1 30 7 T58 7 T86 7 T114 7 T142 7 T170 7 T197 7"
            fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </symbol>
    <symbol id="arrow" viewBox="0 0 120 80">
      <path d="M6 28 Q40 2 70 32 Q90 52 110 40"
            fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M110 40 L96 30 M110 40 L100 56"
            fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </symbol>
    <symbol id="star-sm" viewBox="0 0 24 24">
      <path d="M12 1 L14 9 L22 9 L16 14 L18 22 L12 17 L6 22 L8 14 L2 9 L10 9 Z" fill="currentColor"/>
    </symbol>
    <symbol id="asterisk" viewBox="0 0 40 40">
      <g fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round">
        <path d="M20 4 L20 36"/>
        <path d="M4 20 L36 20"/>
        <path d="M8 8 L32 32"/>
        <path d="M32 8 L8 32"/>
      </g>
    </symbol>
    <symbol id="smiley" viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="currentColor" stroke="#1a140d" stroke-width="3"/>
      <circle cx="22" cy="25" r="2.8" fill="#1a140d"/>
      <circle cx="38" cy="25" r="2.8" fill="#1a140d"/>
      <path d="M19 36 Q30 46 41 36" fill="none" stroke="#1a140d" stroke-width="3" stroke-linecap="round"/>
    </symbol>
    <symbol id="flower" viewBox="0 0 60 60">
      <g fill="currentColor" stroke="#1a140d" stroke-width="2.5">
        <ellipse cx="30" cy="12" rx="7" ry="11"/>
        <ellipse cx="30" cy="48" rx="7" ry="11"/>
        <ellipse cx="12" cy="30" rx="11" ry="7"/>
        <ellipse cx="48" cy="30" rx="11" ry="7"/>
      </g>
      <circle cx="30" cy="30" r="6" fill="#1a140d"/>
    </symbol>
    <symbol id="scribble" viewBox="0 0 80 80">
      <path d="M8 18 Q22 8 36 18 T68 22 Q72 36 60 44 T28 50 Q16 56 14 70"
            fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </symbol>
  </defs>
</svg>
```

### Placement rules

```css
.deco { position: absolute; pointer-events: none; z-index: 2; }
.deco--example-1 { top: 14%; left: 6%;  width: 64px; height: 64px; color: var(--rust); }
.deco--example-2 { top: 18%; right: 8%; width: 52px; height: 52px; color: var(--blue-cold); }
```

- Position at **non-round percentages** (14%, 22%, 9% — not 10%/20%/50%)
- Color via `color: var(--rust|--tungsten|--blue-cold|--olive)` — currentColor is the trick
- Width 40–80px max in body sections; up to 150px in hero
- Combine with `data-anim="sticker"` and `data-rest="<deg>"` for an entry that drops in and settles at a tilt
- Keep continuous spinning ones (`data-spin="20"`) to 1 per section max

---

## 9. AI tells to avoid

These are the patterns that make a page read as "generated, not designed."
If you catch yourself reaching for any of these, stop:

- **Symmetric rotations** like ±2°, ±5° — use hand-picked irregular
  values: -2.3°, 1.7°, -0.4°, 3.1°.
- **The same hard offset shadow everywhere** — vary direction
  (`4 5 ink` / `6 3 rust` / `3 6 ink + tungsten`).
- **Repeating-linear-gradient hazard tape** — pure template.
- **Halftone dot grid perfectly aligned** to a round value — at least
  offset `background-position`.
- **Comic text-shadow on every H2** — once, maybe. Everywhere = AI.
- **Permanent Marker font** — recognizable as the "AI handwriting".
- **Star `★` prefix everywhere** — same character, same color, same place.
- **Radial-gradient atmospheric overlays** in every section — Photoshop-AI feel.
- **Stickers at corner-symmetric positions** (top-left + bottom-right) —
  break the symmetry; place them like real art on a wall.
- **Same animation pattern for every element** — vary `data-anim` per item;
  one section's cards should not all slide in from the same direction.
- **Word-by-word reveal on every paragraph** — use it for hero tag + 1
  intro segment chain. Anywhere else, use a single `data-anim` motion.

---

## 10. File structure

Minimum viable adoption:

```
your-project/
├── index.html         # markup + SVG defs block + Google Fonts link
├── styles.css         # @font-face + :root + components
├── main.js            # Lenis+GSAP setup + motion helpers
├── fonts/
│   └── Fraunces.woff2 # ~67 kB variable font, weight 400-900
└── README.md
```

CDN deps loaded at the bottom of `<body>`:

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/split-type@0.3.4/umd/index.min.js"></script>
<script src="main.js"></script>
```

Google Fonts in `<head>`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap"
  rel="stylesheet"
/>
```

Get Fraunces locally (one-time, in shell):

```bash
mkdir -p fonts
curl -sA "Mozilla/5.0" -o fonts/Fraunces.woff2 \
  "$(curl -sA Mozilla/5.0 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..900&display=swap' | awk '/latin/{f=1} f && /url\(/{gsub(/.*url\(|\).*/,""); print; exit}')"
```

---

## 11. How to reuse

1. **Copy this file** into the new project as a quick reference.
2. **Copy the `:root` block + `@font-face`** from `styles.css` — palette,
   tokens, fonts are now identical.
3. **Copy the `<svg>` defs block** from `index.html` — sticker library.
4. **Copy `main.js` wholesale** — it's framework-free. The motion library
   works as long as your markup uses the same `data-*` attributes.
5. **Adapt the components** — pick the ones you need (hero, meta, intro,
   quote, photo, stage, marquee, footer) and drop them into your new
   page. Reword copy, swap photo shades, change segment count, vary
   sticker placement.
6. **Don't violate the rules in §9.** That's what keeps the new project
   from sliding back into AI-template territory.

---

*If a future change starts to feel template-y, ask: are we adding
**content** or **decoration**? Content wins.*
