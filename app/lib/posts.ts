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
  achievement?: string; // Project achievement or recognition (e.g., "AWE 2025 USA presentation")
  stage3VideoUrl?: string; // Stage 3 video URL for Signie project
}

export const posts: Post[] = [
  // 第一行（从左到右）
  {
    id: "post-1",
    title: "Datnie",
    thumbnail: "/datnie.png", // Local image from public folder
    file: "post-1",
    date: "1 month for XRCC 2025 hackathon",
    tags: ["xr", "featured", "animation"],
    quality: "medium", // 高质量内容，显示为大尺寸
    videoUrl: "https://www.youtube.com/embed/TrJPls4p5ak",
    videoTitle: "Datnie- XR Dating app",
    gifUrl: "/gifs/datnie.gif", // GIF for cinematic-extra section
    description: "With Datnie, we don't want to pair you with an 'another' crush, no more repeated conversation as we catch your next crush's frequency answers from past coversations, and so do yours to pair better.",
    softwareTools: ["Unity6", "Unreal Engine", "Blender"],
    features: ["Mixed Reality", "Spatial Design", "XR Hands"],
    galleryImages: [
      "/1.png",
      "https://via.placeholder.com/600x400/2a2a2a/888888?text=Process+1",
      "https://via.placeholder.com/600x400/2a2a2a/888888?text=Process+2",
      "https://via.placeholder.com/600x800/2a2a2a/888888?text=Vertical+Process"
    ],
    role: "XR developer, Director, Animator"
  },
  {
    id: "post-2",
    title: "Signie",
    thumbnail: "linkedinthumbnail.png",
    file: "post-2",
    date: "March–Jun 2025",
    tags: ["xr", "featured"],
    quality: "high",
    videoUrls: [
      "https://www.youtube.com/watch?v=BpG5c0Rr4E8",
      "https://www.youtube.com/watch?v=GxtJhHQGz3o"
    ],
    videoTitles: [
      "Trailer",
      "Fullplay video"
    ],
    description: "Signie is an immersive ASL learning and real-time translation system powered by hand tracking, micro-gestures, and AI feedback. It evolved from concept validation to interactive learning experiences, and ultimately to AI-glasses-based live translation.",
    softwareTools: ["Unity6", "Blender"],
    features: ["Hand Tracking", "Gesture Recognition", "Micro-Gestures", "Voice-to-Text", "Virtual Guide", "Animation State Machine"],
    role: "XXR developer",
    achievement: "AWE 2025 USA presentation",
    stage3VideoUrl: "" // Add Stage 3 YouTube video URL here when available
  },
  {
    id: "post-3",
    title: "I AND AI: MIRROR",
    thumbnail: "/iandaithumb.jpg",
    file: "post-3",
    date: "Apr–Oct 2025, and is updating for confirmed future exhibition",
    tags: ["ai", "exploration","featured"],
    quality: "high", // 高质量内容，显示为大尺寸
    videoUrl: "", // Will be updated with actual YouTube URL
    videoTitle: "I AND AI: MIRROR",
    gifUrl: "/gifs/tall-project.gif", // GIF for cinematic-extra section
    description: "AI can be a collaborator or a mirror—mentor, listener, lover. Before AI becomes anything, we assign it an \"AI\"dentity. What if identity itself is co-authored between \"I\" and \"AI\"? I & AI: Mirror is an immersive experience exploring human–AI intimacy. Audiences engage with a generative mirror-self that listens, learns, and reflects their presence, transforming interactions into real-time, shared expressions of identity.",
    softwareTools: ["Unreal Engine", "Touchdesigner", "Blender", "Python"],
    features: ["Real-time Metahuman lipsync", "Touchdesigner-UE communication"],
    role: "Game Engine Development & AI Integration(Touchdesigner state machine creator)"
  },
  // 第二行（从左到右）
  {
    id: "post-4",
    title: "The Shadow of Horizon",
    thumbnail: "/mocapthumbnail.png",
    file: "post-4",
    date: "3 months in 2024",
    tags: ["animation"],
    quality: "medium", // 中等质量，显示为中等尺寸
    videoUrl: "https://www.youtube.com/embed/J0UV4jHnues",
    videoTitle: "Behind the scenes",
    gifUrl: "/gifs/video-showcase.gif", // GIF for cinematic-extra section
    description: "A comprehensive video production showcasing motion capture and Metahuman animation.",
    softwareTools: ["Unreal Engine", "Motion Builder", "Optitrack Motion Capture"],
    features: ["Motion Capture", "Metahuman Animation"],
    role: "Metahuman Prototyper, Animator"
  },
  {
    id: "post-5",
    title: "The Tool Box",
    thumbnail: "https://via.placeholder.com/400x400/cccccc/666666?text=Text+Project",
    file: "post-4",
    date: "2024-02-10",
    tags: ["xr", "ai"],
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
    title: "Aether Tag",
    thumbnail: "https://via.placeholder.com/400x350/cccccc/666666?text=Wide+Project",
    file: "post-2",
    date: "2024-02-20",
    tags: ["xr"],
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

