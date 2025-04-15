export interface Goal {
  id: number;
  title: string;
  description: string;
  targetDate: string;
  createdDate: string;
  progress: number;
  targetAmount: number; 
  currentAmount: number; 
  imageUrl: string;
}

export interface Article {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
}

export interface Video {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: string;
  duration: string;
}