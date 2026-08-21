import { MapPin, Phone } from "lucide-react";
import { Container } from "../common/Container";
import { formatTelHref } from "../../utils/formatTelHref";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import type { HospitalInfo } from "../../types/hospitalInfo.types";

interface CtaStripProps {
  hospitalInfo: HospitalInfo;
}

export function CtaStrip({ hospitalInfo }: CtaStripProps): React.JSX.Element {
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-primary-900 py-10 text-white">
      <Container ref={containerRef} className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="reveal-item flex items-center gap-3">
          <MapPin className="h-6 w-6 shrink-0 text-accent-400" aria-hidden="true" />
          <p>{hospitalInfo.address}</p>
        </div>
        <a
          href={formatTelHref(hospitalInfo.emergencyHotline)}
          className="reveal-item flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:bg-red-500"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          Emergency: {hospitalInfo.emergencyHotline}
        </a>
      </Container>
    </section>
  );
}
