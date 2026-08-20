import axios from "axios";
import { clearAdminToken, flagAdminSessionExpired, getAdminToken } from "../utils/adminToken";

const ADMIN_LOGIN_PATH = "/admin/login";
const UNAUTHORIZED_STATUS = 401;

export const adminHttpClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  validateStatus: () => true,
});

adminHttpClient.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

adminHttpClient.interceptors.response.use((response) => {
  if (response.status === UNAUTHORIZED_STATUS && window.location.pathname !== ADMIN_LOGIN_PATH) {
    clearAdminToken();
    flagAdminSessionExpired();
    window.location.href = ADMIN_LOGIN_PATH;
  }
  return response;
});
