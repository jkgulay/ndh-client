import axios from "axios";
import { httpClient } from "./httpClient";
import type { ApiResponse } from "../types/common.types";
import type { ContactFormValues, ContactMessage } from "../types/contact.types";

export async function submitContactForm(
  values: ContactFormValues
): Promise<ApiResponse<ContactMessage>> {
  try {
    const { data } = await httpClient.post<ApiResponse<ContactMessage>>("/contact", values);
    return data;
  } catch (error) {
    if (axios.isAxiosError<ApiResponse<ContactMessage>>(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}
