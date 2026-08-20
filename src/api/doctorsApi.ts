import { httpClient } from "./httpClient";
import type { ApiResponse } from "../types/common.types";
import type { Doctor } from "../types/doctor.types";

export async function fetchDoctors(): Promise<ApiResponse<Doctor[]>> {
  const { data } = await httpClient.get<ApiResponse<Doctor[]>>("/doctors");
  return data;
}

export async function fetchDoctorById(id: string): Promise<ApiResponse<Doctor>> {
  const { data } = await httpClient.get<ApiResponse<Doctor>>(`/doctors/${id}`);
  return data;
}
