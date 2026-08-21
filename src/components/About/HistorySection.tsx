import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";

interface HistorySectionProps {
  foundedYear: number;
}

interface Milestone {
  year: number;
  event: string;
}

function buildMilestones(foundedYear: number): Milestone[] {
  return [
    { year: foundedYear, event: "Nasipit District Hospital opens with 30 beds and a single OPD clinic." },
    { year: foundedYear + 12, event: "Expansion adds a dedicated Emergency Department and surgical ward." },
    { year: foundedYear + 28, event: "New Radiology & Imaging wing and clinical laboratory open to the public." },
    { year: foundedYear + 40, event: "Hospital becomes PhilHealth-accredited and reaches 150-bed capacity." },
  ];
}

export function HistorySection({ foundedYear }: HistorySectionProps): React.JSX.Element {
  const milestones = buildMilestones(foundedYear);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Our Story" title="History" />
        <p className="mx-auto mt-6 max-w-2xl text-center text-slate-600">
          Founded in {foundedYear} by a small group of local physicians, Nasipit District
          Hospital began as a modest clinic serving a handful of barangays. Over the decades, it
          has grown into a full-service district hospital, guided by the same commitment to
          accessible care that inspired its founding.
        </p>

        <ol className="mx-auto mt-10 max-w-2xl space-y-6 border-l-2 border-primary-100 pl-6">
          {milestones.map((milestone) => (
            <li key={milestone.year} className="relative">
              <span className="absolute -left-[1.95rem] top-1 h-3 w-3 rounded-full bg-primary-600" aria-hidden="true" />
              <p className="text-sm font-semibold text-primary-700">{milestone.year}</p>
              <p className="text-slate-600">{milestone.event}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
