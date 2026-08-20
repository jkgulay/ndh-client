import { useCallback } from "react";
import { fetchAnnouncementById } from "../api/announcementsApi";
import { useFetch } from "./useFetch";
import type { ApiResponse } from "../types/common.types";
import type { Announcement } from "../types/announcement.types";

export function useAnnouncementDetail(id: string): {
  announcement: Announcement | null;
  isLoading: boolean;
  error: string | null;
} {
  const fetcher = useCallback((): Promise<ApiResponse<Announcement>> => {
    return fetchAnnouncementById(id);
  }, [id]);

  const { data, isLoading, error } = useFetch(fetcher);
  return { announcement: data, isLoading, error };
}
