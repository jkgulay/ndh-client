import { Building2, BedDouble, CalendarRange, Clock3, HeartPulse, ShieldCheck, Stethoscope } from "lucide-react";
import { Container } from "../common/Container";
import { useLanguage } from "../../i18n/LanguageContext";
import type { TranslationKey } from "../../i18n/LanguageContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useCountUp } from "../../hooks/useCountUp";
import { useParallax } from "../../hooks/useParallax";
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
  const statsRef = useCountUp<HTMLDivElement>();
  const parallaxRef = useParallax<HTMLImageElement>(8);
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
        <div ref={containerRef} className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal-item relative order-2">
            <span
              aria-hidden="true"
              className="animate-float absolute -right-6 -top-6 hidden h-32 w-32 rounded-full bg-surface-tint sm:block"
            />
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-xl shadow-primary-900/10">
              <img
                ref={parallaxRef}
                src="/components/hospitalnas.png"
                alt={`${hospitalInfo.name} facility`}
                className="aspect-[4/5] w-full scale-125 object-cover"
              />
            </div>
            <span
              aria-hidden="true"
              className="animate-float-slow absolute -left-4 -bottom-4 hidden h-24 w-24 rounded-full border-4 border-white bg-accent-200/70 sm:block"
            />
          </div>

          <div className="order-1 text-left">
            <p className="reveal-item mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-accent-600">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-500" />
              </span>
              {t("aboutSnapshot.eyebrow")}
            </p>
            <h2 className="reveal-item font-serif text-3xl font-medium leading-tight text-primary-950 sm:text-4xl">{title}</h2>
            <p className="reveal-item mt-4 text-slate-500">{description}</p>

            <div ref={statsRef} className="reveal-item mt-8 grid grid-cols-3 gap-3">
              {stats.map(({ icon: Icon, labelKey, value }) => (
                <div key={labelKey} className="rounded-2xl bg-surface-muted p-4 text-center transition hover:-translate-y-1 hover:shadow-sm">
                  <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary-700 shadow-sm"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <p data-countup={value} className="mt-3 font-serif text-xl font-medium text-primary-900">{value}</p>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">{t(labelKey)}</p>
                </div>
              ))}
            </div>

            <div className="reveal-item mt-6 flex flex-col divide-y divide-primary-100 rounded-3xl border border-primary-100">
              {FEATURES.map(([Icon, titleKey, descriptionKey]) => (
                <div key={titleKey} className="flex items-start gap-3 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-tint text-primary-700"><Icon className="h-4 w-4" aria-hidden="true" /></span>
                  <div><p className="text-sm font-bold text-primary-950">{t(titleKey)}</p><p className="mt-0.5 text-xs leading-5 text-slate-500">{t(descriptionKey)}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
