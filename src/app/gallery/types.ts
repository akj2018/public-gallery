interface DataItem {
  id: string | number;
  thumbnailUrl: string;
  mediaUrl: string;
  likes: number;
  author: string;
  uploadedAt: string;
  tags: string[];
  prompt: string;
  durationSec?: number;
}

export type { DataItem };
