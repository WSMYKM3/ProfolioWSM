export interface Post {
  id: string;
  title: string;
  thumbnail: string;
  file: string;
  date: string;
  tags: string[];
  quality?: 'high' | 'medium' | 'low'; // 内容质量等级，用于控制post card尺寸 (high=大, medium=中, low=小)
}

export const posts: Post[] = [
  // 第一行（从左到右）
  {
    id: "post-1",
    title: "Sample Project 1",
    thumbnail: "https://via.placeholder.com/400x600/cccccc/666666?text=Project+1",
    file: "post-1",
    date: "2024-01-15",
    tags: ["design", "web"],
    quality: "medium" // 高质量内容，显示为大尺寸
  },
  {
    id: "post-2",
    title: "Mixed Media Project",
    thumbnail: "https://via.placeholder.com/400x700/cccccc/666666?text=Mixed+Media",
    file: "post-3",
    date: "2024-02-01",
    tags: ["design", "video", "photography"],
    quality: "low" // 高质量内容，显示为大尺寸
  },
  {
    id: "post-3",
    title: "Tall Project",
    thumbnail: "https://via.placeholder.com/400x800/cccccc/666666?text=Tall+Project",
    file: "post-1",
    date: "2024-02-15",
    tags: ["design"],
    quality: "high" // 高质量内容，显示为大尺寸
  },
  // 第二行（从左到右）
  {
    id: "post-4",
    title: "Video Showcase",
    thumbnail: "https://via.placeholder.com/400x450/cccccc/666666?text=Video+Project",
    file: "post-2",
    date: "2024-01-20",
    tags: ["video", "production"],
    quality: "medium" // 中等质量，显示为中等尺寸
  },
  {
    id: "post-5",
    title: "Text-Based Project",
    thumbnail: "https://via.placeholder.com/400x400/cccccc/666666?text=Text+Project",
    file: "post-4",
    date: "2024-02-10",
    tags: ["writing", "content"],
    quality: "low" // 低质量内容，显示为小尺寸
  },
  {
    id: "post-6",
    title: "Wide Project",
    thumbnail: "https://via.placeholder.com/400x350/cccccc/666666?text=Wide+Project",
    file: "post-2",
    date: "2024-02-20",
    tags: ["photography"],
    quality: "medium" // 中等质量，显示为中等尺寸
  }
];

export function getPostById(id: string): Post | undefined {
  return posts.find(post => post.id === id);
}

