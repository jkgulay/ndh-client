export const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract"] as const;

export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

export interface Career {
  _id: string;
  title: string;
  department: string;
  type: EmploymentType;
  description: string;
  requirements?: string;
  howToApply: string;
  isActive: boolean;
  postedAt: string;
  createdAt: string;
}
