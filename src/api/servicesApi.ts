import { httpClient } from "./httpClient";
import type { ApiResponse } from "../types/common.types";
import type { Service } from "../types/service.types";

export async function fetchServices(): Promise<ApiResponse<Service[]>> {
  const { data } = await httpClient.get<ApiResponse<Service[]>>("/services");
  return data;
}

export async function fetchServiceById(id: string): Promise<ApiResponse<Service>> {
  const { data } = await httpClient.get<ApiResponse<Service>>(`/services/${id}`);
  return data;
}
