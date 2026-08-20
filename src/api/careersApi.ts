import { httpClient } from "./httpClient";
import type { ApiResponse } from "../types/common.types";
import type { Career } from "../types/career.types";

export async function fetchCareers(): Promise<ApiResponse<Career[]>> {
  const { data } = await httpClient.get<ApiResponse<Career[]>>("/careers");
  return data;
}

export async function fetchCareerById(id: string): Promise<ApiResponse<Career>> {
  const { data } = await httpClient.get<ApiResponse<Career>>(`/careers/${id}`);
  return data;
}
