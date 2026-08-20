import { fetchAnnouncements } from "../api/announcementsApi";
import { useFetch } from "./useFetch";
import type { Announcement } from "../types/announcement.types";

export function useAnnouncements(): {
  announcements: Announcement[] | null;
  isLoading: boolean;
  error: string | null;
} {
  const { data, isLoading, error } = useFetch(fetchAnnouncements);
  return { announcements: data, isLoading, error };
}
