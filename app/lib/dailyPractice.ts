export interface DailyPracticePost {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  tags: string[];
  description?: string; // Optional, for modal description
  videoUrl?: string; // Optional, for YouTube or other video URLs
  githubUrl?: string; // Optional, for GitHub repository URLs
  file?: string; // Optional, for modal content
}

export const dailyPracticePosts: DailyPracticePost[] = [
  {
    id: "daily-1",
    title: "upcoming",
    thumbnail: "https://via.placeholder.com/400x600/cccccc/666666?text=Morning+Sketch",
    date: "2024-03-01",
    tags: ["sketch", "daily"],
    file: "post-1"
  },
  {
    id: "daily-2",
    title: "Real-Scale kinetic installation Prototype",
    thumbnail: "/dailypracticeThumbnail/mediaue.jpg",
    date: "2025.9",
    tags: ["Mediapipe", "Osc"],
    description: "Using MediaPipe, cameras detect visitor positions. When someone enters a zone, the corresponding unit freezes, then resumes after they leave—creating a clear reading-and-discovery rhythm",
    videoUrl: "https://youtu.be/bUfKjx5Om8s",
    file: "post-2"
  },
  {
    id: "daily-3",
    title: "Point laser level in Unreal Engine",
    thumbnail: "/dailypracticeThumbnail/pointue.png",
    date: "2024.8",
    tags: ["XR path-finding", "experiment"],
    description: "Built in Unreal Engine, a path-finding game level which let players to use XR controllers to fire point laser in a dark room",
    videoUrl: "https://www.youtube.com/watch?v=LK2qBjUf-Gs",
    file: "post-3"
  },
  {
    id: "daily-4",
    title: "upcoming",
    thumbnail: "https://via.placeholder.com/400x700/cccccc/666666?text=Typography",
    date: "2024-03-04",
    tags: ["typography", "practice"],
    file: "post-4"
  },
  {
    id: "daily-5",
    title: "Unity Editor Tools - Asset Opener",
    thumbnail: "/dailypracticeThumbnail/assetopener.png",
    date: "2025",
    tags: ["Group Collaboration", "Efficiency"],
    description: "A Unity editor tool to manage and open Unity assets quickly and pin on a certain game object. This is for group collabration which let every group member choose a certain list of game objects they will use of their own role.",
    videoUrl: "https://youtu.be/2Nu1RrGWfAw",
    githubUrl: "https://github.com/WSMYKM3/UnityToolScripts-WSM",
    file: "post-1"
  },
  {
    id: "daily-6",
    title: "upcoming",
    thumbnail: "https://via.placeholder.com/400x250/cccccc/666666?text=Doodle",
    date: "2024-03-06",
    tags: ["doodle", "quick"],
    file: "post-2"
  },
  {
    id: "daily-7",
    title: "upcoming",
    thumbnail: "https://via.placeholder.com/400x800/cccccc/666666?text=3D+Render",
    date: "2024-03-07",
    tags: ["3d", "render"],
    file: "post-3"
  },
  {
    id: "daily-8",
    title: "upcoming",
    thumbnail: "https://via.placeholder.com/400x350/cccccc/666666?text=Animation",
    date: "2024-03-08",
    tags: ["animation", "frame"],
    file: "post-4"
  },
  {
    id: "daily-9",
    title: "upcoming",
    thumbnail: "https://via.placeholder.com/400x550/cccccc/666666?text=Concept",
    date: "2024-03-09",
    tags: ["concept", "art"],
    file: "post-1"
  }
];

export function getDailyPracticePostById(id: string): DailyPracticePost | undefined {
  return dailyPracticePosts.find(post => post.id === id);
}

