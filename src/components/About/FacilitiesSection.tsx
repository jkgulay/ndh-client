import { Ambulance, Bed, FlaskConical, Pill, ScanLine, Stethoscope, Syringe, Users } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { useLanguage } from "../../i18n/LanguageContext";

const FACILITIES = [
  { icon: Ambulance, name: "Emergency & Trauma Ward" },
  { icon: Bed, name: "General Wards" },
  { icon: Users, name: "Intensive Care Unit (ICU)" },
  { icon: Syringe, name: "Operating Rooms" },
  { icon: FlaskConical, name: "Clinical Laboratory" },
  { icon: ScanLine, name: "Radiology & Imaging Suite" },
  { icon: Pill, name: "In-house Pharmacy" },
  { icon: Stethoscope, name: "Outpatient Clinics" },
];

export function FacilitiesSection(): React.JSX.Element {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow={t("aboutPage.facilitiesEyebrow")} title={t("aboutPage.facilitiesTitle")} />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FACILITIES.map(({ icon: Icon, name }) => (
            <div key={name} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <Icon className="h-6 w-6 shrink-0 text-primary-700" aria-hidden="true" />
              <p className="text-slate-700">{name}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
