import { Building2, BedDouble, CalendarRange, Clock3, HeartPulse, ShieldCheck, Stethoscope } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { useLanguage } from "../../i18n/LanguageContext";
import type { TranslationKey } from "../../i18n/LanguageContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import type { HospitalInfo } from "../../types/hospitalInfo.types";

interface AboutSnapshotProps {
  hospitalInfo: HospitalInfo;
}

const FEATURES: readonly [typeof Stethoscope, TranslationKey, TranslationKey][] = [
  [Stethoscope, "hero.featureExpertDoctorsTitle", "hero.featureExpertDoctorsDesc"],
  [HeartPulse, "hero.featureAdvancedCareTitle", "hero.featureAdvancedCareDesc"],
  [Clock3, "hero.feature247Title", "hero.feature247Desc"],
  [ShieldCheck, "hero.featurePatientFirstTitle", "hero.featurePatientFirstDesc"],
];

export function AboutSnapshot({ hospitalInfo }: AboutSnapshotProps): React.JSX.Element {
  const yearsOfService = new Date().getFullYear() - hospitalInfo.foundedYear;
  const containerRef = useScrollReveal<HTMLDivElement>();
  const { t } = useLanguage();

  const stats = [
    { icon: BedDouble, labelKey: "aboutSnapshot.statBeds" as const, value: hospitalInfo.bedCount },
    { icon: CalendarRange, labelKey: "aboutSnapshot.statYearsOfService" as const, value: yearsOfService },
    { icon: Building2, labelKey: "aboutSnapshot.statDepartments" as const, value: hospitalInfo.departmentCount },
  ];

  const title = t("aboutSnapshot.titleTemplate").replace("{name}", hospitalInfo.name);
  const description = t("aboutSnapshot.descriptionTemplate")
    .replace("{name}", hospitalInfo.name)
    .replace("{year}", String(hospitalInfo.foundedYear));

  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <div ref={containerRef}>
          <SectionHeading eyebrow={t("aboutSnapshot.eyebrow")} title={title} description={description} />
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map(({ icon: Icon, labelKey, value }) => (
              <div key={labelKey} className="reveal-item flex items-center gap-4 rounded-2xl border border-primary-100 bg-[#f5faff] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-primary-700 shadow-sm"><Icon className="h-6 w-6" aria-hidden="true" /></span>
                <div><p className="text-2xl font-bold text-primary-900">{value}</p><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{t(labelKey)}</p></div>
              </div>
            ))}
          </div>

          <div className="reveal-item mt-8 grid grid-cols-2 divide-x divide-primary-100 overflow-hidden rounded-3xl border border-primary-100 bg-[#f5faff] sm:grid-cols-4">
            {FEATURES.map(([Icon, titleKey, descriptionKey]) => (
              <div key={titleKey} className="flex items-start gap-3 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary-700 shadow-sm"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <div><p className="text-sm font-extrabold text-primary-950">{t(titleKey)}</p><p className="mt-1 text-xs leading-5 text-slate-500">{t(descriptionKey)}</p></div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
