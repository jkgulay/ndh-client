export interface StaffMember {
  _id: string;
  name: string;
  role: string;
  schedule: string;
  imageUrl?: string;
  bio?: string;
  isActive: boolean;
  createdAt: string;
}
