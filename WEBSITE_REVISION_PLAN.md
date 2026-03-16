# Portfolio Website Revision Plan

A prioritized, practical plan for improving your portfolio site. Each task is mapped to the specific file(s) you need to edit.

---

## Priority 1 — High Impact, Quick Wins

These changes take the least effort but make the strongest impression on recruiters and hiring managers.

### 1.1 Fix Page Title & Add Favicon
**Files:** `app/layout.tsx`
**Current state:** Title says "WSM_Portfolio", no custom favicon.
**What to do:**
- Change the metadata title from `"WSM_Portfolio"` to `"Siming Wang — Creative Technologist & XR Developer"`
- Add a favicon: place a `favicon.ico` (or `favicon.svg`) in `public/`, then add `<link rel="icon" href="/favicon.ico" />` inside the `<head>` via Next.js metadata, or add an `icons` field to the metadata export:
```tsx
export const metadata: Metadata = {
  title: "Siming Wang — Creative Technologist & XR Developer",
  icons: { icon: "/favicon.ico" },
};
```
**Time estimate:** 15 minutes

---

### 1.2 Rewrite the Hero Tagline
**File:** `app/page.tsx` (the intro paragraph in the hero section)
**Current state:** Generic intro text with disconnected keyword chips.
**What to do:**
- Replace the current paragraph with a single confident sentence that names a concrete outcome. For example:
  > "I build XR products that ship — from hand-tracking ASL tools to AI-powered installations exhibited internationally."
- Weave the keyword chips (games, XR products, animation trailers) into the sentence naturally instead of listing them as separate highlighted spans. If you want visual highlights, bold or color individual words *within* the sentence rather than floating them outside it.
**Time estimate:** 30 minutes (mostly copywriting iteration)

---

### 1.3 Improve Text Contrast
**File:** `app/globals.css`
**Current state:** Some body text uses dark gray (`#b0b0b0` or lower) on the `#050505` background, making it hard to read.
**What to do:**
- Search for color values in the `#999`, `#aaa`, `#b0b0b0` range used on body/description text
- Bump them to `#cccccc` or `#dddddd` for paragraph text
- Keep dimmer values only for truly secondary labels (dates, tags)
- Key selectors to check: `.about-intro`, `.strip-expanded-description`, `.post-detail` description areas, and any `color` declarations in the 5553-line `globals.css` that apply to readable paragraphs
**Time estimate:** 30–45 minutes

---

### 1.4 Add "Scroll Down" Indicator on About/Home Page
**Files:** `app/page.tsx`, `app/globals.css`
**What to do:**
- Below the hero video section, add a small animated down-arrow or "Scroll to explore" text
- Use Framer Motion (already in your stack) for a gentle bounce animation:
```tsx
<motion.div
  className="scroll-indicator"
  animate={{ y: [0, 8, 0] }}
  transition={{ repeat: Infinity, duration: 1.5 }}
>
  ↓
</motion.div>
```
- Style it in `globals.css` as centered, semi-transparent, small text
**Time estimate:** 20 minutes

---

## Priority 2 — Structural Improvements

These changes require more editing but significantly improve how recruiters evaluate your work.

### 2.1 Fix Project Card Readability (Home Page Strip Gallery)
**Files:** `app/components/ProjectGrid.tsx`, `app/globals.css`
**Current state:** Collapsed strip cards show rotated/vertical titles that are hard to read; some titles are truncated.
**What to do:**
- In `ProjectGrid.tsx`, find the collapsed card title rendering. Change the text orientation from vertical/rotated to horizontal
- Ensure the full project title is visible (no text truncation via CSS `overflow: hidden` or `text-overflow: ellipsis` on short containers)
- Add a one-line role summary beneath each title in the collapsed state, e.g. "XR Developer · Unity · Hand Tracking". You can pull this from the `role` field already in your post data
- In `globals.css`, update `.strip-collapsed` styles: remove any `writing-mode: vertical-rl` or `transform: rotate()` on the title, and add the role subtitle as a smaller gray line
**Time estimate:** 1–2 hours

---

### 2.2 Add "My Role" Labels to Project Descriptions
**Files:** `app/lib/posts.ts`, `app/components/PostDetailView.tsx`, and individual post components in `app/components/posts/Post1.tsx` through `Post6.tsx`
**Current state:** Project pages mention roles in passing, but it's unclear whether work was solo or team-based.
**What to do:**
- In `posts.ts`, ensure every post has a clear `role` field (most already do — verify all entries)
- In `PostDetailView.tsx` and each `PostX.tsx`, add a visible "My Role" section near the top of each project detail, styled as a label:
```tsx
<div className="project-role-badge">
  <span className="role-label">My Role:</span> {post.role}
  <span className="team-label">Team of 4</span> {/* or "Solo Project" */}
</div>
```
- Consider adding a `teamSize` field to your post data structure so this renders automatically
**Time estimate:** 1–2 hours

---

### 2.3 Make "Check Project Details" Button More Prominent (Work Page)
**File:** `app/work/page.tsx`
**Current state:** A vague centered button says "Check Project Details" — easy to miss.
**What to do:**
- Option A: Remove the button entirely and make each carousel card itself clickable (wrap it in a `<Link>` or add an `onClick` that navigates to `/work/[slug]`)
- Option B: Rename the button to something specific like "View Case Study →" and style it larger with a contrasting background
- Recommended: Do Option A (cards clickable) *and* add a subtle "View Case Study →" link on each card's hover/expanded state
**Time estimate:** 1 hour

---

