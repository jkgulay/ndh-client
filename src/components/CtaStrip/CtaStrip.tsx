import { MapPin, Phone } from "lucide-react";
import { Container } from "../common/Container";
import { useLanguage } from "../../i18n/LanguageContext";
import { formatTelHref } from "../../utils/formatTelHref";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useParallax } from "../../hooks/useParallax";
import type { HospitalInfo } from "../../types/hospitalInfo.types";

interface CtaStripProps {
  hospitalInfo: HospitalInfo;
}

export function CtaStrip({ hospitalInfo }: CtaStripProps): React.JSX.Element {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const parallaxRef = useParallax<HTMLImageElement>(12);
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-primary-950 py-16 text-white sm:py-20">
      <img
        ref={parallaxRef}
        src="/components/healthcare1.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-125 object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/95 via-primary-950/85 to-primary-950/95" aria-hidden="true" />
      <Container ref={containerRef} className="relative flex flex-col items-center gap-6 text-center">
        <div className="reveal-item flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-accent-300">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-400" />
          </span>
          {t("ctaStrip.emergencyLabel")}
        </div>
        <p className="reveal-item flex items-center gap-3 font-serif text-2xl font-medium sm:text-3xl">
          <MapPin className="h-6 w-6 shrink-0 text-accent-300" aria-hidden="true" />
          {hospitalInfo.address}
        </p>
        <a
          href={formatTelHref(hospitalInfo.emergencyHotline)}
          className="reveal-item inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3.5 text-sm font-bold shadow-lg shadow-red-950/40 transition hover:-translate-y-0.5 hover:bg-red-500"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          {t("ctaStrip.emergencyLabel")} {hospitalInfo.emergencyHotline}
        </a>
      </Container>
    </section>
  );
}
