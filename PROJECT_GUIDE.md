# Portfolio Website - Complete Development Guide

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Project Structure](#project-structure)
4. [Key Features & Implementation](#key-features--implementation)
5. [Development Environment Setup](#development-environment-setup)
6. [GitHub Workflow & Deployment](#github-workflow--deployment)
7. [Common Issues & Solutions](#common-issues--solutions)
8. [Future Development Guidelines](#future-development-guidelines)

---

## Project Overview

This is a modern portfolio website built with **Next.js 14** (App Router) featuring a unique "slot machine" style card display system. The website showcases creative projects in an immersive, interactive way.

### Key Characteristics

- **Framework**: Next.js 14.2.0 with App Router
- **Deployment**: Static export for GitHub Pages
- **Styling**: Custom CSS with dark Morandi color scheme
- **Animations**: Framer Motion for 3D card flip effects
- **Layout**: Scroll-snapping full-viewport sections (home) + masonry waterfall (daily practice)
- **Image Handling**: Next.js Image component with conditional basePath for dev/prod

### Current State

- ✅ Home page with scroll-snapping layout (full-viewport sections)
- ✅ Daily Practice page with Xiaohongshu-style masonry waterfall layout
- ✅ Work page with project grid
- ✅ Individual project detail pages
- ✅ Modal system for post content
- ✅ Video support with titles and multiple videos per project
- ✅ Gradient background with cloud overlay
- ✅ Frosted glass header design
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ GitHub Pages deployment configured

---

## Architecture & Technology Stack

### Core Technologies

#### Next.js 14.2.0 (App Router)
- **Why**: Modern React framework with excellent static export support
- **Key Features Used**:
  - App Router (`app/` directory)
  - Static export (`output: 'export'`)
  - Dynamic routes (`[slug]`)
  - `generateStaticParams()` for pre-rendering
  - Image optimization (with `unoptimized: true` for static export)

#### React 18.3.0
- **Client Components**: Components using `'use client'` directive
- **Server Components**: Default for App Router (no directive needed)
- **Hooks**: `useState`, `useEffect`, `useRef`, `useCallback`

#### Framer Motion 11.0.0
- **Purpose**: Smooth 3D animations and transitions
- **Key Usage**:
  - `motion.div` for animated elements
  - `AnimatePresence` for enter/exit animations
  - `useScroll`, `useTransform` for scroll-based effects (work page)

#### TypeScript 5
- **Type Safety**: Full TypeScript support
- **Interfaces**: Defined in `app/lib/posts.ts` for Post data structure

### Configuration Files

#### `next.config.js`
```javascript
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Static export for GitHub Pages
  // Conditional basePath: empty in dev, '/ProfolioWSM' in production
  basePath: process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '',
  images: {
    unoptimized: true,  // Required for static export
  },
}
```

**Critical Points**:
- `basePath` is conditional to support both local dev and GitHub Pages
- `output: 'export'` generates static HTML files
- `images.unoptimized: true` disables Next.js image optimization (required for static export)

#### `package.json`
```json
{
  "scripts": {
    "dev": "next dev",      // Development server (localhost:3000)
    "build": "next build",  // Production build → creates `out/` directory
    "start": "next start",  // Production server (not used for static export)
    "lint": "next lint"     // ESLint checking
  }
}
```

---

## Project Structure

### Directory Tree

```
ProfolioWSM/
├── app/                          # Next.js App Router directory
│   ├── layout.tsx                # Root layout (wraps all pages)
│   ├── page.tsx                  # Home page (main portfolio)
│   ├── globals.css               # Global styles (dark Morandi theme)
│   │
│   ├── components/               # React components
│   │   ├── TopNav.tsx           # Top navigation bar
│   │   ├── PostCard.tsx         # Individual post card component
│   │   ├── PostSection.tsx      # Full-viewport post section (home page)
│   │   ├── PostScrollContainer.tsx  # Container for scroll-snapping sections
│   │   ├── PostGrid.tsx         # Grid layout (work page)
│   │   ├── MasonryGrid.tsx      # Waterfall masonry layout (daily practice)
│   │   ├── Modal.tsx            # Modal overlay for post details
│   │   ├── SoftwareIcon.tsx     # Software tool icon component
│   │   └── posts/               # Post content components
│   │       ├── Post1.tsx
│   │       ├── Post2.tsx
│   │       ├── Post3.tsx
│   │       └── Post4.tsx
│   │
│   ├── daily-practice/          # Daily Practice page
│   │   └── page.tsx             # Masonry waterfall layout page
│   │
│   ├── lib/
│   │   └── posts.ts             # Post data structure & utilities
│   │
│   └── work/                     # Work section pages
│       ├── page.tsx             # Work listing page (tunnel effect)
│       └── [slug]/              # Dynamic route for project details
│           ├── page.tsx         # Server component wrapper
│           └── ProjectDetailClient.tsx  # Client component
│
├── public/                       # Static assets (served at root)
│   └── linkedinthumbnail.png    # Example image
│
├── out/                         # Build output (generated, gitignored)
│   └── [static HTML files]      # Production build files
│
├── .next/                       # Next.js cache (generated, gitignored)
├── node_modules/               # Dependencies (gitignored)
│
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript configuration
│
├── README.md                    # User-facing documentation
├── DEPLOYMENT.md                # Deployment instructions
├── DEVELOPMENT_NOTES.md         # Technical notes
└── PROJECT_GUIDE.md            # This file (AI development guide)
```

### Key Files Explained

#### `app/page.tsx` (Home Page)
- **Type**: Client Component (`'use client'`)
- **Purpose**: Main portfolio page with scroll-snapping full-viewport sections
- **Key Features**:
  - Manages modal state (`selectedPost`, `isModalOpen`)
  - Renders `TopNav` and `PostScrollContainer`
  - Each project occupies full viewport height
  - Scroll-snapping for smooth navigation
  - Handles post click events

#### `app/components/PostSection.tsx` (Post Section Component)
- **Type**: Client Component
- **Purpose**: Individual full-viewport post section with two-column layout
- **Layout**:
  - **Left Column**: Postcard (thumbnail, title, metadata)
  - **Right Column**: Video player(s) + Intro section (software icons, description)
- **Key Features**:
  - Parallax scroll effects (Framer Motion)
  - Supports single or multiple videos (e.g., Datnie has 2 videos)
  - Video titles displayed above each video
  - Software tool icons with hover effects
  - Responsive: stacks vertically on mobile

#### `app/components/PostScrollContainer.tsx`
- **Type**: Client Component
- **Purpose**: Container for all post sections with scroll-snapping
- **Features**: Maps posts array to PostSection components

#### `app/daily-practice/page.tsx` (Daily Practice Page)
- **Type**: Client Component
- **Purpose**: Xiaohongshu-style masonry waterfall layout
- **Key Features**:
  - CSS column-based masonry layout (3 columns desktop, 2 tablet, 1 mobile)
  - Cards auto-size based on image aspect ratio
  - Compact spacing (12px gaps)
  - Images maintain original aspect ratio
  - Responsive column count

#### `app/components/MasonryGrid.tsx` (Waterfall Layout)
- **Type**: Client Component
- **Purpose**: Implements Xiaohongshu-style masonry waterfall layout
- **Key Features**:
  - CSS `column-count` for automatic column distribution
  - Cards break naturally based on content height
  - Responsive: 3 columns (desktop) → 2 columns (tablet) → 1 column (mobile)
  - Compact spacing with `column-gap` and `margin-bottom`
  - Images maintain aspect ratio (no fixed heights)

#### `app/components/PostCard.tsx`
- **Type**: Client Component
- **Purpose**: Individual post card display
- **Key Features**:
  - Next.js Image component
  - Conditional basePath handling (`getImageSrc()`)
  - Uniform size (450x450px)

**Image Path Handling**:
```typescript
function getImageSrc(src: string): string {
  // External URLs: use as-is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  // Add basePath only in production (GitHub Pages)
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}
```

#### `app/lib/posts.ts`
- **Type**: TypeScript module
- **Purpose**: Post data structure and utilities
- **Data Structure**:
```typescript
export interface Post {
  id: string;              // Unique identifier (e.g., "post-1")
  title: string;           // Display title
  thumbnail: string;        // Image URL (local or external)
  file: string;            // File identifier (used for routing)
  date: string;            // ISO date string (e.g., "2024-01-15")
  tags: string[];          // Array of tags
  quality?: 'high' | 'medium' | 'low';  // Optional (for masonry layout sizing)
  videoUrl?: string;        // Single video URL (YouTube/Vimeo embed or local MP4)
  videoTitle?: string;      // Title displayed above video
  videoUrls?: string[];     // Array of video URLs (for multiple videos, e.g., Datnie)
  videoTitles?: string[];   // Array of video titles corresponding to videoUrls
  description?: string;    // Project description for intro section
  softwareTools?: string[]; // Array of software tool names (e.g., ["Unity", "Blender"])
}
```

**Special Case - Multiple Videos**:
- Datnie (post-1) uses `videoUrls` array for two videos side-by-side
- Left video: 4:3 aspect ratio, larger size
- Right video: 16:9 aspect ratio, smaller size
- Responsive: stacks vertically on mobile

#### `app/work/[slug]/page.tsx` (Dynamic Route)
- **Type**: Server Component
- **Purpose**: Wrapper for project detail pages
- **Critical**: Must export `generateStaticParams()` for static export
```typescript
export function generateStaticParams() {
  const uniqueSlugs = Array.from(new Set(posts.map(post => post.file)));
  return uniqueSlugs.map(slug => ({ slug }));
}
```

#### `app/globals.css`
- **Purpose**: Global styles and theme
- **Key Styles**:
  - **Background**: Gradient from dark (`#2a2d35`) to white (`#ffffff`) with cloud overlay (`/cloud.png`)
  - **Header**: Frosted glass effect with rounded corners (backdrop-filter blur)
  - **Main content**: Scroll-snapping full-viewport sections
  - **Post sections**: Two-column grid (0.7fr postcard, 1.3fr video+intro)
  - **Masonry layout**: CSS columns (3 desktop, 2 tablet, 1 mobile)
  - **Video containers**: Responsive sizing with aspect ratios
  - **Responsive breakpoints**: Mobile (768px), Tablet (1024px)

---

## Key Features & Implementation

### 1. Scroll-Snapping Full-Viewport Layout

**Location**: `app/components/PostSection.tsx` + `app/components/PostScrollContainer.tsx`

**How It Works**:
1. **Section Structure**:
   - Each post occupies full viewport height (`100vh`)
   - Scroll-snapping enabled (`scroll-snap-type: y mandatory`)
   - Smooth scroll behavior

2. **Two-Column Layout**:
   - **Left Column (0.7fr)**: Postcard with thumbnail, title, metadata
   - **Right Column (1.3fr)**: Video player(s) + Intro section
   - Grid layout: `grid-template-columns: 0.7fr 1.3fr`

3. **Parallax Effects**:
   - Uses Framer Motion `useScroll` and `useTransform`
   - Postcard moves vertically on scroll
   - Video container has opposite parallax direction
   - Intro section fades in/out based on scroll position

4. **Video Support**:
   - Single video: Standard 16:9 aspect ratio
   - Multiple videos (Datnie): Side-by-side layout
     - Left: 4:3 aspect ratio, larger (flex: 1.2)
     - Right: 16:9 aspect ratio, smaller (flex: 1)
   - Video titles displayed above each video
   - Responsive: Stacks vertically on mobile

5. **Intro Section**:
   - Software tool icons (SVG) with hover effects
   - Project description text
   - Frosted glass background (backdrop-filter blur)

### 2. Daily Practice - Masonry Waterfall Layout

**Location**: `app/daily-practice/page.tsx` + `app/components/MasonryGrid.tsx`

**How It Works**:
1. **CSS Columns Layout**:
   - Uses `column-count: 3` (desktop)
   - Automatic distribution based on card heights
   - Compact spacing: `column-gap: 12px`, `margin-bottom: 12px`

2. **Card Sizing**:
   - Cards auto-size based on image aspect ratio
   - No fixed heights (removed quality-based sizing)
   - Images use `height: auto` to maintain aspect ratio

3. **Responsive Behavior**:
   - Desktop: 3 columns
   - Tablet (≤1024px): 2 columns
   - Mobile (≤768px): 1 column

4. **Image Handling**:
   - Images wrapped in `post-card-image-wrapper`
   - `object-fit: contain` to preserve aspect ratio
   - Placeholder images will auto-resize when replaced with real images

### 2. Image Path Handling

**Problem**: Images must work in both:
- Development: `localhost:3000` (no basePath)
- Production: `username.github.io/ProfolioWSM` (with basePath)

**Solution**: Conditional basePath in `getImageSrc()`
- Development: `process.env.NODE_ENV !== 'production'` → no basePath
- Production: `process.env.NODE_ENV === 'production'` → adds `/ProfolioWSM`

**Important**: Next.js Image component does NOT automatically add basePath in static export mode, so manual handling is required.

### 3. Static Export with Dynamic Routes

**Challenge**: Next.js static export requires pre-rendering all dynamic routes.

**Solution**: `generateStaticParams()` in `app/work/[slug]/page.tsx`
```typescript
export function generateStaticParams() {
  // Extract unique slugs from posts data
  // Return array of { slug: string } objects
  // Next.js pre-renders all these routes at build time
}
```

### 4. Background Design

**Gradient Background** (defined in `app/globals.css`):
- **Base**: Linear gradient from `#2a2d35` (dark) to `#ffffff` (white), top to bottom
- **Overlay**: Cloud image (`/cloud.png`) positioned at center top
- **Effect**: Fixed attachment for parallax-like effect
- **Implementation**:
```css
background: 
  url('/cloud.png') no-repeat center top / cover,
  linear-gradient(to bottom, #2a2d35 0%, #ffffff 100%);
background-attachment: fixed, scroll;
```

### 5. Header Design

**Frosted Glass Effect**:
- **Background**: `rgba(58, 61, 69, 0.6)` with `backdrop-filter: blur(10px)`
- **Border**: `1px solid rgba(255, 255, 255, 0.1)`
- **Border Radius**: `16px` (rounded corners)
- **Shadow**: Subtle box-shadow for depth
- **Typography**: Smaller font size (`clamp(1.25rem, 3.5vw, 2rem)`)

### 6. Dark Morandi Theme

**Color Palette** (defined in `app/globals.css`):
- Background: Gradient from `#2a2d35` (dark blue-grey) to white
- Cards: `#3a3d45` (slightly lighter)
- Text: `#e8e8e8` (light grey)
- Secondary Text: `#b0b0b0` (medium grey)
- Borders: `#3a3d45` (subtle)

**Implementation**:
- Applied to `body`, `.post-card`, `.modal-content`, `.post-section-intro`
- Ensures consistent dark theme across all components

### 7. Video Features

**Video Titles**:
- Each video displays a title above the player
- Styled with `.video-title` class
- Font size: `1rem`, weight: `600`

**Multiple Videos Support**:
- Datnie project demonstrates two-video layout
- Uses `videoUrls` and `videoTitles` arrays
- Different aspect ratios: 4:3 (left) and 16:9 (right)
- Responsive: Stacks vertically on mobile devices

**Video Embedding**:
- Supports YouTube/Vimeo iframes
- Supports local MP4/WebM files
- Automatic detection based on URL pattern

### 8. Responsive Design

**Breakpoints** (in `app/globals.css`):
- **Mobile** (`@media (max-width: 768px)`):
  - Post sections: Single column layout (stacks vertically)
  - Videos: Stack vertically (if multiple)
  - Masonry: 1 column
  - TopNav: Smaller padding and font sizes
  - Header: Reduced padding
- **Tablet** (`@media (max-width: 1024px)`):
  - Masonry: 2 columns
  - Adjusted spacing and card sizes
  - Post sections: Maintain two-column layout
- **Desktop**: Default (full layout)
  - Masonry: 3 columns
  - Post sections: Two-column grid

---

## Development Environment Setup

### Prerequisites

1. **Node.js 18+**
   - Check version: `node --version`
   - Download: https://nodejs.org/

2. **npm** (comes with Node.js)
   - Check version: `npm --version`

3. **Git** (for version control)
   - Check version: `git --version`
   - Download: https://git-scm.com/

### Initial Setup

1. **Clone Repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ProfolioWSM.git
   cd ProfolioWSM
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   This installs:
   - `next` (framework)
   - `react` & `react-dom` (UI library)
   - `framer-motion` (animations)
   - TypeScript types

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   - Opens at `http://localhost:3000`
   - Hot reload enabled (changes auto-refresh)

4. **Verify Setup**:
   - Open browser: `http://localhost:3000`
   - Should see sidebar + card display
   - Try scrolling to switch cards
   - Click a card to open modal

### Development Workflow

1. **Make Changes**:
   - Edit files in `app/` directory
   - Changes auto-reload in browser

2. **Test Locally**:
   - Check browser console for errors
   - Test on different screen sizes (dev tools)
   - Verify animations and interactions

3. **Build Test**:
   ```bash
   npm run build
   ```
   - Checks for build errors
   - Generates `out/` directory (production files)
   - Verify no TypeScript/ESLint errors

4. **Commit Changes**:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

---

## GitHub Workflow & Deployment

### GitHub Actions Workflow

**File**: `.github/workflows/deploy.yml` (create if not exists)

**Purpose**: Automatically build and deploy to GitHub Pages on every push to `main` branch.

**Workflow Steps**:
1. Trigger: Push to `main` branch
2. Setup: Install Node.js and dependencies
3. Build: Run `npm run build` (creates `out/` directory)
4. Deploy: Upload `out/` contents to `gh-pages` branch
5. GitHub Pages: Serves files from `gh-pages` branch

**Configuration**:
- Repository name: `ProfolioWSM`
- BasePath: `/ProfolioWSM` (set in `next.config.js`)
- URL: `https://YOUR_USERNAME.github.io/ProfolioWSM/`

### Manual Deployment Steps

1. **Build Locally**:
   ```bash
   npm run build
   ```

2. **Verify Build Output**:
   - Check `out/` directory exists
   - Verify all HTML files are present
   - Check image paths include basePath

3. **Deploy via GitHub Actions** (Recommended):
   - Push to `main` branch
   - GitHub Actions automatically builds and deploys
   - Check Actions tab for deployment status

4. **Manual Deploy** (Alternative):
   ```bash
   # Install gh-pages
   npm install --save-dev gh-pages
   
   # Add to package.json scripts:
   # "deploy": "npm run build && gh-pages -d out"
   
   # Deploy
   npm run deploy
   ```

### GitHub Pages Configuration

1. **Repository Settings**:
   - Go to: `Settings` → `Pages`
   - Source: `GitHub Actions` (not branch)
   - Branch: `gh-pages` (auto-created by workflow)

2. **Custom Domain** (Optional):
   - Add `CNAME` file to `public/` directory
   - Configure DNS with domain provider
   - Remove `basePath` from `next.config.js` if using root domain

### Deployment Checklist

Before deploying:
- [ ] `basePath` in `next.config.js` matches repository name
- [ ] All images are in `public/` directory
- [ ] `getImageSrc()` handles basePath correctly
- [ ] `generateStaticParams()` includes all dynamic routes
- [ ] Build completes without errors (`npm run build`)
- [ ] Test locally with production build (`npm run build && npm run start`)

---

## Common Issues & Solutions

### Issue 1: Images Not Loading on GitHub Pages

**Symptoms**:
- Images work locally but show 404 on GitHub Pages
- Console shows: `GET /ProfolioWSM/linkedinthumbnail.png 404`

**Causes**:
1. `basePath` not added to image paths in production
2. Images not in `public/` directory
3. `getImageSrc()` not handling basePath correctly

**Solution**:
1. Verify `getImageSrc()` in `PostCard.tsx`:
   ```typescript
   const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
   ```
2. Ensure images are in `public/` directory
3. Use paths starting with `/` (e.g., `/linkedinthumbnail.png`)

### Issue 2: Build Errors - "Cannot find module './819.js'"

**Symptoms**:
- Build fails with webpack chunk errors
- Random module numbers (e.g., `./819.js`, `./437.js`)

**Cause**: Corrupted Next.js build cache

**Solution**:
```bash
# Delete build cache
rm -rf .next

# Restart dev server
npm run dev

# If persists, clean reinstall
rm -rf node_modules .next
npm install
npm run dev
```

### Issue 3: Scroll Snapping Not Working

**Symptoms**:
- Sections don't snap to viewport
- Smooth scrolling not working

**Cause**: Scroll-snap CSS not applied correctly

**Solution**:
1. Check `app/globals.css`:
   ```css
   .main-content {
     scroll-snap-type: y mandatory;
     scroll-behavior: smooth;
   }
   
   .post-section {
     scroll-snap-align: start;
   }
   ```

2. Verify sections have `100vh` height:
   ```css
   .post-section {
     min-height: 100vh;
   }
   ```

### Issue 4: Videos Not Displaying Side-by-Side

**Symptoms**:
- Multiple videos stack vertically instead of horizontally
- Videos appear too large or too small

**Cause**: CSS flexbox not applied correctly

**Solution**:
1. Check `.post-section-videos-container`:
   ```css
   .post-section-videos-container {
     display: flex;
     flex-direction: row;  /* Horizontal layout */
     gap: 16px;
   }
   ```

2. Verify video sizing:
   ```css
   .post-section-video-large {
     flex: 1.2;
     aspect-ratio: 4 / 3;
   }
   
   .post-section-video-small {
     flex: 1;
     aspect-ratio: 16 / 9;
   }
   ```

3. Check mobile responsive:
   ```css
   @media (max-width: 768px) {
     .post-section-videos-container {
       flex-direction: column;  /* Stack on mobile */
     }
   }
   ```

### Issue 5: Dynamic Routes Not Working (404)

**Symptoms**:
- `/work/post-1` shows 404 on GitHub Pages
- Routes work locally but not in production

**Cause**: Missing `generateStaticParams()`

**Solution**:
1. Ensure `app/work/[slug]/page.tsx` exports:
   ```typescript
   export function generateStaticParams() {
     // Return all possible slugs
   }
   ```

2. Verify build output includes all routes:
   ```bash
   npm run build
   # Check out/work/ directory for HTML files
   ```

### Issue 6: TypeScript Errors

**Symptoms**:
- Red squiggles in IDE
- Build fails with type errors

**Solution**:
1. Check `tsconfig.json` paths:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./app/*"]
       }
     }
   }
   ```

2. Verify imports use correct paths:
   ```typescript
   import { Post } from '@/app/lib/posts';  // Correct
   import { Post } from './lib/posts';      // May fail
   ```

---

## Future Development Guidelines

### Adding New Posts

1. **Add Post Data** (`app/lib/posts.ts`):
   ```typescript
   {
     id: "post-7",
     title: "My New Project",
     thumbnail: "/images/thumbnail.jpg",
     file: "post-7",
     date: "2024-03-01",
     tags: ["design", "web"],
     quality: "medium",
     videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
     videoTitle: "Project Video Title",
     description: "A brief description of the project.",
     softwareTools: ["Figma", "React", "TypeScript"]
   }
   ```

2. **For Multiple Videos** (like Datnie):
   ```typescript
   {
     id: "post-8",
     title: "Multi-Video Project",
     // ... other fields
     videoUrls: [
       "https://www.youtube.com/embed/VIDEO_1",
       "https://www.youtube.com/embed/VIDEO_2"
     ],
     videoTitles: [
       "Main Video Title",
       "Secondary Video Title"
     ]
   }
   ```

3. **Create Post Component** (for Modal content, `app/components/posts/Post7.tsx`):
   ```tsx
   export default function Post7() {
     return (
       <div className="post-content">
         <img src="/images/my-image.jpg" alt="Description" />
         <div className="text-content">
           <h2>Post Title</h2>
           <p>Content here...</p>
         </div>
       </div>
     );
   }
   ```

4. **Register Component** (`app/components/Modal.tsx`):
   ```typescript
   import Post7 from './posts/Post7';
   
   const postComponents = {
     // ... existing
     'post-7': Post7,
   };
   ```

### Modifying Post Section Layout

**Location**: `app/components/PostSection.tsx` + `app/globals.css`

**Common Modifications**:
- **Column Ratios**: Change `grid-template-columns: 0.7fr 1.3fr` in `.post-section-container`
- **Video Size**: Adjust `flex` values in `.post-section-video-large` and `.post-section-video-small`
- **Video Aspect Ratio**: Change `aspect-ratio` values (e.g., `4 / 3`, `16 / 9`)
- **Parallax Intensity**: Modify `useTransform` ranges in `PostSection.tsx`
- **Animation Speed**: Adjust `duration` in `motion.div` transitions

### Modifying Masonry Layout

**Location**: `app/globals.css`

**Common Modifications**:
- **Column Count**: Change `column-count: 3` in `.masonry-grid`
- **Spacing**: Adjust `column-gap` and `margin-bottom` values
- **Card Size**: Modify image wrapper styles (currently auto-sizing)

### Changing Theme Colors

**Location**: `app/globals.css`

**Color Variables** (define at top for easy changes):
```css
:root {
  --bg-primary: #2a2d35;
  --bg-secondary: #3a3d45;
  --text-primary: #e8e8e8;
  --text-secondary: #b0b0b0;
}
```

Then use: `background-color: var(--bg-primary);`

### Adding New Pages

1. **Create Page File** (`app/new-page/page.tsx`):
   ```tsx
   export default function NewPage() {
     return <div>New Page Content</div>;
   }
   ```

2. **Add Navigation** (`app/components/Sidebar.tsx`):
   ```tsx
   <li><Link href="/new-page">New Page</Link></li>
   ```

3. **Build Test**: `npm run build` (verify no errors)

### Performance Optimization

1. **Image Optimization**:
   - Use Next.js Image component (already implemented)
   - Add `loading="lazy"` for below-fold images
   - Optimize image sizes before adding to `public/`

2. **Code Splitting**:
   - Next.js automatically code-splits by route
   - Use dynamic imports for heavy components:
     ```tsx
     const HeavyComponent = dynamic(() => import('./HeavyComponent'));
     ```

3. **Bundle Analysis**:
   ```bash
   npm install @next/bundle-analyzer
   # Add to next.config.js
   ```

### Testing

**Manual Testing Checklist**:
- [ ] Cards switch correctly on scroll
- [ ] Modal opens/closes properly
- [ ] Images load in dev and production
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] Touch gestures work on mobile
- [ ] All routes accessible (home, work, project details)
- [ ] Build completes without errors

**Automated Testing** (Future):
- Consider adding Jest + React Testing Library
- E2E tests with Playwright or Cypress

### Code Style Guidelines

1. **TypeScript**:
   - Always type function parameters and return values
   - Use interfaces for data structures
   - Avoid `any` type (use `unknown` if needed)

2. **React**:
   - Use functional components (no class components)
   - Prefer hooks over lifecycle methods
   - Extract reusable logic into custom hooks

3. **File Naming**:
   - Components: PascalCase (`PostCard.tsx`)
   - Utilities: camelCase (`posts.ts`)
   - Pages: lowercase (`page.tsx`)

4. **Comments**:
   - Add comments for complex logic
   - Document function purposes
   - Explain "why" not "what"

---

## Quick Reference

### Important Paths

- **Home Page**: `app/page.tsx`
- **Work Page**: `app/work/page.tsx`
- **Post Data**: `app/lib/posts.ts`
- **Styles**: `app/globals.css`
- **Config**: `next.config.js`

### Key Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Check code quality
```

### Environment Variables

- `NODE_ENV`: Automatically set by Next.js
  - `development`: Local dev server
  - `production`: Build/deployment

### Build Output

- **Directory**: `out/`
- **Contents**: Static HTML, CSS, JS files
- **Deployment**: Upload to GitHub Pages

### Repository Structure

- **Main Branch**: `main` (source code)
- **Deploy Branch**: `gh-pages` (auto-generated by GitHub Actions)
- **Build Artifacts**: `.next/` (gitignored), `out/` (gitignored)

---

## AI Assistant Instructions

When working on this project in Antigravity IDE Gemini 3 Pro:

1. **Always Check Context**:
   - Read `PROJECT_GUIDE.md` first
   - Review `README.md` for user-facing features
   - Check `DEPLOYMENT.md` for deployment issues

2. **Before Making Changes**:
   - Understand the current architecture
   - Check if similar features exist
   - Verify TypeScript types

3. **When Adding Features**:
   - Follow existing patterns (slot machine, modal system)
   - Maintain TypeScript types
   - Test in both dev and production builds
   - Update documentation if needed

4. **When Fixing Bugs**:
   - Check "Common Issues & Solutions" section
   - Verify basePath handling for images
   - Test scroll prevention for slot machine
   - Ensure `generateStaticParams()` for dynamic routes

5. **Before Committing**:
   - Run `npm run build` to verify no errors
   - Check TypeScript compilation
   - Test locally in dev mode
   - Update relevant documentation

6. **GitHub Workflow**:
   - Push to `main` branch triggers auto-deployment
   - Check Actions tab for deployment status
   - Verify deployment at GitHub Pages URL

---

## Additional Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Framer Motion**: https://www.framer.com/motion/
- **GitHub Pages**: https://docs.github.com/en/pages
- **TypeScript**: https://www.typescriptlang.org/docs/

---

**Last Updated**: 2024-12-XX
**Maintained By**: AI Development Team
**Project Status**: Active Development

---

## Recent Updates (Current Stage)

### Layout Changes
- ✅ Migrated from slot machine to scroll-snapping full-viewport layout
- ✅ Added Daily Practice page with Xiaohongshu-style masonry waterfall
- ✅ Implemented two-column post sections (postcard + video/intro)

### Design Updates
- ✅ Gradient background (dark to white) with cloud overlay
- ✅ Frosted glass header design
- ✅ Compact masonry spacing (12px gaps)

### Feature Additions
- ✅ Video titles above each video player
- ✅ Multiple video support (side-by-side layout)
- ✅ Software tool icons with hover effects
- ✅ Project descriptions in intro sections
- ✅ Responsive video layouts (stacks on mobile)

### Technical Improvements
- ✅ Framer Motion parallax effects
- ✅ Scroll-snapping for smooth navigation
- ✅ Auto-sizing images in masonry layout
- ✅ Enhanced mobile responsiveness

