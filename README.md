# Portfolio Website - Masonry Layout (Next.js)

A modern portfolio website built with Next.js, featuring a Pinterest/Xiaohongshu-style masonry layout. Posts can be clicked to view detailed content in a centered modal overlay.

## Features

- **Masonry Layout**: Responsive multi-column grid that automatically arranges posts in a masonry/waterfall style
- **Clickable Posts**: Click any post to view full content in a modal overlay
- **Multiple Content Types**: Support for images, embedded videos (YouTube, Vimeo), text, and mixed content
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Smooth Animations**: Polished hover effects and modal transitions
- **Next.js Framework**: Built with React and Next.js for optimal performance

## File Structure

```
/
├── app/                    # Next.js App Router directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   ├── components/        # React components
│   │   ├── Sidebar.tsx    # Left sidebar component
│   │   ├── PostCard.tsx   # Individual post card
│   │   ├── PostGrid.tsx   # Masonry grid component
│   │   ├── Modal.tsx      # Modal overlay component
│   │   └── posts/         # Post content components
│   │       ├── Post1.tsx
│   │       ├── Post2.tsx
│   │       └── ...
│   └── lib/
│       └── posts.ts       # Post data and utilities
├── public/                # Static assets
│   └── images/
├── package.json           # Dependencies
├── next.config.js         # Next.js configuration
└── README.md             # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Local Development

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser
3. The page will automatically reload when you make changes

### Adding Posts

1. **Create a post component** in `app/components/posts/` (e.g., `Post5.tsx`):
   ```tsx
   export default function Post5() {
     return (
       <div className="post-content">
         <img src="/images/my-image.jpg" alt="Description" />
         <div className="text-content">
           <h2>Post Title</h2>
           <p>Your content here...</p>
         </div>
       </div>
     );
   }
   ```

2. **Add post metadata** to `app/lib/posts.ts`:
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

3. **Import and register** the component in `app/components/Modal.tsx`:
   ```typescript
   import Post5 from './posts/Post5';
   
   const postComponents: Record<string, React.ComponentType> = {
     // ... existing posts
     'post-5': Post5,
   };
   ```

### Content Types

#### Images
```tsx
<img src="/images/image.jpg" alt="Description" />
```

#### Embedded Videos (YouTube)
```tsx
<iframe 
    src="https://www.youtube.com/embed/VIDEO_ID" 
    title="Video Title" 
    frameBorder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowFullScreen
/>
```

#### Text Content
```tsx
<div className="text-content">
    <h2>Heading</h2>
    <p>Paragraph text...</p>
    <ul>
        <li>List item</li>
    </ul>
</div>
```

## Build and Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `out/` directory (static export).

### Deploy to GitHub Pages

1. Build the project:
   ```bash
   npm run build
   ```

2. The `out/` directory contains the static files ready for GitHub Pages

3. Follow GitHub Pages deployment steps:
   - Push the `out/` directory contents to your repository
   - Enable GitHub Pages in repository settings
   - Select the branch/folder containing the `out/` directory

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

## Customization

### Changing Column Count

Edit `app/globals.css` to adjust the number of columns:

```css
.posts-grid {
    column-count: 4; /* Change this number */
}
```

### Styling

Modify `app/globals.css` to customize colors, fonts, spacing, and other visual elements.

### Post Card Size

Posts will automatically size based on their content. To ensure uniform sizing, control the aspect ratio of your thumbnail images.

## Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available for personal and commercial use.

## Support

For issues or questions, please open an issue on the GitHub repository.
