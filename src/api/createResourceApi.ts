import { adminHttpClient } from "./adminHttpClient";
import { httpClient } from "./httpClient";
import type { ApiResponse } from "../types/common.types";

export interface ResourceApi<T, TInput> {
  fetchAll: () => Promise<ApiResponse<T[]>>;
  fetchById: (id: string) => Promise<ApiResponse<T>>;
  fetchAllForAdmin: () => Promise<ApiResponse<T[]>>;
  create: (input: TInput) => Promise<ApiResponse<T>>;
  update: (id: string, input: TInput) => Promise<ApiResponse<T>>;
  remove: (id: string) => Promise<ApiResponse<never>>;
}

/**
 * Every hospital-site resource (announcements, staff, careers, services) talks to the backend
 * through the same fetch-all / fetch-by-id / admin-list / create / update / delete calls,
 * differing only in the URL segment and the resource's TS type. This factory is that shape.
 */
export function createResourceApi<T, TInput>(resourcePath: string): ResourceApi<T, TInput> {
  return {
    async fetchAll() {
      const { data } = await httpClient.get<ApiResponse<T[]>>(`/${resourcePath}`);
      return data;
    },

    async fetchById(id) {
      const { data } = await httpClient.get<ApiResponse<T>>(`/${resourcePath}/${id}`);
      return data;
    },

    async fetchAllForAdmin() {
      const { data } = await adminHttpClient.get<ApiResponse<T[]>>(`/${resourcePath}/admin`);
      return data;
    },

    async create(input) {
      const { data } = await adminHttpClient.post<ApiResponse<T>>(`/${resourcePath}`, input);
      return data;
    },

    async update(id, input) {
      const { data } = await adminHttpClient.put<ApiResponse<T>>(`/${resourcePath}/${id}`, input);
      return data;
    },

    async remove(id) {
      const { data } = await adminHttpClient.delete<ApiResponse<never>>(`/${resourcePath}/${id}`);
      return data;
    },
  };
}
