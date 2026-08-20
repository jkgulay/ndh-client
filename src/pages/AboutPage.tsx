import { AccreditationsSection } from "../components/About/AccreditationsSection";
import { AdministrationSection } from "../components/About/AdministrationSection";
import { CoreValuesSection } from "../components/About/CoreValuesSection";
import { FacilitiesSection } from "../components/About/FacilitiesSection";
import { HistorySection } from "../components/About/HistorySection";
import { MissionVisionSection } from "../components/About/MissionVisionSection";
import { ErrorState } from "../components/common/ErrorState";
import { LoadingState } from "../components/common/LoadingState";
import { PageHero } from "../components/common/PageHero";
import { useHospitalInfo } from "../hooks/useHospitalInfo";
import { usePageMeta } from "../hooks/usePageMeta";

export function AboutPage(): React.JSX.Element {
  const { hospitalInfo, isLoading, error } = useHospitalInfo();
  usePageMeta("About Us", "Learn about our hospital's mission, history, facilities, and leadership.");

  return (
    <>
      <PageHero title="About Us" description="Decades of dedicated care, rooted in our community." />

      {isLoading && <LoadingState label="Loading hospital information…" />}
      {error && !isLoading && <ErrorState message={error} />}
      {!isLoading && !error && hospitalInfo && (
        <>
          <MissionVisionSection />
          <CoreValuesSection />
          <HistorySection foundedYear={hospitalInfo.foundedYear} />
          <AccreditationsSection accreditations={hospitalInfo.accreditations} />
          <FacilitiesSection />
          <AdministrationSection />
        </>
      )}
    </>
  );
}
