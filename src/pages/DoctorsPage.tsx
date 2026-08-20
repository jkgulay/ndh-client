import { Container } from "../components/common/Container";
import { ErrorState } from "../components/common/ErrorState";
import { LoadingState } from "../components/common/LoadingState";
import { PageHero } from "../components/common/PageHero";
import { DoctorCard } from "../components/DoctorCard/DoctorCard";
import { DoctorFilters } from "../components/DoctorFilters/DoctorFilters";
import { useDoctorDirectory } from "../hooks/useDoctorDirectory";
import { usePageMeta } from "../hooks/usePageMeta";

export function DoctorsPage(): React.JSX.Element {
  const {
    filteredDoctors,
    specializations,
    searchTerm,
    setSearchTerm,
    selectedSpecialization,
    setSelectedSpecialization,
    isLoading,
    error,
  } = useDoctorDirectory();
  usePageMeta("Doctors", "Find and search our directory of doctors by name or specialization.");

  return (
    <>
      <PageHero title="Our Doctors" description="Meet the physicians and specialists who care for our community." />
      <Container className="py-16 sm:py-20">
        <DoctorFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          specializations={specializations}
          selectedSpecialization={selectedSpecialization}
          onSpecializationChange={setSelectedSpecialization}
        />

        <div className="mt-10">
          {isLoading && <LoadingState label="Loading doctors…" />}
          {error && !isLoading && <ErrorState message={error} />}
          {!isLoading && !error && filteredDoctors.length === 0 && (
            <p className="text-center text-slate-500">No doctors match your search.</p>
          )}
          {!isLoading && !error && filteredDoctors.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
