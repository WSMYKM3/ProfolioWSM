export interface Post {
  id: string;
  title: string;
  thumbnail: string;
  file: string;
  date: string;
  tags: string[];
}

export const posts: Post[] = [
  {
    id: "post-1",
    title: "Sample Project 1",
    thumbnail: "https://via.placeholder.com/400x500/cccccc/666666?text=Project+1",
    file: "post-1",
    date: "2024-01-15",
    tags: ["design", "web"]
  },
  {
    id: "post-2",
    title: "Video Showcase",
    thumbnail: "https://via.placeholder.com/400x300/cccccc/666666?text=Video+Project",
    file: "post-2",
    date: "2024-01-20",
    tags: ["video", "production"]
  },
  {
    id: "post-3",
    title: "Mixed Media Project",
    thumbnail: "https://via.placeholder.com/400x600/cccccc/666666?text=Mixed+Media",
    file: "post-3",
    date: "2024-02-01",
    tags: ["design", "video", "photography"]
  },
  {
    id: "post-4",
    title: "Text-Based Project",
    thumbnail: "https://via.placeholder.com/400x350/cccccc/666666?text=Text+Project",
    file: "post-4",
    date: "2024-02-10",
    tags: ["writing", "content"]
  },
  {
    id: "post-5",
    title: "Tall Project",
    thumbnail: "https://via.placeholder.com/400x700/cccccc/666666?text=Tall+Project",
    file: "post-1",
    date: "2024-02-15",
    tags: ["design"]
  },
  {
    id: "post-6",
    title: "Wide Project",
    thumbnail: "https://via.placeholder.com/400x250/cccccc/666666?text=Wide+Project",
    file: "post-2",
    date: "2024-02-20",
    tags: ["photography"]
  }
];

export function getPostById(id: string): Post | undefined {
  return posts.find(post => post.id === id);
}

