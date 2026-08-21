import { createResourceApi } from "./createResourceApi";
import type { Announcement } from "../types/announcement.types";

export type AnnouncementInput = Omit<Announcement, "_id" | "createdAt">;

const announcementApi = createResourceApi<Announcement, AnnouncementInput>("announcements");

export const fetchAnnouncements = announcementApi.fetchAll;
export const fetchAnnouncementById = announcementApi.fetchById;
export const fetchAllAnnouncementsForAdmin = announcementApi.fetchAllForAdmin;
export const createAnnouncement = announcementApi.create;
export const updateAnnouncement = announcementApi.update;
export const deleteAnnouncement = announcementApi.remove;
