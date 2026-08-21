import { AboutSnapshot } from "../components/AboutSnapshot/AboutSnapshot";
import { AnnouncementsBanner } from "../components/AnnouncementsBanner/AnnouncementsBanner";
import { CtaStrip } from "../components/CtaStrip/CtaStrip";
import { FeedbackSection } from "../components/FeedbackSection/FeedbackSection";
import { HeroSection } from "../components/HeroSection/HeroSection";
import { ServiceHighlights } from "../components/ServiceHighlights/ServiceHighlights";
import { StaffShowcase } from "../components/StaffShowcase/StaffShowcase";
import { ErrorState } from "../components/common/ErrorState";
import { LoadingState } from "../components/common/LoadingState";
import { useHospitalInfo } from "../hooks/useHospitalInfo";
import { useLanguage } from "../i18n/LanguageContext";
import { usePageMeta } from "../hooks/usePageMeta";

export function HomePage(): React.JSX.Element {
  const { hospitalInfo, isLoading, error } = useHospitalInfo();
  const { t } = useLanguage();
  usePageMeta(
    "Home",
    "District hospital providing emergency, outpatient, and specialty healthcare services to our community."
  );

  if (isLoading) return <LoadingState label={t("common.loadingHospitalInfo")} />;
  if (error || !hospitalInfo) return <ErrorState message={error ?? t("common.hospitalInfoUnavailable")} />;

  return (
    <>
      <HeroSection hospitalName={hospitalInfo.name} tagline={hospitalInfo.tagline} />
      <AboutSnapshot hospitalInfo={hospitalInfo} />
      <ServiceHighlights />
      <AnnouncementsBanner />
      <StaffShowcase />
      <FeedbackSection />
      <CtaStrip hospitalInfo={hospitalInfo} />
    </>
  );
}
