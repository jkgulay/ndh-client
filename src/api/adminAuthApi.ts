import { adminHttpClient } from "./adminHttpClient";
import type { ApiResponse } from "../types/common.types";

interface AdminLoginResponse {
  token: string;
}

interface AdminProfile {
  username: string;
}

interface ChangeCredentialsInput {
  currentPassword: string;
  newUsername: string;
  newPassword?: string;
}

export async function loginAdmin(
  username: string,
  password: string
): Promise<ApiResponse<AdminLoginResponse>> {
  const { data } = await adminHttpClient.post<ApiResponse<AdminLoginResponse>>("/admin/login", {
    username,
    password,
  });
  return data;
}

export async function fetchAdminProfile(): Promise<ApiResponse<AdminProfile>> {
  const { data } = await adminHttpClient.get<ApiResponse<AdminProfile>>("/admin/me");
  return data;
}

export async function changeAdminCredentials(
  input: ChangeCredentialsInput
): Promise<ApiResponse<never>> {
  const { data } = await adminHttpClient.put<ApiResponse<never>>("/admin/credentials", input);
  return data;
}
