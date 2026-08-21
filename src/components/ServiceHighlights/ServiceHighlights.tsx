import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { LoadingState } from "../common/LoadingState";
import { ErrorState } from "../common/ErrorState";
import { useServices } from "../../hooks/useServices";
import { useLanguage } from "../../i18n/LanguageContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { getServiceCategoryIcon } from "../../utils/serviceCategoryIcon";

const FEATURED_SERVICE_COUNT = 6;

export function ServiceHighlights(): React.JSX.Element {
  const { services, isLoading, error } = useServices();
  const featuredServices = (services ?? []).slice(0, FEATURED_SERVICE_COUNT);
  const containerRef = useScrollReveal<HTMLDivElement>(".reveal-item", [isLoading, error]);
  const { t } = useLanguage();

  return (
    <section className="bg-surface-tint py-16 sm:py-24">
      <Container>
        <div ref={containerRef}>
          <SectionHeading
            eyebrow={t("serviceHighlights.eyebrow")}
            title={t("serviceHighlights.title")}
            description={t("serviceHighlights.description")}
          />

          <div className="mt-10">
            {isLoading && <LoadingState label={t("serviceHighlights.loading")} />}
            {error && !isLoading && <ErrorState message={error} />}
            {!isLoading && !error && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredServices.map((service) => {
                  const CategoryIcon = getServiceCategoryIcon(service.category);
                  return (
                    <div key={service._id} className="reveal-item overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                      <div className="flex h-28 items-center justify-center bg-primary-50">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary-700 shadow-sm"><CategoryIcon className="h-6 w-6" aria-hidden="true" /></div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-lg font-medium text-primary-900">{service.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-500">{service.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="reveal-item mt-10 text-center">
            <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-6 py-3 text-sm font-bold text-primary-800 shadow-sm transition hover:border-primary-400">
              {t("serviceHighlights.viewAll")} <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
