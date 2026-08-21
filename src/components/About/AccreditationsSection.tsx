import { BadgeCheck } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { useLanguage } from "../../i18n/LanguageContext";

interface AccreditationsSectionProps {
  accreditations: string[];
}

export function AccreditationsSection({ accreditations }: AccreditationsSectionProps): React.JSX.Element {
  const { t } = useLanguage();

  return (
    <section className="bg-surface-muted py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow={t("aboutPage.accreditationsEyebrow")} title={t("aboutPage.accreditationsTitle")} />
        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4">
          {accreditations.map((accreditation) => (
            <div key={accreditation} className="flex items-center gap-3 rounded-xl bg-white p-5 shadow-sm">
              <BadgeCheck className="h-6 w-6 shrink-0 text-accent-600" aria-hidden="true" />
              <p className="text-slate-700">{accreditation}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
