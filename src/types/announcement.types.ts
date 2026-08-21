export interface Announcement {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  isActive: boolean;
  publishedAt: string;
  createdAt: string;
}
