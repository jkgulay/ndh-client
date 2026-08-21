import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { useLanguage } from "../../i18n/LanguageContext";

const LEADERSHIP = [
  { name: "Dr. Eduardo Bautista", title: "Chief of Hospital" },
  { name: "Dr. Ma. Corazon Lim", title: "Medical Director" },
  { name: "Ms. Patricia Aquino", title: "Chief Nursing Officer" },
  { name: "Mr. Rafael Domingo", title: "Chief Administrative Officer" },
];

export function AdministrationSection(): React.JSX.Element {
  const { t } = useLanguage();

  return (
    <section className="bg-surface-muted py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow={t("aboutPage.administrationEyebrow")} title={t("aboutPage.administrationTitle")} />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LEADERSHIP.map((leader) => (
            <div key={leader.name} className="rounded-xl bg-white p-6 text-center shadow-sm">
              <p className="font-semibold text-primary-900">{leader.name}</p>
              <p className="mt-1 text-sm text-slate-500">{leader.title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
