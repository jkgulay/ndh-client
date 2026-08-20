import { Container } from "../components/common/Container";
import { ErrorState } from "../components/common/ErrorState";
import { LoadingState } from "../components/common/LoadingState";
import { PageHero } from "../components/common/PageHero";
import { ServiceCard } from "../components/ServiceCard/ServiceCard";
import { useServices } from "../hooks/useServices";
import { usePageMeta } from "../hooks/usePageMeta";
import { SERVICE_CATEGORIES } from "../types/service.types";
import type { Service } from "../types/service.types";

function groupServicesByCategory(services: Service[]): Map<string, Service[]> {
  const grouped = new Map<string, Service[]>();
  for (const category of SERVICE_CATEGORIES) {
    const servicesInCategory = services.filter((service) => service.category === category);
    if (servicesInCategory.length > 0) grouped.set(category, servicesInCategory);
  }
  return grouped;
}

export function ServicesPage(): React.JSX.Element {
  const { services, isLoading, error } = useServices();
  usePageMeta("Services", "Browse the full range of medical services offered across our departments.");

  const groupedServices = services ? groupServicesByCategory(services) : new Map<string, Service[]>();

  return (
    <>
      <PageHero
        title="Our Services"
        description="Comprehensive care across emergency, outpatient, diagnostic, and specialty departments."
      />
      <Container className="py-16 sm:py-20">
        {isLoading && <LoadingState label="Loading services…" />}
        {error && !isLoading && <ErrorState message={error} />}
        {!isLoading && !error && groupedServices.size === 0 && (
          <p className="text-center text-slate-500">No services are currently listed.</p>
        )}
        {!isLoading &&
          !error &&
          Array.from(groupedServices.entries()).map(([category, servicesInCategory]) => (
            <section key={category} className="mb-14 last:mb-0">
              <h2 className="mb-6 text-2xl font-bold text-primary-900">{category}</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {servicesInCategory.map((service) => (
                  <ServiceCard key={service._id} service={service} />
                ))}
              </div>
            </section>
          ))}
      </Container>
    </>
  );
}
