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

## Image System

### Image Paths: `app/lib/posts.ts`

Images can be:
- **External URLs** (placeholder services): `"https://via.placeholder.com/400x600/..."`
- **Local images** (from `public/` folder): `"/linkedinthumbnail.png"`

### Image Component: `app/components/PostCard.tsx`

**Lines 19-28**: Helper function `getImageSrc()` handles GitHub Pages basePath:
```typescript
function getImageSrc(src: string): string {
  // If it's already a full URL (http/https), return as is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  // Add basePath for local images (GitHub Pages subdirectory)
  const basePath = '/ProfolioWSM';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}
```

**Important**: This function automatically adds `/ProfolioWSM` prefix to local images for GitHub Pages deployment, while leaving external URLs unchanged.

### Image Display: `app/globals.css` Lines 170-176

```css
.post-card img,
.post-card-image {
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
- Next.js Image component is used (imported in `PostCard.tsx`) for better optimization

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
6. **GitHub Pages Images**: Local images automatically get basePath prefix via `getImageSrc()` function in `PostCard.tsx` (line 19-28). External URLs are left unchanged.
7. **BasePath**: Must match repository name in `next.config.js`. If repo is `username.github.io`, remove basePath.

## GitHub Pages Configuration

### BasePath Setup: `next.config.js`

```javascript
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/ProfolioWSM', // Required for GitHub Pages when repo name is not username.github.io
  images: {
    unoptimized: true,
  },
}
```

**Important**: The `basePath` must match your repository name. If your repo is `username.github.io`, remove the `basePath` line.

### Image Path Handling for GitHub Pages

When using GitHub Pages with a subdirectory (repo name ≠ `username.github.io`):
- Local images need the `basePath` prefix
- The `getImageSrc()` helper function in `PostCard.tsx` handles this automatically
- External URLs (like placeholders) are left unchanged

## Common Issues and Solutions

### Issue: Images not showing on GitHub Pages (but work locally)
**Solution**: 
1. Ensure `basePath` is set correctly in `next.config.js` (must match repository name)
2. The `getImageSrc()` function in `PostCard.tsx` should handle local images automatically
3. Check that image files are committed and pushed to GitHub
4. Verify the image exists in `public/` folder and is copied to `out/` after build

### Issue: Placeholder images not showing
**Solution**: Remove `aspect-ratio` if using fixed `height`. Use only `height` + `width: 100%` + `object-fit: cover`

### Issue: Cards showing same size
**Solution**: Check that each post in `posts.ts` has a `quality` property set correctly

### Issue: Layout order not matching array order
**Solution**: This is expected with masonry layout. Use CSS Grid if strict order is needed (but loses masonry effect)

### Issue: Cards too large/small
**Solution**: Adjust `height` values in `app/globals.css` lines 127 (high), 139 (medium), 151 (low)

