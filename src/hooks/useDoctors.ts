import { fetchDoctors } from "../api/doctorsApi";
import { useFetch } from "./useFetch";
import type { Doctor } from "../types/doctor.types";

export function useDoctors(): {
  doctors: Doctor[] | null;
  isLoading: boolean;
  error: string | null;
} {
  const { data, isLoading, error } = useFetch(fetchDoctors);
  return { doctors: data, isLoading, error };
}
