import { createResourceApi } from "./createResourceApi";
import type { Career } from "../types/career.types";

export type CareerInput = Omit<Career, "_id" | "createdAt">;

const careerApi = createResourceApi<Career, CareerInput>("careers");

export const fetchCareers = careerApi.fetchAll;
export const fetchCareerById = careerApi.fetchById;
export const fetchAllCareersForAdmin = careerApi.fetchAllForAdmin;
export const createCareer = careerApi.create;
export const updateCareer = careerApi.update;
export const deleteCareer = careerApi.remove;
