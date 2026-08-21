import { useState, type ChangeEvent, type FormEvent } from "react";
import { submitContactForm } from "../api/contactApi";
import { useLanguage } from "../i18n/LanguageContext";
import type { TranslateFn } from "../i18n/LanguageContext";
import type { ContactFormValues } from "../types/contact.types";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM: ContactFormValues = { name: "", email: "", subject: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: ContactFormValues, t: TranslateFn): Partial<Record<keyof ContactFormValues, string>> {
  const errors: Partial<Record<keyof ContactFormValues, string>> = {};
  if (!values.name.trim()) errors.name = t("contactForm.nameRequired");
  if (!EMAIL_PATTERN.test(values.email)) errors.email = t("contactForm.emailInvalid");
  if (!values.subject.trim()) errors.subject = t("contactForm.subjectRequired");
  if (!values.message.trim()) errors.message = t("contactForm.messageRequired");
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
  const { t } = useLanguage();

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const errors = validate(values, t);
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
        setServerError(response.error ?? t("contactForm.genericError"));
      }
    } catch {
      setStatus("error");
      setServerError(t("contactForm.networkError"));
    }
  }

  return { values, fieldErrors, status, serverError, handleChange, handleSubmit };
}
