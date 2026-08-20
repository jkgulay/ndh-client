import { adminHttpClient } from "./adminHttpClient";
import { httpClient } from "./httpClient";
import type { ApiResponse } from "../types/common.types";
import type { Service } from "../types/service.types";

export type ServiceInput = Omit<Service, "_id" | "createdAt">;

export async function fetchServices(): Promise<ApiResponse<Service[]>> {
  const { data } = await httpClient.get<ApiResponse<Service[]>>("/services");
  return data;
}

export async function fetchServiceById(id: string): Promise<ApiResponse<Service>> {
  const { data } = await httpClient.get<ApiResponse<Service>>(`/services/${id}`);
  return data;
}

export async function fetchAllServicesForAdmin(): Promise<ApiResponse<Service[]>> {
  const { data } = await adminHttpClient.get<ApiResponse<Service[]>>("/services/admin");
  return data;
}

export async function createService(input: ServiceInput): Promise<ApiResponse<Service>> {
  const { data } = await adminHttpClient.post<ApiResponse<Service>>("/services", input);
  return data;
}

export async function updateService(
  id: string,
  input: ServiceInput
): Promise<ApiResponse<Service>> {
  const { data } = await adminHttpClient.put<ApiResponse<Service>>(`/services/${id}`, input);
  return data;
}

export async function deleteService(id: string): Promise<ApiResponse<never>> {
  const { data } = await adminHttpClient.delete<ApiResponse<never>>(`/services/${id}`);
  return data;
}
