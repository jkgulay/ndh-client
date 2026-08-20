import { adminHttpClient } from "./adminHttpClient";
import { httpClient } from "./httpClient";
import type { ApiResponse } from "../types/common.types";
import type { HospitalInfo } from "../types/hospitalInfo.types";

export type HospitalInfoInput = Omit<HospitalInfo, "_id">;

export async function fetchHospitalInfo(): Promise<ApiResponse<HospitalInfo>> {
  const { data } = await httpClient.get<ApiResponse<HospitalInfo>>("/settings");
  return data;
}

export async function updateHospitalInfo(
  input: HospitalInfoInput
): Promise<ApiResponse<HospitalInfo>> {
  const { data } = await adminHttpClient.put<ApiResponse<HospitalInfo>>("/settings", input);
  return data;
}
