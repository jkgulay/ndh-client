import { httpClient } from "./httpClient";
import type { ApiResponse } from "../types/common.types";
import type { Announcement } from "../types/announcement.types";

export async function fetchAnnouncements(): Promise<ApiResponse<Announcement[]>> {
  const { data } = await httpClient.get<ApiResponse<Announcement[]>>("/announcements");
  return data;
}

export async function fetchAnnouncementById(id: string): Promise<ApiResponse<Announcement>> {
  const { data } = await httpClient.get<ApiResponse<Announcement>>(`/announcements/${id}`);
  return data;
}
