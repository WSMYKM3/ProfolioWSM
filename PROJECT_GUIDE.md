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
- **Layout**: Fixed sidebar + centered card display (slot machine effect)
- **Image Handling**: Next.js Image component with conditional basePath for dev/prod

### Current State

- ✅ Home page with slot machine card display
- ✅ Work page with tunnel effect (optional)
- ✅ Individual project detail pages
- ✅ Modal system for post content
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
│   │   ├── Sidebar.tsx          # Left sidebar navigation
│   │   ├── PostCard.tsx         # Individual post card component
│   │   ├── PostGrid.tsx         # Slot machine grid (main display)
│   │   ├── Modal.tsx            # Modal overlay for post details
│   │   └── posts/               # Post content components
│   │       ├── Post1.tsx
│   │       ├── Post2.tsx
│   │       ├── Post3.tsx
│   │       └── Post4.tsx
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
- **Purpose**: Main portfolio page with slot machine card display
- **Key Features**:
  - Manages modal state (`selectedPost`, `isModalOpen`)
  - Renders `Sidebar` and `PostGrid`
  - Handles post click events

#### `app/components/PostGrid.tsx` (Slot Machine Display)
- **Type**: Client Component
- **Purpose**: Implements the slot machine effect (2 cards at center, preview cards above/below)
- **Key Features**:
  - Scroll wheel event handling (prevents page scroll)
  - Touch event support (mobile)
  - 3D flip animations (rotateY)
  - Preview cards with reduced opacity/scale/blur
  - Fixed positioning relative to main content area

**Critical Implementation Details**:
```typescript
// Prevents page scrolling, only switches cards
window.addEventListener('wheel', handleWheel, { passive: false });
window.addEventListener('touchmove', handleTouchMove, { passive: false });

// Card positioning: absolute relative to main-content
position: 'absolute'  // Not 'fixed' - relative to parent
```

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
  quality?: 'high' | 'medium' | 'low';  // Optional (not used in current implementation)
}
```

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
  - Dark Morandi color scheme (`#2a2d35` background)
  - Fixed sidebar (200px width, 60px left margin)
  - Main content area (absolute positioning, left: 260px)
  - Slot machine container (absolute, centered in main content)
  - Post card styles (450x450px uniform size)
  - Responsive breakpoints (mobile, tablet)

---

## Key Features & Implementation

### 1. Slot Machine Card Display

**Location**: `app/components/PostGrid.tsx`

**How It Works**:
1. **Card State Management**:
   - `currentIndex`: Tracks which pair of cards is currently displayed
   - `isAnimating`: Prevents rapid scrolling during animations

2. **Card Layout**:
   - **Top Preview**: 2 cards (opacity: 0.15, scale: 0.5, blur: 3px)
   - **Center Display**: 2 cards (opacity: 1, scale: 1, no blur)
   - **Bottom Preview**: 2 cards (opacity: 0.15, scale: 0.5, blur: 3px)

3. **Scroll Handling**:
   - `handleWheel`: Intercepts mouse wheel events
   - Prevents default page scrolling (`e.preventDefault()`)
   - Debounced navigation (100ms timeout)
   - Switches cards in pairs (2 at a time)

4. **3D Flip Animation**:
   - Uses `framer-motion` with `rotateY` transform
   - Center cards flip in/out (90° rotation)
   - Preview cards fade in/out smoothly

**Code Structure**:
```typescript
const getVisibleCards = () => {
  // Returns array of cards with positions: 'top' | 'center' | 'bottom'
  // Handles edge cases (beginning/end of posts array)
}

const handleNavigation = (direction: 'up' | 'down') => {
  // Updates currentIndex by ±2
  // Sets isAnimating flag
  // Resets after animation completes (800ms)
}
```

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

### 4. Dark Morandi Theme

**Color Palette** (defined in `app/globals.css`):
- Background: `#2a2d35` (dark blue-grey)
- Cards: `#3a3d45` (slightly lighter)
- Text: `#e8e8e8` (light grey)
- Secondary Text: `#b0b0b0` (medium grey)
- Borders: `#3a3d45` (subtle)

**Implementation**:
- Applied to `body`, `.sidebar`, `.post-card`, `.modal-content`
- Ensures consistent dark theme across all components

### 5. Responsive Design

**Breakpoints** (in `app/globals.css`):
- **Mobile**: `@media (max-width: 768px)`
  - Sidebar: Hidden or collapsed
  - Cards: Single column, smaller size
  - Touch events: Swipe gestures
- **Tablet**: `@media (max-width: 1024px)`
  - Adjusted spacing and card sizes
- **Desktop**: Default (full layout)

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

### Issue 3: Page Still Scrolls (Slot Machine Effect)

**Symptoms**:
- Page scrollbar moves when scrolling cards
- Cards not staying in fixed position

**Cause**: Global scroll not prevented

**Solution**:
1. Check `app/globals.css`:
   ```css
   html, body {
     height: 100%;
     overflow: hidden;  /* Prevent global scrolling */
   }
   ```

2. Verify `PostGrid.tsx`:
   ```typescript
   window.addEventListener('wheel', handleWheel, { passive: false });
   window.addEventListener('touchmove', handleTouchMove, { passive: false });
   ```

### Issue 4: Cards Not Centered

**Symptoms**:
- Cards appear too far left or right
- Not centered relative to sidebar

**Cause**: Incorrect positioning calculations

**Solution**:
1. Check `.main-content` positioning in `globals.css`:
   ```css
   .main-content {
     position: absolute;
     left: 260px;  /* Sidebar width (200px) + margin (60px) */
     width: calc(100% - 260px);
   }
   ```

2. Verify `.slot-machine-container`:
   ```css
   .slot-machine-container {
     position: absolute;  /* Relative to main-content */
     width: 100%;
     height: 100%;
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

1. **Create Post Component** (`app/components/posts/Post5.tsx`):
   ```tsx
   export default function Post5() {
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

2. **Add Post Data** (`app/lib/posts.ts`):
   ```typescript
   {
     id: "post-5",
     title: "My Post Title",
     thumbnail: "/images/thumbnail.jpg",
     file: "post-5",
     date: "2024-01-01",
     tags: ["design", "web"]
   }
   ```

3. **Register Component** (`app/components/Modal.tsx`):
   ```typescript
   import Post5 from './posts/Post5';
   
   const postComponents = {
     // ... existing
     'post-5': Post5,
   };
   ```

### Modifying Card Display

**Location**: `app/components/PostGrid.tsx`

**Common Modifications**:
- **Card Size**: Change `width: 450px` in `PostCard.tsx` and `globals.css`
- **Cards Per View**: Modify `currentIndex` increment (currently ±2)
- **Animation Speed**: Adjust `duration` in `motion.div` transitions
- **Preview Opacity**: Change `opacity: 0.15` in preview card styles

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

**Last Updated**: 2024-01-XX
**Maintained By**: AI Development Team
**Project Status**: Active Development

