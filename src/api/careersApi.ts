import { adminHttpClient } from "./adminHttpClient";
import { httpClient } from "./httpClient";
import type { ApiResponse } from "../types/common.types";
import type { Career } from "../types/career.types";

export type CareerInput = Omit<Career, "_id" | "createdAt">;

export async function fetchCareers(): Promise<ApiResponse<Career[]>> {
  const { data } = await httpClient.get<ApiResponse<Career[]>>("/careers");
  return data;
}

export async function fetchCareerById(id: string): Promise<ApiResponse<Career>> {
  const { data } = await httpClient.get<ApiResponse<Career>>(`/careers/${id}`);
  return data;
}

export async function fetchAllCareersForAdmin(): Promise<ApiResponse<Career[]>> {
  const { data } = await adminHttpClient.get<ApiResponse<Career[]>>("/careers/admin");
  return data;
}

export async function createCareer(input: CareerInput): Promise<ApiResponse<Career>> {
  const { data } = await adminHttpClient.post<ApiResponse<Career>>("/careers", input);
  return data;
}

export async function updateCareer(id: string, input: CareerInput): Promise<ApiResponse<Career>> {
  const { data } = await adminHttpClient.put<ApiResponse<Career>>(`/careers/${id}`, input);
  return data;
}

export async function deleteCareer(id: string): Promise<ApiResponse<never>> {
  const { data } = await adminHttpClient.delete<ApiResponse<never>>(`/careers/${id}`);
  return data;
}
