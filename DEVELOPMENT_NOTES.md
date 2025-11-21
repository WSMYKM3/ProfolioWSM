# Development Notes - Portfolio Website

## Post Card Size Control System

### How Quality Affects Post Card Size

The post card size is controlled by a `quality` property in the post data, which applies different CSS classes.

#### 1. Quality Assignment Location: `app/lib/posts.ts`

Each post has a `quality` property that can be:
- `"high"` - Large size cards
- `"medium"` - Medium size cards  
- `"low"` - Small size cards

Example:
```typescript
{
  id: "post-1",
  title: "Sample Project 1",
  quality: "high" // Sets this post to large size
}
```

#### 2. CSS Class Application: `app/components/PostCard.tsx`

**Lines 21-26**: The quality value is converted to a CSS class name:
```typescript
const qualityClass = post.quality || 'medium'; // Default to 'medium'
```

**Line 29**: The CSS class is applied to the post card:
```typescript
<div className={`post-card post-card-${qualityClass}`}>
```

This creates classes like:
- `post-card post-card-high`
- `post-card post-card-medium`
- `post-card post-card-low`

#### 3. Size Styling Location: `app/globals.css`

**Lines 123-163**: Post card size styles are defined here.

**High Quality** (Lines 126-135):
```css
.post-card-high img {
    height: 280px; /* Large size - modify here to change high quality card height */
    width: 100%;
    object-fit: cover;
}
```

**Medium Quality** (Lines 138-147):
```css
.post-card-medium img {
    height: 240px; /* Medium size - modify here to change medium quality card height */
    width: 100%;
    object-fit: cover;
}
```

**Low Quality** (Lines 150-159):
```css
.post-card-low img {
    height: 200px; /* Small size - modify here to change low quality card height */
    width: 100%;
    object-fit: cover;
}
```

### How to Change Post Card Size

1. **Change a specific post's size**: Edit `app/lib/posts.ts` and change the `quality` value
2. **Change size values**: Edit `app/globals.css` lines 127, 139, or 151 to modify the `height` value

## Layout System

### Masonry Layout: `app/globals.css` Lines 102-108

```css
.posts-grid {
    position: relative;
    column-count: 3; /* 3 columns masonry layout */
    column-gap: 20px;
    width: 100%;
}
```

**Important**: Masonry layout (CSS columns) automatically fills columns based on card heights. This means the display order may differ from the array order in `posts.ts` because cards are distributed to balance column heights.

### Post Card Base Styles: `app/globals.css` Lines 110-121

```css
.post-card {
    background-color: #f5f5f5;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    break-inside: avoid; /* Prevents card from splitting across columns */
    margin-bottom: 20px; /* Row spacing */
    display: inline-block;
    width: 100%;
}
```

## Post Order

### Current Post Order: `app/lib/posts.ts`

**First Row (left to right):**
- post-1: Sample Project 1
- post-2: Mixed Media Project
- post-3: Tall Project

**Second Row (left to right):**
- post-4: Video Showcase
- post-5: Text-Based Project
- post-6: Wide Project

**Note**: Due to masonry layout, the visual order may vary based on card heights, but the array order is as listed above.

## Image Placeholder System

### Placeholder URLs: `app/lib/posts.ts`

Placeholder images use `via.placeholder.com`:
```typescript
thumbnail: "https://via.placeholder.com/400x600/cccccc/666666?text=Project+1"
```

### Image Display: `app/globals.css` Lines 170-175

```css
.post-card img {
    width: 100%;
    display: block;
    object-fit: cover; /* Maintains aspect ratio, crops if needed */
    background-color: #e0e0e0;
}
```

**Important**: 
- Do NOT use `aspect-ratio` together with fixed `height` - it causes conflicts
- Use `height` + `width: 100%` + `object-fit: cover` for proper image display
- The `height` is set in quality-specific classes (lines 127, 139, 151)

## Sidebar Configuration

