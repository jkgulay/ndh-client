import { useEffect, useState } from "react";
import type { ApiResponse } from "../types/common.types";

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export function useFetch<T>(fetcher: () => Promise<ApiResponse<T>>): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load(): Promise<void> {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetcher();
        if (!isMounted) return;
        if (response.success && response.data !== undefined) {
          setData(response.data);
        } else {
          setError(response.error ?? "Unable to load data right now.");
        }
      } catch {
        if (isMounted) setError("Unable to reach the server. Please try again later.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void load();

    return () => {
      isMounted = false;
    };
  }, [fetcher]);

  return { data, isLoading, error };
}
