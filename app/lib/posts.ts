export interface Post {
  id: string;
  title: string;
  thumbnail: string;
  file: string;
  date: string;
  tags: string[];
  quality?: 'high' | 'medium' | 'low'; // 内容质量等级，用于控制post card尺寸 (high=大, medium=中, low=小)
  videoUrl?: string; // YouTube/Vimeo embed URL or local MP4 path
  videoTitle?: string; // Title text displayed above video
  videoUrls?: string[]; // Array of video URLs for multiple videos (e.g., for Datnie)
  videoTitles?: string[]; // Array of video titles corresponding to videoUrls
  gifUrl?: string; // GIF image URL for cinematic-extra section
  description?: string; // Project description for intro section
  softwareTools?: string[]; // Array of software tool names (e.g., ["Unity", "Unreal", "Blender"])
  features?: string[]; // Array of feature tags (e.g., ["#XR Hands", "#Trailer Animation"])
  galleryImages?: string[]; // Array of image URLs for the detail view gallery
  role?: string; // Project contribution/role (e.g., "UX/XR Lead")
}

export const posts: Post[] = [
  // 第一行（从左到右）
  {
    id: "post-1",
    title: "Datnie",
    thumbnail: "/datnie.png", // Local image from public folder
    file: "post-1",
    date: "2025",
    tags: ["design", "web"],
    quality: "medium", // 高质量内容，显示为大尺寸
    videoUrl: "https://www.youtube.com/watch?v=TrJPls4p5ak",
    videoTitle: "Datnie- XR Dating app",
    gifUrl: "/gifs/datnie.gif", // GIF for cinematic-extra section
    description: "With Datnie, we don't want to pair you with an 'another' crush, no more repeated conversation as we catch your next crush's frequency answers from past coversations, and so do yours to pair you better.",
    softwareTools: ["Unity6- XR develop", "Unreal Engine- Trailer animation", "Blender- chracter groom"],
    features: ["#XR Hands", "#Trailer Animation all in UE, No AI", "#Motion Capture and motion refining"],
    galleryImages: [
      "/1.png",
      "https://via.placeholder.com/600x400/2a2a2a/888888?text=Process+1",
      "https://via.placeholder.com/600x400/2a2a2a/888888?text=Process+2",
      "https://via.placeholder.com/600x800/2a2a2a/888888?text=Vertical+Process"
    ],
    role: "Role -XR developer, Director, Animator"
  },
  {
    id: "post-2",
    title: "Signie",
    thumbnail: "https://via.placeholder.com/400x700/cccccc/666666?text=Mixed+Media",
    file: "post-3",
    date: "2024-02-01",
    tags: ["design", "video", "photography"],
    quality: "low",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Mixed Media Video Title",
    gifUrl: "/gifs/mixed-media.gif", // GIF for cinematic-extra section
    description: "A creative exploration of mixed media combining video, photography, and interactive elements.",
    softwareTools: ["Unity6- XR develop", "Virtual hands", "Photoshop"],
    features: ["#XR Hands", "#Motion Capture and motion refining"],
    role: "Creative Technologist"
  },
  {
    id: "post-3",
    title: "Tall Project",
    thumbnail: "https://via.placeholder.com/400x800/cccccc/666666?text=Tall+Project",
    file: "post-1",
    date: "2024-02-15",
    tags: ["design"],
    quality: "high", // 高质量内容，显示为大尺寸
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Tall Project Video Title",
    gifUrl: "/gifs/tall-project.gif", // GIF for cinematic-extra section
    description: "A vertical format project showcasing innovative design solutions.",
    softwareTools: ["Figma", "Illustrator", "Cinema 4D"],
    features: ["#Trailer Animation all in UE, No AI"],
    role: "Design Lead"
  },
  // 第二行（从左到右）
  {
    id: "post-4",
    title: "Video Showcase",
    thumbnail: "https://via.placeholder.com/400x450/cccccc/666666?text=Video+Project",
    file: "post-2",
    date: "2024-01-20",
    tags: ["video", "production"],
    quality: "medium", // 中等质量，显示为中等尺寸
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Video Showcase Title",
    gifUrl: "/gifs/video-showcase.gif", // GIF for cinematic-extra section
    description: "A comprehensive video production showcasing motion graphics and visual storytelling.",
    softwareTools: ["After Effects", "Premiere Pro", "DaVinci Resolve"],
    features: ["#Motion Capture and motion refining"],
    role: "Video Producer"
  },
  {
    id: "post-5",
    title: "Text-Based Project",
    thumbnail: "https://via.placeholder.com/400x400/cccccc/666666?text=Text+Project",
    file: "post-4",
    date: "2024-02-10",
    tags: ["writing", "content"],
    quality: "low", // 低质量内容，显示为小尺寸
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Text Project Video Title",
    gifUrl: "/gifs/text-project.gif", // GIF for cinematic-extra section
    description: "A content-focused project exploring narrative and textual expression.",
    softwareTools: ["Notion", "Markdown"],
    features: [],
    role: "Content Creator"
  },
  {
    id: "post-6",
    title: "Wide Project",
    thumbnail: "https://via.placeholder.com/400x350/cccccc/666666?text=Wide+Project",
    file: "post-2",
    date: "2024-02-20",
    tags: ["photography"],
    quality: "medium", // 中等质量，显示为中等尺寸
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Wide Project Video Title",
    gifUrl: "/gifs/wide-project.gif", // GIF for cinematic-extra section
    description: "A wide-format photography project capturing expansive landscapes and architectural details.",
    softwareTools: ["Lightroom", "Photoshop", "Capture One"],
    features: ["#Trailer Animation all in UE, No AI", "#Motion Capture and motion refining"],
    role: "Photographer"
  }
];

export function getPostById(id: string): Post | undefined {
  return posts.find(post => post.id === id);
}

