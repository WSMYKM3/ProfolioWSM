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
  description?: string; // Project description for intro section
  softwareTools?: string[]; // Array of software tool names (e.g., ["Unity", "Unreal", "Blender"])
}

export const posts: Post[] = [
  // 第一行（从左到右）
  {
    id: "post-1",
    title: "Datnie",
    thumbnail: "/1.png", // Local image from public folder
    file: "post-1",
    date: "2024-01-15",
    tags: ["design", "web"],
    quality: "medium", // 高质量内容，显示为大尺寸
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoUrls: ["https://www.youtube.com/embed/dQw4w9WgXcQ", "https://www.youtube.com/embed/dQw4w9WgXcQ"], // Two videos for Datnie
    videoTitles: ["Main Video Title", "Secondary Video Title"], // Titles for the two videos
    description: "An immersive XR experience combining interactive design with cutting-edge technology.",
    softwareTools: ["Unity", "Blender", "TouchDesigner"]
  },
  {
    id: "post-2",
    title: "Mixed Media Project",
    thumbnail: "https://via.placeholder.com/400x700/cccccc/666666?text=Mixed+Media",
    file: "post-3",
    date: "2024-02-01",
    tags: ["design", "video", "photography"],
    quality: "low",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Mixed Media Video Title",
    description: "A creative exploration of mixed media combining video, photography, and interactive elements.",
    softwareTools: ["After Effects", "Premiere Pro", "Photoshop"]
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
    description: "A vertical format project showcasing innovative design solutions.",
    softwareTools: ["Figma", "Illustrator", "Cinema 4D"]
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
    description: "A comprehensive video production showcasing motion graphics and visual storytelling.",
    softwareTools: ["After Effects", "Premiere Pro", "DaVinci Resolve"]
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
    description: "A content-focused project exploring narrative and textual expression.",
    softwareTools: ["Notion", "Markdown"]
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
    description: "A wide-format photography project capturing expansive landscapes and architectural details.",
    softwareTools: ["Lightroom", "Photoshop", "Capture One"]
  }
];

export function getPostById(id: string): Post | undefined {
  return posts.find(post => post.id === id);
}

