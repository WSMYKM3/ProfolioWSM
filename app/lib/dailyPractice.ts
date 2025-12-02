export interface DailyPracticePost {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  tags: string[];
  quality: 'high' | 'medium' | 'low';
  file?: string; // Optional, for modal content
}

export const dailyPracticePosts: DailyPracticePost[] = [
  {
    id: "daily-1",
    title: "Morning Sketch",
    thumbnail: "https://via.placeholder.com/400x600/cccccc/666666?text=Morning+Sketch",
    date: "2024-03-01",
    tags: ["sketch", "daily"],
    quality: "high",
    file: "post-1"
  },
  {
    id: "daily-2",
    title: "Quick Design Study",
    thumbnail: "https://via.placeholder.com/400x300/cccccc/666666?text=Design+Study",
    date: "2024-03-02",
    tags: ["design", "study"],
    quality: "medium",
    file: "post-2"
  },
  {
    id: "daily-3",
    title: "Color Exploration",
    thumbnail: "https://via.placeholder.com/400x500/cccccc/666666?text=Color+Exp",
    date: "2024-03-03",
    tags: ["color", "experiment"],
    quality: "low",
    file: "post-3"
  },
  {
    id: "daily-4",
    title: "Typography Practice",
    thumbnail: "https://via.placeholder.com/400x700/cccccc/666666?text=Typography",
    date: "2024-03-04",
    tags: ["typography", "practice"],
    quality: "high",
    file: "post-4"
  },
  {
    id: "daily-5",
    title: "Layout Experiment",
    thumbnail: "https://via.placeholder.com/400x400/cccccc/666666?text=Layout",
    date: "2024-03-05",
    tags: ["layout", "experiment"],
    quality: "medium",
    file: "post-1"
  },
  {
    id: "daily-6",
    title: "Quick Doodle",
    thumbnail: "https://via.placeholder.com/400x250/cccccc/666666?text=Doodle",
    date: "2024-03-06",
    tags: ["doodle", "quick"],
    quality: "low",
    file: "post-2"
  },
  {
    id: "daily-7",
    title: "3D Render Test",
    thumbnail: "https://via.placeholder.com/400x800/cccccc/666666?text=3D+Render",
    date: "2024-03-07",
    tags: ["3d", "render"],
    quality: "high",
    file: "post-3"
  },
  {
    id: "daily-8",
    title: "Animation Frame",
    thumbnail: "https://via.placeholder.com/400x350/cccccc/666666?text=Animation",
    date: "2024-03-08",
    tags: ["animation", "frame"],
    quality: "medium",
    file: "post-4"
  },
  {
    id: "daily-9",
    title: "Concept Art",
    thumbnail: "https://via.placeholder.com/400x550/cccccc/666666?text=Concept",
    date: "2024-03-09",
    tags: ["concept", "art"],
    quality: "low",
    file: "post-1"
  }
];

export function getDailyPracticePostById(id: string): DailyPracticePost | undefined {
  return dailyPracticePosts.find(post => post.id === id);
}