### 2.4 Add Case Study Structure to Top 2–3 Projects
**Files:** `app/components/posts/Post1.tsx` (Datnie), `Post2.tsx` (Signie), `Post3.tsx` (I AND AI)
**Current state:** Project pages have descriptions but no structured narrative.
**What to do:**
- For your strongest 2–3 projects, restructure the content into four clear sections:
  1. **Problem** — What challenge or opportunity prompted this project?
  2. **My Role** — What specifically you did (and team context)
  3. **Process** — Key decisions, tools, iterations
  4. **Outcome / Impact** — Exhibition, award, user feedback, metrics
- Each section can be short (2–3 sentences). Wrap them in a consistent container:
```tsx
<div className="case-study-section">
  <h3>Problem</h3>
  <p>...</p>
</div>
```
- Add matching styles in `globals.css`
**Time estimate:** 2–3 hours (mostly writing the content)

---

### 2.5 Enhance the Resume Page
**File:** `app/resume/page.tsx`
**What to do:**
- Add a 2–3 sentence "Professional Summary" section at the very top (above Awards), something a recruiter can copy-paste into their ATS
- In the Awards & Exhibitions section, add dates prominently next to each item (not buried in descriptions)
- In the Tools & Technologies → Programming Languages area, add any additional languages you use: JavaScript/TypeScript, HLSL/GLSL, Blueprint scripting, etc.
- Verify the "Download Resume" button works and the PDF is up to date (`public/Siming_Wang_Creative_Technologist_XR_Resume.pdf`)
**Time estimate:** 1 hour

---

## Priority 3 — Polish & Completeness

These are important for a professional impression but can be addressed after the above.

### 3.1 Fix the Explorations Page
**Files:** `app/daily-practice/page.tsx`, `app/components/DigitalGarden.tsx`, `app/components/StickyNoteCard.tsx`, `app/lib/dailyPractice.ts`
**Current state:** Broken image placeholder visible, raw screenshots without context, looks unfinished.
**What to do:**
- In `dailyPractice.ts`, check every entry has a valid thumbnail path and that the image file exists in `public/dailypracticeThumbnail/`
- Remove or replace the "upcoming" placeholder card — if there's no content, don't show the card
- Add a 1-sentence description to each exploration card (visible in the StickyNoteCard component)
- Alternative approach: if you don't have enough polished explorations, move the best 1–2 pieces to your main Work page and hide this section from navigation until it's ready. To hide it: remove the "Explorations" link from `app/components/TopNav.tsx`
**Time estimate:** 1–2 hours

---

### 3.2 Expand the Contact Page
**File:** `app/contact/page.tsx`
**Current state:** Just an email and three social icons — very minimal.
**What to do:**
- Add an availability statement: "Currently open to full-time Creative Technologist roles in the UK/US"
- Add your location or timezone (e.g., "Based in London, UK")
- Add a warm one-liner: "Let's build something immersive together"
- Optionally add a simple contact form (you can use a service like Formspree or Netlify Forms to avoid backend work)
- Structure:
```tsx
<div className="contact-page">
  <h1>Let's Connect</h1>
  <p className="availability">Currently open to Creative Technologist roles · Based in London, UK</p>
  <p className="contact-cta">Let's build something immersive together.</p>
  <a href="mailto:simingvv@gmail.com">simingvv@gmail.com</a>
  <div className="contact-icons">...</div>
</div>
```
**Time estimate:** 30 minutes–1 hour

---

### 3.3 Home Page Project Cards — Add Short Descriptions
**Files:** `app/lib/posts.ts`, `app/components/ProjectGrid.tsx`
**Current state:** Cards only show titles; viewers must click to learn what you did.
**What to do:**
- Ensure every post in `posts.ts` has a filled `shortDescription` field (one line, ~10–15 words, focusing on your contribution)
- In `ProjectGrid.tsx`, render the `shortDescription` below the title in the collapsed card state, styled as a subtle subtitle
**Time estimate:** 1 hour

---

## Summary Checklist

| # | Task | Priority | Est. Time | Files |
|---|------|----------|-----------|-------|
| 1.1 | Fix page title & favicon | High | 15 min | `layout.tsx` |
| 1.2 | Rewrite hero tagline | High | 30 min | `page.tsx` |
| 1.3 | Improve text contrast | High | 30–45 min | `globals.css` |
| 1.4 | Add scroll indicator | High | 20 min | `page.tsx`, `globals.css` |
| 2.1 | Fix card readability | Medium | 1–2 hr | `ProjectGrid.tsx`, `globals.css` |
| 2.2 | Add "My Role" labels | Medium | 1–2 hr | `posts.ts`, `PostDetailView.tsx`, `Post1-6.tsx` |
| 2.3 | Fix "Check Details" button | Medium | 1 hr | `work/page.tsx` |
| 2.4 | Add case study structure | Medium | 2–3 hr | `Post1.tsx`, `Post2.tsx`, `Post3.tsx` |
| 2.5 | Enhance resume page | Medium | 1 hr | `resume/page.tsx` |
| 3.1 | Fix Explorations page | Lower | 1–2 hr | `daily-practice/page.tsx`, `DigitalGarden.tsx`, `dailyPractice.ts` |
| 3.2 | Expand Contact page | Lower | 30 min–1 hr | `contact/page.tsx` |
| 3.3 | Add short descriptions to cards | Lower | 1 hr | `posts.ts`, `ProjectGrid.tsx` |

**Total estimated time: ~10–15 hours of focused work**

Recommended approach: tackle all of Priority 1 in one session (under 2 hours), then work through Priority 2 over 2–3 sessions, and wrap up Priority 3 when you're ready to polish.
