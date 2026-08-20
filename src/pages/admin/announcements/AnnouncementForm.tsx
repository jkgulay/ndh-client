import { useState, type FormEvent } from "react";
import { createAnnouncement, updateAnnouncement } from "../../../api/announcementsApi";
import type { AnnouncementInput } from "../../../api/announcementsApi";
import {
  FORM_ERROR_CLASSES as ERROR_CLASSES,
  FORM_INPUT_CLASSES as INPUT_CLASSES,
  FORM_LABEL_CLASSES as LABEL_CLASSES,
} from "../../../components/common/formStyles";
import type { Announcement } from "../../../types/announcement.types";

const EMPTY_VALUES: AnnouncementInput = {
  title: "",
  content: "",
  isActive: true,
  publishedAt: new Date().toISOString().slice(0, 10),
};

function toFormValues(announcement: Announcement | null): AnnouncementInput {
  if (!announcement) return EMPTY_VALUES;
  return {
    title: announcement.title,
    content: announcement.content,
    isActive: announcement.isActive,
    publishedAt: announcement.publishedAt.slice(0, 10),
  };
}

interface AnnouncementFormProps {
  initialValue: Announcement | null;
  onCancel: () => void;
  onSaved: () => void;
}

export function AnnouncementForm({
  initialValue,
  onCancel,
  onSaved,
}: AnnouncementFormProps): React.JSX.Element {
  const [values, setValues] = useState<AnnouncementInput>(toFormValues(initialValue));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsSubmitting(true);
    setServerError(null);
    try {
      const response = initialValue
        ? await updateAnnouncement(initialValue._id, values)
        : await createAnnouncement(values);
      if (response.success) {
        onSaved();
      } else {
        setServerError(response.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setServerError("We couldn't save this announcement. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor="title" className={LABEL_CLASSES}>
          Title
        </label>
        <input
          id="title"
          type="text"
          required
          value={values.title}
          onChange={(event) => setValues((prev) => ({ ...prev, title: event.target.value }))}
          className={INPUT_CLASSES}
        />
      </div>

      <div>
        <label htmlFor="content" className={LABEL_CLASSES}>
          Content
        </label>
        <textarea
          id="content"
          rows={5}
          required
          value={values.content}
          onChange={(event) => setValues((prev) => ({ ...prev, content: event.target.value }))}
          className={INPUT_CLASSES}
        />
      </div>

      <div>
        <label htmlFor="publishedAt" className={LABEL_CLASSES}>
          Published date
        </label>
        <input
          id="publishedAt"
          type="date"
          required
          value={values.publishedAt.slice(0, 10)}
          onChange={(event) => setValues((prev) => ({ ...prev, publishedAt: event.target.value }))}
          className={INPUT_CLASSES}
        />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
        <input
          type="checkbox"
          checked={values.isActive}
          onChange={(event) => setValues((prev) => ({ ...prev, isActive: event.target.checked }))}
          className="h-4 w-4 rounded border-slate-300 text-primary-700 focus:ring-primary-400"
        />
        Active (visible on the public site)
      </label>

      {serverError && (
        <p role="alert" className={ERROR_CLASSES}>
          {serverError}
        </p>
      )}

      <div className="mt-2 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
