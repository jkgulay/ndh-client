import { adminHttpClient } from "./adminHttpClient";
import { httpClient } from "./httpClient";
import type { ApiResponse } from "../types/common.types";
import type { StaffMember } from "../types/staff.types";

export type StaffMemberInput = Omit<StaffMember, "_id" | "createdAt">;

export async function fetchStaff(): Promise<ApiResponse<StaffMember[]>> {
  const { data } = await httpClient.get<ApiResponse<StaffMember[]>>("/staff");
  return data;
}

export async function fetchStaffMemberById(id: string): Promise<ApiResponse<StaffMember>> {
  const { data } = await httpClient.get<ApiResponse<StaffMember>>(`/staff/${id}`);
  return data;
}

export async function fetchAllStaffForAdmin(): Promise<ApiResponse<StaffMember[]>> {
  const { data } = await adminHttpClient.get<ApiResponse<StaffMember[]>>("/staff/admin");
  return data;
}

export async function createStaffMember(input: StaffMemberInput): Promise<ApiResponse<StaffMember>> {
  const { data } = await adminHttpClient.post<ApiResponse<StaffMember>>("/staff", input);
  return data;
}

export async function updateStaffMember(
  id: string,
  input: StaffMemberInput
): Promise<ApiResponse<StaffMember>> {
  const { data } = await adminHttpClient.put<ApiResponse<StaffMember>>(`/staff/${id}`, input);
  return data;
}

export async function deleteStaffMember(id: string): Promise<ApiResponse<never>> {
  const { data } = await adminHttpClient.delete<ApiResponse<never>>(`/staff/${id}`);
  return data;
}

export async function uploadStaffImage(file: File): Promise<ApiResponse<{ url: string }>> {
  const formData = new FormData();
  formData.append("image", file);
  const { data } = await adminHttpClient.post<ApiResponse<{ url: string }>>("/staff/upload-image", formData);
  return data;
}
