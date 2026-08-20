export interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  schedule: string;
  imageUrl?: string;
  bio?: string;
  isActive: boolean;
  createdAt: string;
}
