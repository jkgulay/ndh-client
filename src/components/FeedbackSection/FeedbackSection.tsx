import { CheckCircle2 } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { useFeedbackForm } from "../../hooks/useFeedbackForm";
import { useLanguage } from "../../i18n/LanguageContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { StarRating } from "./StarRating";
import { FORM_LABEL_CLASSES as LABEL_CLASSES } from "../common/formStyles";

const COMMENT_MAX_LENGTH = 1000;

export function FeedbackSection(): React.JSX.Element {
  const { values, status, serverError, ratingError, setRating, handleCommentChange, handleSubmit } = useFeedbackForm();
  const containerRef = useScrollReveal<HTMLDivElement>();
  const { t } = useLanguage();

  return (
    <section className="bg-surface-tint py-16 sm:py-24">
      <Container>
        <div ref={containerRef}>
          <SectionHeading eyebrow={t("feedback.eyebrow")} title={t("feedback.title")} description={t("feedback.description")} />

          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 items-center gap-8 lg:grid-cols-[0.8fr_1fr]">
            <div className="reveal-item relative hidden overflow-hidden rounded-[2.5rem] shadow-xl shadow-primary-900/10 lg:block">
              <img
                src="/components/pexels-karola-g-4386466.jpg"
                alt="Patient care at Nasipit District Hospital"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 via-primary-900/0 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs font-bold uppercase tracking-wider text-white/80">{t("feedback.eyebrow")}</p>
                <p className="mt-1 font-serif text-lg font-medium text-white">{t("feedback.title")}</p>
              </div>
            </div>

          <div className="reveal-item rounded-[2.5rem] bg-white p-6 shadow-sm sm:p-10">
            {status === "success" ? (
              <div role="status" className="flex flex-col items-center gap-3 py-6 text-center">
                <CheckCircle2 className="h-10 w-10 text-accent-600" aria-hidden="true" />
                <h3 className="font-serif text-lg font-medium text-primary-900">{t("feedback.thankYouTitle")}</h3>
                <p className="text-slate-500">{t("feedback.thankYouDesc")}</p>
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
                    {t("feedback.commentLabel")} <span className="font-normal normal-case text-slate-400">{t("feedback.optional")}</span>
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={4}
                    maxLength={COMMENT_MAX_LENGTH}
                    value={values.comment}
                    onChange={handleCommentChange}
                    placeholder={t("feedback.placeholder")}
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
                  className="inline-flex items-center justify-center rounded-full bg-primary-800 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary-900/20 transition hover:-translate-y-0.5 hover:bg-primary-900 disabled:pointer-events-none disabled:opacity-60"
                >
                  {status === "submitting" ? t("feedback.submitting") : t("feedback.submit")}
                </button>
              </form>
            )}
          </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
