import { useState, type ChangeEvent, type FormEvent } from "react";
import { submitFeedback } from "../api/feedbackApi";
import { useLanguage } from "../i18n/LanguageContext";
import type { FeedbackFormValues } from "../types/feedback.types";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM: FeedbackFormValues = { rating: 0, comment: "" };

export function useFeedbackForm(): {
  values: FeedbackFormValues;
  status: SubmitStatus;
  serverError: string | null;
  ratingError: string | null;
  setRating: (rating: number) => void;
  handleCommentChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
} {
  const [values, setValues] = useState<FeedbackFormValues>(EMPTY_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [ratingError, setRatingError] = useState<string | null>(null);
  const { t } = useLanguage();

  function setRating(rating: number): void {
    setValues((previous) => ({ ...previous, rating }));
    setRatingError(null);
  }

  function handleCommentChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    setValues((previous) => ({ ...previous, comment: event.target.value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (values.rating < 1) {
      setRatingError(t("feedback.ratingError"));
      return;
    }

    setStatus("submitting");
    setServerError(null);
    try {
      const response = await submitFeedback(values);
      if (response.success) {
        setStatus("success");
        setValues(EMPTY_FORM);
      } else {
        setStatus("error");
        setServerError(response.error ?? t("feedback.genericError"));
      }
    } catch {
      setStatus("error");
      setServerError(t("feedback.networkError"));
    }
  }

  return { values, status, serverError, ratingError, setRating, handleCommentChange, handleSubmit };
}
