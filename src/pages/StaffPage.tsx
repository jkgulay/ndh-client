import { Container } from "../components/common/Container";
import { ErrorState } from "../components/common/ErrorState";
import { LoadingState } from "../components/common/LoadingState";
import { PageHero } from "../components/common/PageHero";
import { StaffCard } from "../components/StaffCard/StaffCard";
import { StaffFilters } from "../components/StaffFilters/StaffFilters";
import { useStaffDirectory } from "../hooks/useStaffDirectory";
import { usePageMeta } from "../hooks/usePageMeta";

export function StaffPage(): React.JSX.Element {
  const {
    filteredStaff,
    roles,
    searchTerm,
    setSearchTerm,
    selectedRole,
    setSelectedRole,
    isLoading,
    error,
  } = useStaffDirectory();
  usePageMeta("Our Team", "Find and search our directory of doctors, nurses, and hospital staff by name or role.");

  return (
    <>
      <PageHero title="Our Team" description="Meet the doctors, nurses, and staff who care for our community." />
      <Container className="py-16 sm:py-20">
        <StaffFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          roles={roles}
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
        />

        <div className="mt-10">
          {isLoading && <LoadingState label="Loading our team…" />}
          {error && !isLoading && <ErrorState message={error} />}
          {!isLoading && !error && filteredStaff.length === 0 && (
            <p className="text-center text-slate-500">No staff match your search.</p>
          )}
          {!isLoading && !error && filteredStaff.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredStaff.map((member) => (
                <StaffCard key={member._id} member={member} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
