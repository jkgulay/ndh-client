import {
  Activity,
  Baby,
  Bone,
  Building2,
  FlaskConical,
  Pill,
  Radiation,
  ScanLine,
  Stethoscope,
  Syringe,
  type LucideIcon,
} from "lucide-react";
import type { ServiceCategory } from "../types/service.types";

const CATEGORY_ICON_MAP: Record<ServiceCategory, LucideIcon> = {
  "Emergency & Trauma": Activity,
  "Outpatient/OPD": Stethoscope,
  "Inpatient/Wards": Building2,
  "Diagnostic & Laboratory": FlaskConical,
  "Radiology & Imaging": ScanLine,
  Pharmacy: Pill,
  "Maternal & Child Health": Baby,
  "Surgical Services": Syringe,
  "Specialty Clinics": Radiation,
  Rehabilitation: Bone,
};

export function getServiceCategoryIcon(category: ServiceCategory): LucideIcon {
  return CATEGORY_ICON_MAP[category];
}
