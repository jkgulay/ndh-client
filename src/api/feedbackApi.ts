import axios from "axios";
import { adminHttpClient } from "./adminHttpClient";
import { httpClient } from "./httpClient";
import type { ApiResponse } from "../types/common.types";
import type { Feedback, FeedbackFormValues } from "../types/feedback.types";

export async function submitFeedback(values: FeedbackFormValues): Promise<ApiResponse<Feedback>> {
  try {
    const { data } = await httpClient.post<ApiResponse<Feedback>>("/feedback", values);
    return data;
  } catch (error) {
    if (axios.isAxiosError<ApiResponse<Feedback>>(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}

export async function fetchAllFeedbackForAdmin(): Promise<ApiResponse<Feedback[]>> {
  const { data } = await adminHttpClient.get<ApiResponse<Feedback[]>>("/feedback/admin");
  return data;
}

export async function deleteFeedback(id: string): Promise<ApiResponse<never>> {
  const { data } = await adminHttpClient.delete<ApiResponse<never>>(`/feedback/${id}`);
  return data;
}
