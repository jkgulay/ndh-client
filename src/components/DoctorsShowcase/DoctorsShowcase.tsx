import { Link } from "react-router-dom";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { LoadingState } from "../common/LoadingState";
import { ErrorState } from "../common/ErrorState";
import { DoctorCard } from "../DoctorCard/DoctorCard";
import { useDoctors } from "../../hooks/useDoctors";

export function DoctorsShowcase(): React.JSX.Element {
  const { doctors, isLoading, error } = useDoctors();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Our Team" title="Meet Our Doctors" />

        <div className="mt-10">
          {isLoading && <LoadingState label="Loading doctors…" />}
          {error && !isLoading && <ErrorState message={error} />}
          {!isLoading && !error && doctors && (
            <div className="-mx-4 flex snap-x gap-6 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
              {doctors.map((doctor) => (
                <div key={doctor._id} className="w-64 shrink-0 snap-start sm:w-auto">
                  <DoctorCard doctor={doctor} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <Link to="/doctors" className="font-semibold text-primary-700 hover:text-primary-800">
            View full doctor directory →
          </Link>
        </div>
      </Container>
    </section>
  );
}
