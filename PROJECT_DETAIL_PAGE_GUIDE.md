# Project Detail Page Guide

This guide explains how to create and configure project detail pages that appear in modals when users click on project cards or "Check Project Details" buttons.

## Overview

Project detail pages are displayed in a modal overlay on the same page (no navigation). They consist of:
1. **PostDetailView** - The main container component that shows common project information
2. **Post Components** - Detailed content components (Post1.tsx, Post2.tsx, etc.) that provide project-specific sections

## Architecture

### Components Structure

```
app/components/
├── Modal.tsx              # Modal wrapper that displays PostDetailView
├── PostDetailView.tsx     # Main detail view with video, metadata, and Post component
└── posts/
    ├── Post1.tsx          # Detailed content for post-1 (Datnie)
    ├── Post2.tsx          # Detailed content for post-2
    ├── Post3.tsx          # Detailed content for post-3
    └── Post4.tsx          # Detailed content for post-4
```

### Data Flow

1. User clicks postcard or "Check Project Details" button
2. Modal opens with `PostDetailView` component
3. `PostDetailView` renders:
   - YouTube video embed (if available)
   - Project metadata (Role, Timeline, Tools)
   - Project description and features
   - **Post component** (Post1, Post2, etc.) for detailed content

## Creating a New Project Detail Page

### Step 1: Update Post Data

Edit `app/lib/posts.ts` and update or create a post entry:

```typescript
{
  id: "post-X",                    // Unique ID (e.g., "post-1", "post-2")
  title: "Project Name",
  thumbnail: "/project-thumbnail.png",
  file: "post-X",                   // Must match id (used for routing if needed)
  date: "Timeline description",     // Can be custom format like "1 month for XRCC 2025 hackathon"
  tags: ["tag1", "tag2"],
  quality: "medium",                // "high" | "medium" | "low"
  videoUrl: "https://www.youtube.com/embed/VIDEO_ID",  // YouTube embed URL (not watch URL)
  videoTitle: "Video Title",
  description: "Project description text",
  softwareTools: ["Unity6", "Unreal Engine", "Blender"],  // Tool names (will show SVG icons)
  features: ["Feature 1", "Feature 2", "Feature 3"],
  role: "Your Role in Project"
}
```

**Important Notes:**
- `videoUrl` should be in embed format: `https://www.youtube.com/embed/VIDEO_ID`
- `softwareTools` array will automatically display SVG icons if available in `/public/icons/`
- The `id` field determines which Post component to render (e.g., "post-1" → Post1.tsx)

### Step 2: Create or Update Post Component

Create or edit `app/components/posts/PostX.tsx` (where X matches your post id):

```typescript
'use client';

import Image from 'next/image';
import SoftwareIcon from '../SoftwareIcon';

// Helper function to add basePath for GitHub Pages
function getImageSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}

export default function PostX() {
  return (
    <div className="post-content">
      <div className="text-content">
        {/* Tools Section */}
        <section style={{ marginTop: '32px', marginBottom: '48px' }}>
          <h2 style={{ 
            fontSize: '1.75rem', 
            fontWeight: 700, 
            color: '#fff', 
            marginBottom: '24px',
            borderBottom: '2px solid rgba(255,255,255,0.2)',
            paddingBottom: '12px',
            textAlign: 'center'
          }}>
            Tools
          </h2>
          <div style={{ 
            display: 'flex', 
            gap: '32px', 
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <SoftwareIcon name="Unity6" size={100} />
            <SoftwareIcon name="Unreal Engine" size={100} />
            <SoftwareIcon name="Blender" size={100} />
          </div>
        </section>

        {/* Your Custom Sections */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ 
            fontSize: '1.75rem', 
            fontWeight: 700, 
            color: '#fff', 
            marginBottom: '24px',
            borderBottom: '2px solid rgba(255,255,255,0.2)',
            paddingBottom: '12px',
            textAlign: 'center'
          }}>
            Section Title
          </h2>
          {/* Your content here */}
        </section>
      </div>
    </div>
  );
}
```

### Step 3: Register Post Component

Update `app/components/PostDetailView.tsx` to include your new Post component:

```typescript
import PostX from './posts/PostX';

const postComponents: Record<string, React.ComponentType> = {
  'post-1': Post1,
  'post-2': Post2,
  'post-3': Post3,
  'post-4': Post4,
  'post-X': PostX,  // Add your new component here
};
```

## Styling Guidelines

