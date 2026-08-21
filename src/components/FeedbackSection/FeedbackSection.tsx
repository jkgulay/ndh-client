import { CheckCircle2 } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { useFeedbackForm } from "../../hooks/useFeedbackForm";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { StarRating } from "./StarRating";
import { FORM_LABEL_CLASSES as LABEL_CLASSES } from "../common/formStyles";

const COMMENT_MAX_LENGTH = 1000;

export function FeedbackSection(): React.JSX.Element {
  const { values, status, serverError, ratingError, setRating, handleCommentChange, handleSubmit } = useFeedbackForm();
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-[#f5faff] py-16 sm:py-24">
      <Container>
        <div ref={containerRef}>
          <SectionHeading eyebrow="Patient Feedback" title="How Are We Doing?" description="Your rating and comments help us keep improving the care we provide." />

          <div className="reveal-item mx-auto mt-10 max-w-xl rounded-3xl border border-primary-100 bg-white p-6 shadow-sm sm:p-10">
            {status === "success" ? (
              <div role="status" className="flex flex-col items-center gap-3 py-6 text-center">
                <CheckCircle2 className="h-10 w-10 text-accent-600" aria-hidden="true" />
                <h3 className="text-lg font-bold text-primary-900">Thank you for your feedback</h3>
                <p className="text-slate-600">We appreciate you taking the time to help us improve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                <div>
                  <StarRating value={values.rating} onChange={setRating} />
                  {ratingError && (
                    <p role="alert" className="mt-2 text-center text-sm text-red-600">
                      {ratingError}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="comment" className={LABEL_CLASSES}>
                    Comments <span className="font-normal normal-case text-slate-400">(optional)</span>
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={4}
                    maxLength={COMMENT_MAX_LENGTH}
                    value={values.comment}
                    onChange={handleCommentChange}
                    placeholder="Tell us about your experience…"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  />
                </div>

                {status === "error" && serverError && (
                  <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                    {serverError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center justify-center rounded-lg bg-primary-700 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-primary-700/20 transition hover:-translate-y-0.5 hover:bg-primary-800 disabled:pointer-events-none disabled:opacity-60"
                >
                  {status === "submitting" ? "Submitting…" : "Submit Feedback"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
