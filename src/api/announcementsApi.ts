import { adminHttpClient } from "./adminHttpClient";
import { httpClient } from "./httpClient";
import type { ApiResponse } from "../types/common.types";
import type { Announcement } from "../types/announcement.types";

export type AnnouncementInput = Omit<Announcement, "_id" | "createdAt">;

export async function fetchAnnouncements(): Promise<ApiResponse<Announcement[]>> {
  const { data } = await httpClient.get<ApiResponse<Announcement[]>>("/announcements");
  return data;
}

export async function fetchAnnouncementById(id: string): Promise<ApiResponse<Announcement>> {
  const { data } = await httpClient.get<ApiResponse<Announcement>>(`/announcements/${id}`);
  return data;
}

export async function fetchAllAnnouncementsForAdmin(): Promise<ApiResponse<Announcement[]>> {
  const { data } = await adminHttpClient.get<ApiResponse<Announcement[]>>("/announcements/admin");
  return data;
}

export async function createAnnouncement(
  input: AnnouncementInput
): Promise<ApiResponse<Announcement>> {
  const { data } = await adminHttpClient.post<ApiResponse<Announcement>>("/announcements", input);
  return data;
}

export async function updateAnnouncement(
  id: string,
  input: AnnouncementInput
): Promise<ApiResponse<Announcement>> {
  const { data } = await adminHttpClient.put<ApiResponse<Announcement>>(
    `/announcements/${id}`,
    input
  );
  return data;
}

export async function deleteAnnouncement(id: string): Promise<ApiResponse<never>> {
  const { data } = await adminHttpClient.delete<ApiResponse<never>>(`/announcements/${id}`);
  return data;
}
