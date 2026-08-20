import { useCallback, useState } from "react";
import { loginAdmin } from "../api/adminAuthApi";
import { clearAdminToken, getAdminToken, setAdminToken } from "../utils/adminToken";

interface UseAdminAuthResult {
  isAuthenticated: boolean;
  isSubmitting: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export function useAdminAuth(): UseAdminAuthResult {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => Boolean(getAdminToken()));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await loginAdmin(username, password);
      if (response.success && response.data) {
        setAdminToken(response.data.token);
        setIsAuthenticated(true);
        return true;
      }
      setError(response.error ?? "Invalid username or password.");
      return false;
    } catch {
      setError("We couldn't reach the server. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const logout = useCallback((): void => {
    clearAdminToken();
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, isSubmitting, error, login, logout };
}
