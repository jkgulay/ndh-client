interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps): React.JSX.Element {
  return (
    <div className="reveal-item mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-3 flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-accent-600">
          <span className="h-2 w-2 rounded-full bg-accent-500" /> {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-extrabold text-primary-950 sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-slate-600">{description}</p>}
    </div>
  );
}
