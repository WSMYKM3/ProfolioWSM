# New Scroll-Snapping Layout Guide

## Overview

The homepage has been redesigned from a slot-machine layout to a **single-postcard scroll-snapping layout** with a two-column hero design. Each project is displayed one per full viewport with smooth scroll snapping.

## Layout Structure

### Each Post Section Contains:

1. **Left Column**: Main postcard
   - Project thumbnail image
   - Title and metadata (date, tags)
   - Clickable to open modal

2. **Right Column**: Video player + Intro section
   - **Video Player**: YouTube/Vimeo embed or local MP4
   - **Intro Section** (bottom-right):
     - Row of SVG software icons (Unity, Blender, etc.)
     - Project description text
     - Subtle hover animations

### Scroll Behavior

- **Natural Scrolling**: No scroll interception - uses native browser scrolling
- **Scroll Snapping**: Each section snaps to viewport (one project per scroll)
- **Smooth Animations**: Parallax effects between columns, fade-in for intro section
- **100vh Sections**: Each post section fills the full viewport height

## Component Architecture

### New Components

1. **`PostScrollContainer.tsx`**
   - Container for all post sections
   - Manages scroll snapping
   - Maps posts array to PostSection components

2. **`PostSection.tsx`**
   - Individual post section component
   - Two-column grid layout
   - Handles parallax animations
   - Manages video embedding
   - Renders intro section with icons

3. **`SoftwareIcon.tsx`**
   - SVG icon component for software tools
   - Hover effects (scale, glow, shimmer)
   - Displays tool name on hover

### Updated Data Structure

The `Post` interface now includes:
```typescript
interface Post {
  // ... existing fields
  videoUrl?: string;           // YouTube/Vimeo URL or local MP4
  description?: string;         // Project description for intro
  softwareTools?: string[];    // Array of tool names
}
```

## Adding New Posts

### Step 1: Update Post Data

Edit `app/lib/posts.ts`:

```typescript
{
  id: "post-7",
  title: "New Project",
  thumbnail: "/images/project.jpg",
  file: "post-7",
  date: "2024-03-01",
  tags: ["design", "xr"],
  videoUrl: "https://www.youtube.com/embed/VIDEO_ID",  // Optional
  description: "A creative XR project...",              // Optional
  softwareTools: ["Unity", "Blender", "TouchDesigner"] // Optional
}
```

### Step 2: Create Post Content Component

Create `app/components/posts/Post7.tsx`:

```tsx
export default function Post7() {
  return (
    <div className="post-content">
      {/* Your post content */}
    </div>
  );
}
```

### Step 3: Register in Modal

Update `app/components/Modal.tsx`:

```typescript
import Post7 from './posts/Post7';

const postComponents = {
  // ... existing
  'post-7': Post7,
};
```

## Customization

### Changing Video Sources

Videos can be:
- **YouTube**: `https://www.youtube.com/embed/VIDEO_ID`
- **Vimeo**: `https://player.vimeo.com/video/VIDEO_ID`
- **Local MP4**: `/videos/project.mp4` (place in `public/videos/`)

### Adding Software Icons

1. **Add Icon Path** in `app/components/SoftwareIcon.tsx`:
   ```typescript
   const iconPaths: Record<string, string> = {
     // ... existing
     'NewTool': 'M 12 2 L 2 7 ...', // SVG path data
   };
   ```

2. **Use in Post Data**:
   ```typescript
   softwareTools: ["Unity", "NewTool"]
   ```

### Adjusting Layout

**Two-Column Ratio**: Edit `app/globals.css`:
```css
.post-section-container {
  grid-template-columns: 1fr 1fr; /* Change ratio */
  gap: 60px; /* Adjust spacing */
}
```

**Section Height**: Edit `app/globals.css`:
```css
.post-section {
  min-height: 100vh; /* Change to 120vh for taller sections */
}
```

**Scroll Snap Behavior**: Edit `app/globals.css`:
```css
.main-content {
  scroll-snap-type: y mandatory; /* Change to 'proximity' for softer snapping */
}
```

## Animation Customization

### Parallax Intensity

Edit `app/components/PostSection.tsx`:
```typescript
const postcardY = useTransform(scrollYProgress, [0, 1], [50, -50]); // Adjust values
const videoY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
```

### Intro Section Timing

Edit `app/components/PostSection.tsx`:
```typescript
const introOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]); // Adjust range
const introY = useTransform(scrollYProgress, [0.3, 0.7], [30, 0]);
```

### Icon Hover Effects

Edit `app/components/SoftwareIcon.tsx`:
```typescript
whileHover={{ 
  scale: 1.1,  // Adjust scale
  filter: 'brightness(1.2) drop-shadow(0 0 8px rgba(255,255,255,0.3))' 
}}
```

## Responsive Behavior

### Desktop (>1024px)
- Two-column layout (postcard | video+intro)
- Full parallax effects
- All animations enabled

### Tablet (768px - 1024px)
- Single column (stacked vertical)
- Reduced animations
- Sidebar hidden

### Mobile (<768px)
- Single column
- Simplified layout
- Touch-optimized scrolling
- Smaller icons and text

## Performance Notes

- **Static Export Compatible**: All animations work with static export
- **Lazy Loading**: Images use `loading="lazy"`
- **Optimized Animations**: Uses Framer Motion's optimized transforms
- **Scroll Performance**: Uses CSS scroll-snap for smooth native scrolling

## Troubleshooting

### Scroll Not Snapping
- Check `scroll-snap-type: y mandatory` is set on `.main-content`
- Verify `scroll-snap-align: start` on `.post-section`
- Ensure sections have `min-height: 100vh`

### Videos Not Loading
- Verify `videoUrl` is correct format
- Check YouTube/Vimeo embed URLs (not watch URLs)
- For local videos, ensure file is in `public/` directory

### Icons Not Showing
- Check icon name matches entry in `iconPaths` object
- Verify `softwareTools` array in post data
- Check browser console for SVG errors

### Layout Breaking
- Verify grid layout CSS is applied
- Check for conflicting styles
- Ensure `main-content` has proper width calculations

## Migration from Old Layout

If you need to switch back to the slot machine layout:

1. Update `app/page.tsx`:
   ```tsx
   import PostGrid from './components/PostGrid'; // Instead of PostScrollContainer
   ```

2. Restore scroll prevention in `app/globals.css`:
   ```css
   html, body { overflow: hidden; }
   .main-content { overflow: hidden; }
   ```

3. Remove scroll-snapping CSS

The old `PostGrid.tsx` component is still available in the codebase.

---

**Last Updated**: 2024-01-XX  
**Layout Version**: 2.0 (Scroll-Snapping Single-Postcard)

