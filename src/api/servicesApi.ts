import { createResourceApi } from "./createResourceApi";
import type { Service } from "../types/service.types";

export type ServiceInput = Omit<Service, "_id" | "createdAt">;

const serviceApi = createResourceApi<Service, ServiceInput>("services");

export const fetchServices = serviceApi.fetchAll;
export const fetchServiceById = serviceApi.fetchById;
export const fetchAllServicesForAdmin = serviceApi.fetchAllForAdmin;
export const createService = serviceApi.create;
export const updateService = serviceApi.update;
export const deleteService = serviceApi.remove;
