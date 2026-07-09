export interface SidebarSubsection {
  id: string;
  label: string;
}

export interface SidebarSection {
  id: string;
  label: string;
  subsections?: SidebarSubsection[];
}

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
  linkedInUrl?: string; // LinkedIn post URL for embedding
  shortDescription?: string; // Short description used on about page project cards (overrides description)
  /**
   * Sidebar nav sections for this project's detail page.
   * The shell auto-prepends `{id:'project-title', label: title}` and
   * `{id:'intro', label:'Intro'}` — list only the content sections here.
   */
  sections?: SidebarSection[];
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
    description: "Datnie matches you by learning both your and your crush’s vibe from past conversations, so there’s no need to repeat yourself.",
    softwareTools: ["Unity6", "Unreal Engine", "Blender"],
    features: ["Mixed Reality", "Spatial Design", "XR Hands"],
    galleryImages: [
      "/1.png",
      "https://via.placeholder.com/600x400/2a2a2a/888888?text=Process+1",
      "https://via.placeholder.com/600x400/2a2a2a/888888?text=Process+2",
      "https://via.placeholder.com/600x800/2a2a2a/888888?text=Vertical+Process"
    ],
    role: "XR developer, Director, Animator",
    sections: [
      { id: "ideation", label: "Ideation" },
      { id: "ux-design", label: "UX Design" },
      {
        id: "prototype",
        label: "Prototype",
        subsections: [
          { id: "animation-trailer", label: "Animation Trailer" },
          { id: "prototype-stage1", label: "Stage 1 — UE Production" },
          { id: "prototype-stage2", label: "Stage 2 — Unity Development" }
        ]
      }
    ]
  },
  {
    id: "post-2",
    title: "Signie",
    thumbnail: "linkedinthumbnail.png",
    file: "post-2",
    date: "March–Jun 2025",
    tags: ["xr", "featured"],
    quality: "high",
    videoUrl: "https://www.youtube.com/watch?v=BpG5c0Rr4E8",
    videoUrls: [
      "https://www.youtube.com/watch?v=IRlvLdZX8TU&t=95s",
      "https://www.youtube.com/watch?v=GxtJhHQGz3o"
    ],
    videoTitles: [
      "AWE USA present video",
      "Fullplay video"
    ],
    description: "Signie is an immersive ASL learning and real-time translation system powered by hand tracking, micro-gestures, and AI feedback. It evolved from concept validation to interactive learning experiences, and ultimately to AI-glasses-based live translation.",
    softwareTools: ["Unity6", "Blender"],
    features: ["Hand Tracking", "Gesture Recognition", "Micro-Gestures", "Voice-to-Text", "Virtual Guide", "Animation State Machine"],
    role: "XR developer",
    achievement: "AWE 2025 USA presentation",
    stage3VideoUrl: "https://www.youtube.com/watch?v=j6PK1TTSxV0",
    sections: [
      { id: "ideation", label: "Ideation" },
      {
        id: "process",
        label: "Process",
        subsections: [
          { id: "process-stage1", label: "Stage 1" },
          { id: "process-stage2", label: "Stage 2" },
          { id: "process-stage3", label: "Stage 3" }
        ]
      },
      { id: "contributions", label: "My Contributions" }
    ]
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
    role: "Game Engine Development & AI Integration(Touchdesigner state machine creator)",
    shortDescription: "A real-time AI mirror that listens, responds, and reflects the user through voice-driven interaction and digital embodiment.",
    sections: [
      { id: "live-scene", label: "Live Scene" },
      { id: "achievement", label: "Achievement" },
      {
        id: "process",
        label: "Process",
        subsections: [
          { id: "installation-draft", label: "Installation Draft" },
          { id: "process-stage1", label: "Stage 1" },
          { id: "process-stage2", label: "Stage 2" },
          { id: "process-stage3", label: "Stage 3" },
          { id: "process-stage4", label: "Stage 4" }
        ]
      },
      { id: "contributions", label: "My Contributions" }
    ]
  },
  // 第二行（从左到右）
  {
    id: "post-4",
    title: "The Shadow of Horizon(Motion Capture)",
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
    role: "Motion Capture, Metahuman Prototyper, Animator",
    sections: [
      { id: "videos", label: "Videos" },
      { id: "motion-capture", label: "Motion Capture" },
      { id: "metahuman", label: "Metahuman" }
    ]
  },
  {
    id: "post-5",
    title: "The Tool Box",
    thumbnail: "/toolboxthumb.png",
    file: "post-5",
    date: "3 days for XR Creator Con 2025 hackthon in Berlin - Strauss Track",
    tags: ["xr", "ai"],
    quality: "medium",
    description: "AI assistant for customer purchasing",
    softwareTools: ["Unity6", "Blender"],
    features: ["AI Assistant", "XR Shopping Guide"],
    role: "Team leader of 5, XR developer",
    linkedInUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7345802706638307331/",
    sections: [
      { id: "video", label: "Video" },
      { id: "stage1", label: "Stage 1 — XR" },
      { id: "stage2", label: "Stage 2 — AI Assistant" }
    ]
  },
  {
    id: "post-6",
    title: "Aether Tag",
    thumbnail: "aetherTagthumb.png",
    file: "post-6",
    date: "2 months",
    tags: ["xr"],
    quality: "medium", // 中等质量，显示为中等尺寸
    videoUrl: "https://www.youtube.com/watch?v=-4Z7SdWcgyU", // Will be updated with actual YouTube URL
    videoTitle: "Aether Tag",
    description: "A non-violent competitive laser tag game using an elemental counter system (Water > Fire > Wind) where type advantages reward strategy by doubling damage.",
    softwareTools: ["Unity2022"],
    features: ["Elemental Counter System"],
    role: "XR developer",
    sections: [
      { id: "video", label: "Video" },
      { id: "introduction", label: "Introduction" },
      {
        id: "game-design",
        label: "Game Design",
        subsections: [
          { id: "technical-solution", label: "1.1 Technical solution" },
          { id: "enemies-weapons", label: "1.2 Enemies & weapons" }
        ]
      },
      {
        id: "my-prototype",
        label: "My Prototype",
        subsections: [
          { id: "ragdoll-scripts", label: "1.1 Ragdoll scripts" },
          { id: "double-damage", label: "1.2 Double damage" },
          { id: "shield-parts", label: "1.3 Shield parts" },
          { id: "gamemanager", label: "1.4 GameManager" }
        ]
      }
    ]
  }
];

export function getPostById(id: string): Post | undefined {
  return posts.find(post => post.id === id);
}
