import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { LoadingState } from "../common/LoadingState";
import { ErrorState } from "../common/ErrorState";
import { DoctorCard } from "../DoctorCard/DoctorCard";
import { useDoctors } from "../../hooks/useDoctors";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export function DoctorsShowcase(): React.JSX.Element {
  const { doctors, isLoading, error } = useDoctors();
  const containerRef = useScrollReveal<HTMLDivElement>(".reveal-item", [isLoading, error]);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div ref={containerRef}>
          <SectionHeading eyebrow="Our Team" title="Meet Our Doctors" />

          <div className="mt-10">
            {isLoading && <LoadingState label="Loading doctors…" />}
            {error && !isLoading && <ErrorState message={error} />}
            {!isLoading && !error && doctors && (
              <div className="-mx-4 flex snap-x gap-6 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
                {doctors.map((doctor) => (
                  <div key={doctor._id} className="reveal-item w-64 shrink-0 snap-start sm:w-auto">
                    <DoctorCard doctor={doctor} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="reveal-item mt-10 text-center">
            <Link to="/doctors" className="inline-flex items-center gap-2 rounded-lg border border-primary-200 bg-white px-5 py-3 text-sm font-extrabold text-primary-800 shadow-sm transition hover:border-primary-400">
              View full doctor directory <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
