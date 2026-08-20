const ADMIN_TOKEN_STORAGE_KEY = "hospital_admin_token";
const ADMIN_SESSION_EXPIRED_KEY = "hospital_admin_session_expired";

export function getAdminToken(): string | null {
  return window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
}

export function setAdminToken(token: string): void {
  window.localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
}

export function clearAdminToken(): void {
  window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
}

export function flagAdminSessionExpired(): void {
  window.sessionStorage.setItem(ADMIN_SESSION_EXPIRED_KEY, "1");
}

export function consumeAdminSessionExpiredFlag(): boolean {
  const wasSet = window.sessionStorage.getItem(ADMIN_SESSION_EXPIRED_KEY) === "1";
  window.sessionStorage.removeItem(ADMIN_SESSION_EXPIRED_KEY);
  return wasSet;
}
