import { ChevronRight, Clock3, Maximize2, MapPin, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import type { TranslationKey } from "../../i18n/LanguageContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";

interface HeroSectionProps {
  hospitalName: string;
  tagline: string;
}

const STATS: readonly (readonly [string, TranslationKey])[] = [
  ["25+", "hero.statYearsOfCare"],
  ["50+", "hero.statExpertDoctors"],
  ["12", "hero.statDepartments"],
  ["24/7", "hero.statEmergencySupport"],
];

function HeroWord({ children, className = "" }: { children: string; className?: string }): React.JSX.Element {
  return (
    <span className={`inline-block overflow-hidden pb-2 align-bottom sm:pb-3 ${className}`}>
      <span className="hero-word inline-block">{children}</span>
    </span>
  );
}

export function HeroSection({ hospitalName, tagline }: HeroSectionProps): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const belowFoldRef = useScrollReveal<HTMLDivElement>();
  const { t } = useLanguage();

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const timeline = gsap.timeline();
      timeline
        .from(".hero-word", { yPercent: 120, opacity: 0, duration: 0.9, ease: "power4.out", stagger: 0.07 })
        .from(".hero-reveal", { y: 28, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.55")
        .from(".hero-photo", { scale: 1.08, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=0.9");
    }, sectionRef);
    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-surface-tint">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 px-4 pb-10 pt-12 sm:px-8 sm:pb-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:px-12 lg:pb-16 lg:pt-16">
        <div className="hero-photo relative">
          <span
            aria-hidden="true"
            className="absolute -right-6 -top-6 hidden h-28 w-28 rounded-full border-4 border-white/70 bg-accent-200/60 sm:block"
          />
          <div className="relative min-h-[360px] overflow-hidden rounded-[2.5rem] bg-primary-200 shadow-2xl shadow-primary-900/15 sm:min-h-[480px]">
            <img src="/components/nasipitpics.png" alt="Nasipit District Hospital staff and facility" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-950/60 via-primary-900/5 to-transparent" />
            <span
              aria-hidden="true"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-sm sm:right-7 sm:top-7"
            >
              <Maximize2 className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="hero-reveal absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-full border border-white/20 bg-white/90 p-2 pl-5 shadow-xl backdrop-blur sm:bottom-7 sm:left-7 sm:right-7">
              <div><p className="text-xs font-bold uppercase tracking-wider text-accent-600">{t("hero.yourHealthPriority")}</p><p className="mt-1 font-serif text-sm font-medium text-primary-950">{t("hero.careThatFeelsPersonal")}</p></div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-800 text-white"><MapPin className="h-4 w-4" aria-hidden="true" /></span>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="hero-reveal mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-accent-600">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" /> {t("hero.welcomeTo")} {hospitalName}
          </p>
          <h1 className="max-w-xl font-serif text-5xl font-medium leading-[1.03] text-primary-950 sm:text-6xl lg:text-[4.5rem]">
            <HeroWord key={`${t("hero.headlineWord1")}-1`}>{t("hero.headlineWord1")}</HeroWord>{" "}
            <HeroWord key={`${t("hero.headlineWord2")}-2`}>{t("hero.headlineWord2")}</HeroWord>
            <span className="block italic text-accent-600">
              <HeroWord key={`${t("hero.headlineWord3")}-3`}>{t("hero.headlineWord3")}</HeroWord>{" "}
              <HeroWord key={`${t("hero.headlineWord4")}-4`}>{t("hero.headlineWord4")}</HeroWord>
            </span>
          </h1>
          <p className="hero-reveal mt-6 max-w-lg text-base leading-7 text-slate-500 sm:text-lg">{tagline}. {t("hero.taglineSuffix")}</p>
          <div className="hero-reveal mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-800 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary-900/20 transition hover:-translate-y-0.5 hover:bg-primary-900"
            >
              {t("hero.exploreServices")}
            </Link>
            <Link
              to="/services"
              aria-hidden="true"
              tabIndex={-1}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-primary-200 bg-white text-primary-800 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-400"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="hero-reveal mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent-600" /> {t("hero.trustedProfessionals")}</span>
            <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-accent-600" /> {t("hero.open247")}</span>
          </div>
        </div>
      </div>

      <div ref={belowFoldRef} className="relative z-20 mx-auto -mt-8 max-w-[1400px] px-4 sm:-mt-10 sm:px-8 lg:-mt-12 lg:px-12">
        <div className="reveal-item grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-primary-100 bg-primary-100 shadow-2xl shadow-primary-900/10 sm:grid-cols-4 sm:rounded-full">
          {STATS.map(([value, labelKey]) => (
            <div key={labelKey} className="bg-white px-3 py-5 text-center sm:py-6">
              <p className="font-serif text-xl font-medium text-primary-800 sm:text-2xl">{value}</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">{t(labelKey)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-8 sm:h-10 lg:h-12" aria-hidden="true" />
    </section>
  );
}
