import { adminHttpClient } from "./adminHttpClient";
import { createResourceApi } from "./createResourceApi";
import type { ApiResponse } from "../types/common.types";
import type { Announcement } from "../types/announcement.types";

export type AnnouncementInput = Omit<Announcement, "_id" | "createdAt">;

const announcementApi = createResourceApi<Announcement, AnnouncementInput>("announcements");

export const fetchAnnouncements = announcementApi.fetchAll;
export const fetchAnnouncementById = announcementApi.fetchById;
export const fetchAllAnnouncementsForAdmin = announcementApi.fetchAllForAdmin;
export const createAnnouncement = announcementApi.create;
export const updateAnnouncement = announcementApi.update;
export const deleteAnnouncement = announcementApi.remove;

export async function uploadAnnouncementImage(file: File): Promise<ApiResponse<{ url: string }>> {
  const formData = new FormData();
  formData.append("image", file);
  const { data } = await adminHttpClient.post<ApiResponse<{ url: string }>>(
    "/announcements/upload-image",
    formData
  );
  return data;
}
