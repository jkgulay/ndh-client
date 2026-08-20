import { CheckCircle2 } from "lucide-react";
import { useContactForm } from "../../hooks/useContactForm";

const INPUT_CLASSES =
  "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200";
const LABEL_CLASSES = "mb-1.5 block text-sm font-medium text-slate-700";
const ERROR_CLASSES = "mt-1 text-sm text-red-600";

export function ContactForm(): React.JSX.Element {
  const { values, fieldErrors, status, serverError, handleChange, handleSubmit } = useContactForm();

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-xl border border-accent-200 bg-accent-50 px-6 py-12 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-accent-600" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-primary-900">Message sent</h3>
        <p className="text-slate-600">
          Thank you for reaching out. Our team will get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className={LABEL_CLASSES}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          className={INPUT_CLASSES}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "name-error" : undefined}
        />
        {fieldErrors.name && (
          <p id="name-error" className={ERROR_CLASSES}>
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={LABEL_CLASSES}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          className={INPUT_CLASSES}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
        />
        {fieldErrors.email && (
          <p id="email-error" className={ERROR_CLASSES}>
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className={LABEL_CLASSES}>
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={handleChange}
          className={INPUT_CLASSES}
          aria-invalid={Boolean(fieldErrors.subject)}
          aria-describedby={fieldErrors.subject ? "subject-error" : undefined}
        />
        {fieldErrors.subject && (
          <p id="subject-error" className={ERROR_CLASSES}>
            {fieldErrors.subject}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={LABEL_CLASSES}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          className={INPUT_CLASSES}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
        />
        {fieldErrors.message && (
          <p id="message-error" className={ERROR_CLASSES}>
            {fieldErrors.message}
          </p>
        )}
      </div>

      {status === "error" && serverError && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-primary-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
