interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps): React.JSX.Element {
  return (
    <div className="reveal-item mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-accent-600">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-500" /> {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-3xl font-medium leading-tight text-primary-950 sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-slate-500">{description}</p>}
    </div>
  );
}
