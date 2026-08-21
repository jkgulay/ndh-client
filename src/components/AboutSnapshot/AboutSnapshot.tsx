import { Building2, BedDouble, CalendarRange } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import type { HospitalInfo } from "../../types/hospitalInfo.types";

interface AboutSnapshotProps {
  hospitalInfo: HospitalInfo;
}

export function AboutSnapshot({ hospitalInfo }: AboutSnapshotProps): React.JSX.Element {
  const yearsOfService = new Date().getFullYear() - hospitalInfo.foundedYear;

  const stats = [
    { icon: BedDouble, label: "Beds", value: hospitalInfo.bedCount },
    { icon: CalendarRange, label: "Years of Service", value: yearsOfService },
    { icon: Building2, label: "Departments", value: hospitalInfo.departmentCount },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="About Us"
          title={`Trusted care in ${hospitalInfo.name}`}
          description={`${hospitalInfo.name} has served our community since ${hospitalInfo.foundedYear}, providing accessible, quality healthcare to patients of every age and background.`}
        />
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 rounded-2xl border border-primary-100 bg-[#f5faff] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-primary-700 shadow-sm"><Icon className="h-6 w-6" aria-hidden="true" /></span>
              <div><p className="text-2xl font-bold text-primary-900">{value}</p><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p></div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
