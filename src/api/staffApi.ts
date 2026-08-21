import { adminHttpClient } from "./adminHttpClient";
import { createResourceApi } from "./createResourceApi";
import type { ApiResponse } from "../types/common.types";
import type { StaffMember } from "../types/staff.types";

export type StaffMemberInput = Omit<StaffMember, "_id" | "createdAt">;

const staffApi = createResourceApi<StaffMember, StaffMemberInput>("staff");

export const fetchStaff = staffApi.fetchAll;
export const fetchStaffMemberById = staffApi.fetchById;
export const fetchAllStaffForAdmin = staffApi.fetchAllForAdmin;
export const createStaffMember = staffApi.create;
export const updateStaffMember = staffApi.update;
export const deleteStaffMember = staffApi.remove;

export async function uploadStaffImage(file: File): Promise<ApiResponse<{ url: string }>> {
  const formData = new FormData();
  formData.append("image", file);
  const { data } = await adminHttpClient.post<ApiResponse<{ url: string }>>("/staff/upload-image", formData);
  return data;
}
