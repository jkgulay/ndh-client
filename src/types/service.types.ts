export const SERVICE_CATEGORIES = [
  "Emergency & Trauma",
  "Outpatient/OPD",
  "Inpatient/Wards",
  "Diagnostic & Laboratory",
  "Radiology & Imaging",
  "Pharmacy",
  "Maternal & Child Health",
  "Surgical Services",
  "Specialty Clinics",
  "Rehabilitation",
] as const;

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

export interface Service {
  _id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  operatingHours?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
}
