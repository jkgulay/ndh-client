import { Container } from "../components/common/Container";
import { ErrorState } from "../components/common/ErrorState";
import { LoadingState } from "../components/common/LoadingState";
import { PageHero } from "../components/common/PageHero";
import { StaffCard } from "../components/StaffCard/StaffCard";
import { StaffFilters } from "../components/StaffFilters/StaffFilters";
import { useStaffDirectory } from "../hooks/useStaffDirectory";
import { useLanguage } from "../i18n/LanguageContext";
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
  const { t } = useLanguage();
  usePageMeta("Our Team", "Find and search our directory of doctors, nurses, and hospital staff by name or role.");

  return (
    <>
      <PageHero title={t("pageHeroStaff.title")} description={t("pageHeroStaff.description")} />
      <Container className="py-16 sm:py-20">
        <StaffFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          roles={roles}
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
        />

        <div className="mt-10">
          {isLoading && <LoadingState label={t("staffShowcase.loading")} />}
          {error && !isLoading && <ErrorState message={error} />}
          {!isLoading && !error && filteredStaff.length === 0 && (
            <p className="text-center text-slate-500">{t("staffPage.empty")}</p>
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
