import { fetchCareers } from "../api/careersApi";
import { useFetch } from "./useFetch";
import type { Career } from "../types/career.types";

export function useCareers(): {
  careers: Career[] | null;
  isLoading: boolean;
  error: string | null;
} {
  const { data, isLoading, error } = useFetch(fetchCareers);
  return { careers: data, isLoading, error };
}
