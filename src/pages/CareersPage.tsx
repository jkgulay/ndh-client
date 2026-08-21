import { HeartHandshake, GraduationCap, Users, ShieldCheck } from "lucide-react";
import { Container } from "../components/common/Container";
import { ErrorState } from "../components/common/ErrorState";
import { LoadingState } from "../components/common/LoadingState";
import { PageHero } from "../components/common/PageHero";
import { SectionHeading } from "../components/common/SectionHeading";
import { JobCard } from "../components/JobCard/JobCard";
import { useCareers } from "../hooks/useCareers";
import { useLanguage } from "../i18n/LanguageContext";
import { usePageMeta } from "../hooks/usePageMeta";

const WHY_WORK_WITH_US = [
  {
    icon: HeartHandshake,
    title: "Meaningful Work",
    description: "Every role directly supports patient care in the community you call home.",
  },
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    description: "Ongoing training, certifications, and mentorship for clinical and non-clinical staff alike.",
  },
  {
    icon: Users,
    title: "Supportive Team",
    description: "Join a close-knit staff that collaborates across departments to deliver the best outcomes.",
  },
  {
    icon: ShieldCheck,
    title: "Stable Benefits",
    description: "Competitive compensation, PhilHealth and SSS coverage, and clear paths for advancement.",
  },
];

const APPLICATION_STEPS = [
  "Review the open positions below and find a role that matches your qualifications.",
  "Prepare your resume, license or certification copies, and a short cover letter.",
  "Send your application using the instructions listed on the job posting, or visit our HR office in person.",
  "Shortlisted applicants will be contacted for an interview and initial assessment.",
];

export function CareersPage(): React.JSX.Element {
  const { careers, isLoading, error } = useCareers();
  const { t } = useLanguage();
  usePageMeta("Careers", "Explore open positions and learn how to apply to join our hospital team.");

  return (
    <>
      <PageHero title={t("pageHeroCareers.title")} description={t("pageHeroCareers.description")} />

      <Container className="py-16 sm:py-20">
        <SectionHeading eyebrow={t("careersPage.whyJoinEyebrow")} title={t("careersPage.whyJoinTitle")} />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_WORK_WITH_US.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <Icon className="mx-auto h-8 w-8 text-primary-700" aria-hidden="true" />
              <h3 className="mt-3 font-semibold text-primary-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container className="pb-16 sm:pb-20">
        <SectionHeading eyebrow={t("careersPage.openPositionsEyebrow")} title={t("careersPage.openPositionsTitle")} />
        <div className="mt-10">
          {isLoading && <LoadingState label={t("careersPage.loading")} />}
          {error && !isLoading && <ErrorState message={error} />}
          {!isLoading && !error && (careers ?? []).length === 0 && (
            <p className="text-center text-slate-500">{t("careersPage.empty")}</p>
          )}
          {!isLoading && !error && (careers ?? []).length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(careers ?? []).map((career) => (
                <JobCard key={career._id} career={career} />
              ))}
            </div>
          )}
        </div>
      </Container>

      <Container className="pb-16 sm:pb-20">
        <SectionHeading eyebrow={t("careersPage.howToApplyEyebrow")} title={t("careersPage.howToApplyTitle")} />
        <ol className="mx-auto mt-10 max-w-2xl space-y-4">
          {APPLICATION_STEPS.map((step, index) => (
            <li key={step} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-700 font-semibold text-white">
                {index + 1}
              </span>
              <p className="text-slate-600">{step}</p>
            </li>
          ))}
        </ol>
      </Container>
    </>
  );
}
