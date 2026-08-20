import { useState, type ChangeEvent, type FormEvent } from "react";
import { submitContactForm } from "../api/contactApi";
import type { ContactFormValues } from "../types/contact.types";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM: ContactFormValues = { name: "", email: "", subject: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: ContactFormValues): Partial<Record<keyof ContactFormValues, string>> {
  const errors: Partial<Record<keyof ContactFormValues, string>> = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(values.email)) errors.email = "Please enter a valid email address.";
  if (!values.subject.trim()) errors.subject = "Please enter a subject.";
  if (!values.message.trim()) errors.message = "Please enter a message.";
  return errors;
}

export function useContactForm(): {
  values: ContactFormValues;
  fieldErrors: Partial<Record<keyof ContactFormValues, string>>;
  status: SubmitStatus;
  serverError: string | null;
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
} {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const errors = validate(values);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus("submitting");
    setServerError(null);
    try {
      const response = await submitContactForm(values);
      if (response.success) {
        setStatus("success");
        setValues(EMPTY_FORM);
      } else {
        setStatus("error");
        setServerError(response.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerError("We couldn't send your message. Please check your connection and try again.");
    }
  }

  return { values, fieldErrors, status, serverError, handleChange, handleSubmit };
}