### Color Scheme (Dark Theme)

The modal uses a dark theme. Use these colors:

- **Text Colors:**
  - Headings: `#fff`
  - Body text: `#d0d0d0`
  - Secondary text: `#aaa`
  - Borders: `rgba(255,255,255,0.2)`

- **Background Colors:**
  - Image placeholders: `#1a1a1a`
  - Sections: Transparent (inherits from modal)

### Section Structure

Each section should follow this pattern:

```typescript
<section style={{ marginBottom: '48px' }}>
  <h2 style={{ 
    fontSize: '1.75rem', 
    fontWeight: 700, 
    color: '#fff', 
    marginBottom: '24px',
    borderBottom: '2px solid rgba(255,255,255,0.2)',
    paddingBottom: '12px',
    textAlign: 'center'
  }}>
    Section Title
  </h2>
  {/* Section content */}
</section>
```

### Image Handling

Always use the `getImageSrc` helper function for images:

```typescript
<Image
  src={getImageSrc('/path/to/image.jpg')}
  alt="Description"
  fill
  style={{ objectFit: 'cover' }}
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/800x450/2a2a2a/888888?text=Placeholder';
  }}
/>
```

## Tools Section with SVG Icons

The Tools section uses the `SoftwareIcon` component which automatically displays SVG icons:

1. **Add SVG files** to `/public/icons/` directory:
   - `unity.svg`
   - `unrealengine.svg`
   - `blender.svg`
   - `touchdesigner.svg`
   - `github.svg`
   - Add more as needed

2. **Update SoftwareIcon mapping** in `app/components/SoftwareIcon.tsx`:
   ```typescript
   const iconImages: Record<string, string> = {
     Unity: '/icons/unity.svg',
     'Unreal Engine': '/icons/unrealengine.svg',
     Blender: '/icons/blender.svg',
     // Add more mappings
   };
   ```

3. **Use in Post component**:
   ```typescript
   <SoftwareIcon name="Unity6" size={48} />
   <SoftwareIcon name="Unreal Engine" size={48} />
   ```

The component automatically:
- Extracts base tool name (removes version numbers)
- Maps to correct SVG file
- Handles GitHub Pages basePath
- Applies dark theme styling

## Common Sections

### Tools Section
```typescript
<section style={{ marginTop: '32px', marginBottom: '48px' }}>
  <h2 style={{ 
    fontSize: '1.75rem', 
    fontWeight: 700, 
    color: '#fff', 
    marginBottom: '24px',
    borderBottom: '2px solid rgba(255,255,255,0.2)',
    paddingBottom: '12px',
    textAlign: 'center'
  }}>
    Tools
  </h2>
  <div style={{ 
    display: 'flex', 
    gap: '32px', 
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <SoftwareIcon name="ToolName" size={100} />
  </div>
</section>
```

### Image/GIF Grid
```typescript
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '24px'
}}>
  <div style={{
    position: 'relative',
    width: '100%',
    aspectRatio: '16/9',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#1a1a1a'
  }}>
    <Image src={getImageSrc('/path/to/image.jpg')} alt="Description" fill />
  </div>
</div>
```

### Text Content
```typescript
<p style={{ 
  fontSize: '1rem', 
  lineHeight: '1.8', 
  color: '#d0d0d0',
  marginBottom: '16px'
}}>
  Your text content here
</p>
```

## Example: Datnie Project (Post1)

See `app/components/posts/Post1.tsx` for a complete example with:
- Tools section with SVG icons
- Ideation section with text
- UX Design section with image and GIF grid
- Prototype section with 10 GIF placeholders

## Media Placeholders

When creating placeholders for media files:

- **Images**: `/path/to/image.jpg`
- **GIFs**: `/gifs/project-name-section-1.gif`
- Use descriptive naming: `project-name-section-number.gif`

The `onError` handler will show placeholder images if files don't exist yet.

## Testing

1. Click on a project card from the about page or work page
2. Verify the modal opens with:
   - YouTube video (if configured)
   - Project metadata
   - Tools section with SVG icons
   - All custom sections from Post component
3. Check responsive behavior on mobile devices
4. Verify all images/GIFs load correctly or show placeholders

## Notes

- The modal stays on the same page (no navigation)
- PostDetailView automatically handles YouTube URL conversion
- All Post components should use dark theme colors
- Use `getImageSrc` helper for all image paths
- SoftwareIcon component handles SVG icon display automatically