### Sidebar Location: `app/components/Sidebar.tsx`

**Current Navigation Items** (Lines 8-10):
- Aenean Facili
- Mauris Lan
- Quisque Vita Est

**Information Section** (Lines 23-24):
- Email
- Instagram

### Sidebar Styling: `app/globals.css` Lines 20-31

```css
.sidebar {
    width: 200px; /* Sidebar width */
    padding: 40px 16px;
    margin-left: 60px; /* Left margin for spacing */
}
```

### Main Content Spacing: `app/globals.css` Lines 85-89

```css
.main-content {
    padding: 40px 60px 40px 80px; /* Top, right, bottom, left padding */
    margin-left: 80px; /* Space between sidebar and content */
}
```

## File Structure

```
app/
├── components/
│   ├── PostCard.tsx      # Individual post card component
│   ├── PostGrid.tsx      # Grid container component
│   ├── Modal.tsx         # Modal overlay component
│   ├── Sidebar.tsx       # Left sidebar component
│   └── posts/            # Post content components
│       ├── Post1.tsx
│       ├── Post2.tsx
│       ├── Post3.tsx
│       └── Post4.tsx
├── lib/
│   └── posts.ts          # Post data and quality assignments
├── globals.css           # All styling including size controls
├── layout.tsx            # Root layout
└── page.tsx              # Home page
```

## Key Reminders

1. **Post Card Size**: Controlled by `quality` property in `posts.ts` → CSS classes in `PostCard.tsx` → Styles in `globals.css`
2. **Image Display**: Use `height` + `width: 100%` + `object-fit: cover`. Do NOT combine `aspect-ratio` with fixed `height`
3. **Layout**: Masonry layout (CSS columns) may reorder cards based on heights
4. **Post Order**: Defined in `app/lib/posts.ts` array order
5. **Size Modification**: Edit `height` values in `app/globals.css` lines 127, 139, 151

## BasePath and Image Handling

### Image Path Handling: `app/components/PostCard.tsx`

**Important**: With static export (`output: 'export'`), Next.js Image component does NOT automatically handle `basePath`. We need to manually add basePath in production builds.

The `getImageSrc()` function in `PostCard.tsx`:
- Returns external URLs (http/https) as-is
- Adds basePath conditionally for production builds
- Keeps paths unchanged in development (no basePath)

```typescript
function getImageSrc(src: string): string {
  // External URLs: return as-is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  // Add basePath only in production builds (for GitHub Pages)
  // In development, basePath is empty so images work at localhost:3000
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}
```

### BasePath Configuration: `next.config.js`

For development and production compatibility:
```javascript
basePath: process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '',
```

This ensures:
- **Development**: Routes work at `localhost:3000/work` (no basePath)
- **Production**: Routes work at `yoursite.github.io/ProfolioWSM/work` (with basePath)

## Common Issues and Solutions

### Issue: Images showing 404 with basePath prefix in development
**Solution**: Ensure `next.config.js` has conditional basePath (empty in dev). The `getImageSrc()` function conditionally adds basePath only in production, so images work correctly in both environments.

### Issue: Images work locally but not on GitHub Pages
**Solution**: Verify that `getImageSrc()` in `PostCard.tsx` adds basePath when `process.env.NODE_ENV === 'production'`. With static export, basePath must be manually added for production builds.

### Issue: Placeholder images not showing
**Solution**: Remove `aspect-ratio` if using fixed `height`. Use only `height` + `width: 100%` + `object-fit: cover`

### Issue: Cards showing same size
**Solution**: Check that each post in `posts.ts` has a `quality` property set correctly

### Issue: Layout order not matching array order
**Solution**: This is expected with masonry layout. Use CSS Grid if strict order is needed (but loses masonry effect)

### Issue: Cards too large/small
**Solution**: Adjust `height` values in `app/globals.css` lines 127 (high), 139 (medium), 151 (low)

