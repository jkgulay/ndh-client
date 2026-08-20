import { Handshake, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";

const CORE_VALUES = [
  {
    icon: HeartPulse,
    title: "Compassion",
    description: "We treat every patient with empathy, respect, and dignity.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "We hold ourselves to the highest ethical and clinical standards.",
  },
  {
    icon: Sparkles,
    title: "Excellence",
    description: "We pursue continuous improvement in every service we provide.",
  },
  {
    icon: Handshake,
    title: "Community",
    description: "We partner with local leaders and families to improve public health.",
  },
];

export function CoreValuesSection(): React.JSX.Element {
  return (
    <section className="bg-surface-muted py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="What Guides Us" title="Our Core Values" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_VALUES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-xl bg-white p-6 text-center shadow-sm">
              <Icon className="mx-auto h-8 w-8 text-accent-600" aria-hidden="true" />
              <h3 className="mt-3 font-semibold text-primary-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
