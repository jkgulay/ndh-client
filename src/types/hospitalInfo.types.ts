export interface HospitalInfo {
  _id: string;
  name: string;
  tagline: string;
  address: string;
  phone: string;
  emergencyHotline: string;
  email: string;
  hours: string;
  foundedYear: number;
  bedCount: number;
  departmentCount: number;
  accreditations: string[];
  facebookUrl?: string;
  googleMapsEmbedUrl?: string;
}
