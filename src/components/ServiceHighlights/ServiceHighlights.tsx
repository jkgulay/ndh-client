import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { LoadingState } from "../common/LoadingState";
import { ErrorState } from "../common/ErrorState";
import { useServices } from "../../hooks/useServices";
import { getServiceCategoryIcon } from "../../utils/serviceCategoryIcon";

const FEATURED_SERVICE_COUNT = 6;

export function ServiceHighlights(): React.JSX.Element {
  const { services, isLoading, error } = useServices();
  const featuredServices = (services ?? []).slice(0, FEATURED_SERVICE_COUNT);

  return (
    <section className="bg-[#f5faff] py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What We Offer"
          title="Services Built Around Our Community"
          description="From emergency care to specialty clinics, our departments are here for every stage of life."
        />

        <div className="mt-10">
          {isLoading && <LoadingState label="Loading services…" />}
          {error && !isLoading && <ErrorState message={error} />}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((service) => {
                const CategoryIcon = getServiceCategoryIcon(service.category);
                return (
                  <div key={service._id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-primary-700"><CategoryIcon className="h-5 w-5" aria-hidden="true" /></div>
                    <h3 className="mt-5 text-lg font-semibold text-primary-900">{service.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <Link to="/services" className="inline-flex items-center rounded-lg border border-primary-200 bg-white px-5 py-3 text-sm font-bold text-primary-700 shadow-sm hover:border-primary-400">
            View all services <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
