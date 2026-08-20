import { httpClient } from "./httpClient";
import type { ApiResponse } from "../types/common.types";
import type { HospitalInfo } from "../types/hospitalInfo.types";

export async function fetchHospitalInfo(): Promise<ApiResponse<HospitalInfo>> {
  const { data } = await httpClient.get<ApiResponse<HospitalInfo>>("/settings");
  return data;
}
