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
    <section className="bg-surface-muted py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="About Us"
          title={`Trusted care in ${hospitalInfo.name}`}
          description={`${hospitalInfo.name} has served our community since ${hospitalInfo.foundedYear}, providing accessible, quality healthcare to patients of every age and background.`}
        />
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm">
              <Icon className="h-8 w-8 text-primary-700" aria-hidden="true" />
              <p className="mt-3 text-3xl font-bold text-primary-900">{value}</p>
              <p className="text-sm text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
