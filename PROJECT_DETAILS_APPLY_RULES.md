# Project Details Apply Rules

This guide explains how to apply the design rules and structure from the Datnie project detail page to other projects.

## Overview

The Datnie project (Post1) follows a specific structure and styling that should be applied consistently across all project detail pages. This guide helps you replicate these rules for other projects.

## Current Datnie Structure

### 1. Video Section
- **Size**: 90% width, max-width 1200px
- **Position**: Centered with auto margins
- **Aspect Ratio**: 16:9
- **Styling**: Dark background, rounded corners, shadow

### 2. Metadata Grid (Role, Timeline, Tools, Features)
- **Layout**: Grid with auto-fit columns (min 200px)
- **Tools**: Display SVG icons with labels (no duplicate text)
- **Features**: Show as tags/badges
- **Styling**: Dark background with transparency

### 3. Intro Section
- **Title**: "Intro" (centered, no underline)
- **Text**: 20px font size, 53px bottom margin
- **Width**: Max 800px, centered
- **Gap**: 40px margin-bottom for title

### 4. Post Component Sections
All sections follow these rules:
- **Section Titles**: Centered, 1.75rem font size, no underline, 40px margin-bottom
- **Tools Section**: Removed (tools are in metadata grid)
- **Ideation Section**: Text on left, image on right (responsive: stacks on mobile)
- **UX Design Section**: Grid with images/GIFs (transparent background, objectFit: contain)
- **Prototype Section**: 
  - Desktop: 2 columns, 60px gap, max-width 1400px
  - Mobile: 1 column, 40px gap, padding 16px
  - Images/GIFs: Transparent background, objectFit: contain (no black borders)

## Steps to Apply Rules to Other Projects

### Step 1: Update Post Data

Edit `app/lib/posts.ts` for your project:

```typescript
{
  id: "post-X",
  title: "Your Project Name",
  thumbnail: "/your-thumbnail.png",
  file: "post-X",
  date: "Your timeline",  // Custom format supported
  tags: ["tag1", "tag2"],
  quality: "medium",
  videoUrl: "https://www.youtube.com/embed/VIDEO_ID",  // Must be embed format
  videoTitle: "Video Title",
  description: "Your project description text",
  softwareTools: ["Tool1", "Tool2", "Tool3"],  // Will show SVG icons
  features: ["Feature 1", "Feature 2", "Feature 3"],  // Will show in metadata grid
  role: "Your Role"
}
```

**Important Notes:**
- `videoUrl` must be in embed format: `https://www.youtube.com/embed/VIDEO_ID`
- `softwareTools` will automatically display SVG icons if available in `/public/icons/`
- `features` will appear in the metadata grid, not as a separate section

### Step 2: Create or Update Post Component

Create or edit `app/components/posts/PostX.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Helper function to add basePath for GitHub Pages
function getImageSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}

export default function PostX() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="post-content">
      <div className="text-content">
        {/* DO NOT include Tools Section - tools are in metadata grid */}

        {/* Ideation Section */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ 
            fontSize: '1.75rem', 
            fontWeight: 700, 
            color: '#fff', 
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            Ideation
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '24px' : '40px',
            alignItems: 'center'
          }}>
            {/* Left: Text Content */}
            <div>
              <p style={{ 
                fontSize: '1rem', 
                lineHeight: '1.8', 
                color: '#d0d0d0',
                marginBottom: '16px',
                textAlign: isMobile ? 'center' : 'left'
              }}>
                Your ideation text here...
              </p>
            </div>
            {/* Right: Image */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: isMobile ? '20px' : '40px'
            }}>
              <div style={{
                position: 'relative',
                width: isMobile ? '100%' : '70%',
                maxWidth: '450px',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: 'rgba(255,255,255,0.05)',
                padding: '20px',
                backdropFilter: 'blur(10px)'
              }}>
                <Image
                  src={getImageSrc('/your-ideation-image.png')}
                  alt="Ideation Diagram"
                  width={800}
                  height={600}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '8px'
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* UX Design Section */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ 
            fontSize: '1.75rem', 
            fontWeight: 700, 
            color: '#fff', 
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            UX Design
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '24px'
          }}>
            {/* UX Design Picture */}
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: 'transparent'
            }}>
              <Image
                src={getImageSrc('/your-ux-design.jpg')}
                alt="UX Design"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            {/* UX Design GIF */}
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: 'transparent'
            }}>
              <Image
                src={getImageSrc('/gifs/your-ux-design.gif')}
                alt="UX Design GIF"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </section>

        {/* Prototype Section */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ 
            fontSize: '1.75rem', 
            fontWeight: 700, 
            color: '#fff', 
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            Prototype
          </h2>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            color: '#d0d0d0', 
            marginBottom: '24px',
            marginTop: '16px',
            textAlign: 'center'
          }}>
            Your Stage Title
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? '40px' : '60px',
            marginTop: '24px',
            maxWidth: '1400px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: isMobile ? '0 16px' : '0'
          }}>
            {/* Your prototype items here */}
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <div
                key={num}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16/9',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: 'transparent'
                  }}
                >
                  <Image
                    src={getImageSrc(`/gifs/your-project-prototype-${num}.gif`)}
                    alt={`Prototype ${num}`}
                    fill
                    style={{ objectFit: 'contain' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/400x225/2a2a2a/888888?text=Prototype+${num}`;
                    }}
                  />
                </div>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#d0d0d0',
                  textAlign: 'center',
                  margin: 0,
                  lineHeight: 1.5
                }}>
                  [Placeholder text for prototype {num}]
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
```

### Step 3: Register Post Component

Update `app/components/PostDetailView.tsx`:

```typescript
import PostX from './posts/PostX';

