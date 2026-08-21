import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { LoadingState } from "../common/LoadingState";
import { ErrorState } from "../common/ErrorState";
import { WaveDivider } from "../common/WaveDivider";
import { DotPattern } from "../common/DotPattern";
import { AccordionGallery } from "../common/AccordionGallery";
import type { AccordionGalleryItem } from "../common/AccordionGallery";
import { useServices } from "../../hooks/useServices";
import { useLanguage } from "../../i18n/LanguageContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const FEATURED_SERVICE_COUNT = 6;
const DESCRIPTION_PREVIEW_LENGTH = 90;
const FALLBACK_IMAGE_URL = "https://placehold.co/900x1200?text=Service";

function toPreview(description: string): string {
  if (description.length <= DESCRIPTION_PREVIEW_LENGTH) return description;
  return `${description.slice(0, DESCRIPTION_PREVIEW_LENGTH).trimEnd()}…`;
}

export function ServiceHighlights(): React.JSX.Element {
  const { services, isLoading, error } = useServices();
  const featuredServices = (services ?? []).slice(0, FEATURED_SERVICE_COUNT);
  const containerRef = useScrollReveal<HTMLDivElement>(".reveal-item", [isLoading, error]);
  const { t } = useLanguage();

  const galleryItems: AccordionGalleryItem[] = featuredServices.map((service) => ({
    image: service.imageUrl || FALLBACK_IMAGE_URL,
    label: service.name,
    description: toPreview(service.description),
    alt: service.name,
  }));

  return (
    <section className="relative overflow-hidden bg-surface-tint py-16 sm:py-24">
      <DotPattern className="right-6 top-10 hidden lg:block" />
      <Container>
        <div ref={containerRef}>
          <SectionHeading
            eyebrow={t("serviceHighlights.eyebrow")}
            title={t("serviceHighlights.title")}
            description={t("serviceHighlights.description")}
          />

          <div className="reveal-item mt-10">
            {isLoading && <LoadingState label={t("serviceHighlights.loading")} />}
            {error && !isLoading && <ErrorState message={error} />}
            {!isLoading && !error && (
              <AccordionGallery
                items={galleryItems}
                defaultIndex={0}
                trigger="hover"
                accentColor="#4a99a2"
                overlayColor="#0b1a1c"
                textColor="#ffffff"
                grayscale
                showLabels
                duration={0.6}
                ease="power3.out"
                parallax={0.4}
                tilt={6}
                stagger={0.06}
                height={420}
                gap={10}
                radius={24}
                orientation="horizontal"
              />
            )}
          </div>

          <div className="reveal-item mt-10 text-center">
            <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-6 py-3 text-sm font-bold text-primary-800 shadow-sm transition hover:border-primary-400">
              {t("serviceHighlights.viewAll")} <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
      <WaveDivider fillClassName="fill-white" />
    </section>
  );
}
