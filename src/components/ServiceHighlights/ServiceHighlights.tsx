import { Link } from "react-router-dom";
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
    <section className="py-16 sm:py-20">
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
                    <CategoryIcon className="h-8 w-8 text-accent-600" aria-hidden="true" />
                    <h3 className="mt-3 text-lg font-semibold text-primary-900">{service.name}</h3>
                    <p className="mt-2 text-sm text-slate-600">{service.description}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <Link to="/services" className="font-semibold text-primary-700 hover:text-primary-800">
            View all services →
          </Link>
        </div>
      </Container>
    </section>
  );
}
