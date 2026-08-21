import { fetchStaff } from "../api/staffApi";
import { useFetch } from "./useFetch";
import type { StaffMember } from "../types/staff.types";

export function useStaff(): {
  staff: StaffMember[] | null;
  isLoading: boolean;
  error: string | null;
} {
  const { data, isLoading, error } = useFetch(fetchStaff);
  return { staff: data, isLoading, error };
}
