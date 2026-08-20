import { adminHttpClient } from "./adminHttpClient";
import { httpClient } from "./httpClient";
import type { ApiResponse } from "../types/common.types";
import type { Doctor } from "../types/doctor.types";

export type DoctorInput = Omit<Doctor, "_id" | "createdAt">;

export async function fetchDoctors(): Promise<ApiResponse<Doctor[]>> {
  const { data } = await httpClient.get<ApiResponse<Doctor[]>>("/doctors");
  return data;
}

export async function fetchDoctorById(id: string): Promise<ApiResponse<Doctor>> {
  const { data } = await httpClient.get<ApiResponse<Doctor>>(`/doctors/${id}`);
  return data;
}

export async function fetchAllDoctorsForAdmin(): Promise<ApiResponse<Doctor[]>> {
  const { data } = await adminHttpClient.get<ApiResponse<Doctor[]>>("/doctors/admin");
  return data;
}

export async function createDoctor(input: DoctorInput): Promise<ApiResponse<Doctor>> {
  const { data } = await adminHttpClient.post<ApiResponse<Doctor>>("/doctors", input);
  return data;
}

export async function updateDoctor(id: string, input: DoctorInput): Promise<ApiResponse<Doctor>> {
  const { data } = await adminHttpClient.put<ApiResponse<Doctor>>(`/doctors/${id}`, input);
  return data;
}

export async function deleteDoctor(id: string): Promise<ApiResponse<never>> {
  const { data } = await adminHttpClient.delete<ApiResponse<never>>(`/doctors/${id}`);
  return data;
}

export async function uploadDoctorImage(file: File): Promise<ApiResponse<{ url: string }>> {
  const formData = new FormData();
  formData.append("image", file);
  const { data } = await adminHttpClient.post<ApiResponse<{ url: string }>>(
    "/doctors/upload-image",
    formData
  );
  return data;
}
