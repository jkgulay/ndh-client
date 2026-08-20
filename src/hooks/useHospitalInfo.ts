import { fetchHospitalInfo } from "../api/settingsApi";
import { useFetch } from "./useFetch";
import type { HospitalInfo } from "../types/hospitalInfo.types";

export function useHospitalInfo(): {
  hospitalInfo: HospitalInfo | null;
  isLoading: boolean;
  error: string | null;
} {
  const { data, isLoading, error } = useFetch(fetchHospitalInfo);
  return { hospitalInfo: data, isLoading, error };
}
