import { Compass, Target } from "lucide-react";
import { Container } from "../common/Container";
import { useLanguage } from "../../i18n/LanguageContext";

export function MissionVisionSection(): React.JSX.Element {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20">
      <Container className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <Target className="h-8 w-8 text-primary-700" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-bold text-primary-900">{t("aboutPage.missionTitle")}</h2>
          <p className="mt-3 text-slate-600">
            To provide accessible, compassionate, and high-quality healthcare to every resident of
            our district, regardless of their ability to pay, while continuously improving the
            skills of our staff and the reach of our services.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <Compass className="h-8 w-8 text-primary-700" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-bold text-primary-900">{t("aboutPage.visionTitle")}</h2>
          <p className="mt-3 text-slate-600">
            To be the most trusted district hospital in the region, recognized for clinical
            excellence, community partnership, and a patient experience defined by dignity and
            care.
          </p>
        </div>
      </Container>
    </section>
  );
}