const postComponents: Record<string, React.ComponentType> = {
  'post-1': Post1,
  'post-2': Post2,
  'post-3': Post3,
  'post-4': Post4,
  'post-X': PostX,  // Add your new component
};
```

## Key Rules Checklist

When creating a new project detail page, ensure:

- [ ] **Video**: 90% width, max-width 1200px, centered
- [ ] **Metadata Grid**: Contains Role, Timeline, Tools (with SVG icons), Features
- [ ] **Tools**: Only in metadata grid, NOT in Post component
- [ ] **Intro Section**: Title "Intro", 20px text, 53px bottom margin, 40px title margin-bottom
- [ ] **Section Titles**: All centered, no underline, 40px margin-bottom
- [ ] **Ideation Section**: Text left, image right (responsive layout)
- [ ] **UX Design Section**: Images/GIFs with transparent background, objectFit: contain
- [ ] **Prototype Section**: Responsive (2 cols desktop, 1 col mobile), larger gap (60px/40px), transparent background
- [ ] **Mobile Detection**: Use `useState` and `useEffect` for responsive behavior
- [ ] **Colors**: Dark theme (#fff for headings, #d0d0d0 for text)
- [ ] **Images**: No black borders - use transparent background and objectFit: contain

## Common Mistakes to Avoid

1. **Don't duplicate Tools section** - Tools are already in metadata grid
2. **Don't forget mobile responsiveness** - Always add mobile detection for Prototype section
3. **Don't use watch URLs** - Convert YouTube URLs to embed format
4. **Don't forget textAlign: 'center'** - All section titles must be centered
5. **Don't hardcode sizes** - Use responsive values (isMobile ? ... : ...)
6. **Don't use black backgrounds** - Use transparent background for images/GIFs to avoid black borders
7. **Don't use objectFit: 'cover'** - Use objectFit: 'contain' to show full image without black borders
8. **Don't add underline borders** - Section titles should not have borderBottom

## Example: Converting Post2 to Follow Datnie Rules

If Post2 currently has a different structure:

1. Remove any Tools section
2. Add mobile detection hook
3. Update Prototype section to use responsive grid
4. Center all section titles
5. Ensure video is 90% width, max 1200px
6. Add Features to metadata grid in post data

## Testing Checklist

After applying rules:

- [ ] Video displays at correct size and is centered
- [ ] Metadata grid shows Role, Timeline, Tools (with icons), Features
- [ ] No duplicate Tools section in Post component
- [ ] Intro section has correct title and styling
- [ ] All section titles are centered
- [ ] Prototype section is responsive (test on mobile)
- [ ] GIFs/images display correctly with placeholders
- [ ] Text is readable and properly spaced

## Reference Files

- **Datnie Example**: `app/components/posts/Post1.tsx`
- **Main Detail View**: `app/components/PostDetailView.tsx`
- **Post Data**: `app/lib/posts.ts`
- **Full Guide**: `PROJECT_DETAIL_PAGE_GUIDE.md`

