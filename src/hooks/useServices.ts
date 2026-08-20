import { fetchServices } from "../api/servicesApi";
import { useFetch } from "./useFetch";
import type { Service } from "../types/service.types";

export function useServices(): {
  services: Service[] | null;
  isLoading: boolean;
  error: string | null;
} {
  const { data, isLoading, error } = useFetch(fetchServices);
  return { services: data, isLoading, error };
}
