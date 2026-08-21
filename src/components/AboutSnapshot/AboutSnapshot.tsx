import { Building2, BedDouble, CalendarRange, Clock3, HeartPulse, ShieldCheck, Stethoscope } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import type { HospitalInfo } from "../../types/hospitalInfo.types";

interface AboutSnapshotProps {
  hospitalInfo: HospitalInfo;
}

const FEATURES = [
  [Stethoscope, "Expert doctors", "Experienced professionals who listen first."],
  [HeartPulse, "Advanced care", "Modern facilities for confident treatment."],
  [Clock3, "24/7 services", "Emergency support whenever you need it."],
  [ShieldCheck, "Patient-first", "Thoughtful care for every family."],
] as const;

export function AboutSnapshot({ hospitalInfo }: AboutSnapshotProps): React.JSX.Element {
  const yearsOfService = new Date().getFullYear() - hospitalInfo.foundedYear;
  const containerRef = useScrollReveal<HTMLDivElement>();

  const stats = [
    { icon: BedDouble, label: "Beds", value: hospitalInfo.bedCount },
    { icon: CalendarRange, label: "Years of Service", value: yearsOfService },
    { icon: Building2, label: "Departments", value: hospitalInfo.departmentCount },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <div ref={containerRef}>
          <SectionHeading
            eyebrow="About Us"
            title={`Trusted care in ${hospitalInfo.name}`}
            description={`${hospitalInfo.name} has served our community since ${hospitalInfo.foundedYear}, providing accessible, quality healthcare to patients of every age and background.`}
          />
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="reveal-item flex items-center gap-4 rounded-2xl border border-primary-100 bg-[#f5faff] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-primary-700 shadow-sm"><Icon className="h-6 w-6" aria-hidden="true" /></span>
                <div><p className="text-2xl font-bold text-primary-900">{value}</p><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p></div>
              </div>
            ))}
          </div>

          <div className="reveal-item mt-8 grid grid-cols-2 divide-x divide-primary-100 overflow-hidden rounded-3xl border border-primary-100 bg-[#f5faff] sm:grid-cols-4">
            {FEATURES.map(([Icon, title, description]) => (
              <div key={title} className="flex items-start gap-3 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary-700 shadow-sm"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <div><p className="text-sm font-extrabold text-primary-950">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
