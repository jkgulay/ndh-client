import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { LoadingState } from "../common/LoadingState";
import { ErrorState } from "../common/ErrorState";
import { StaffCard } from "../StaffCard/StaffCard";
import { useStaff } from "../../hooks/useStaff";
import { useLanguage } from "../../i18n/LanguageContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export function StaffShowcase(): React.JSX.Element {
  const { staff, isLoading, error } = useStaff();
  const containerRef = useScrollReveal<HTMLDivElement>(".reveal-item", [isLoading, error]);
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div ref={containerRef}>
          <SectionHeading eyebrow={t("staffShowcase.eyebrow")} title={t("staffShowcase.title")} />

          <div className="mt-10">
            {isLoading && <LoadingState label={t("staffShowcase.loading")} />}
            {error && !isLoading && <ErrorState message={error} />}
            {!isLoading && !error && staff && (
              <div className="-mx-4 flex snap-x gap-6 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
                {staff.map((member) => (
                  <div key={member._id} className="reveal-item w-64 shrink-0 snap-start sm:w-auto">
                    <StaffCard member={member} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="reveal-item mt-10 text-center">
            <Link to="/staff" className="inline-flex items-center gap-2 rounded-lg border border-primary-200 bg-white px-5 py-3 text-sm font-extrabold text-primary-800 shadow-sm transition hover:border-primary-400">
              {t("staffShowcase.viewAll")} <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
