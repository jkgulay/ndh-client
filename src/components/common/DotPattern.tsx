import { useId } from "react";

interface DotPatternProps {
  className?: string;
}

export function DotPattern({ className = "" }: DotPatternProps): React.JSX.Element {
  const patternId = useId();

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute text-primary-900/10 ${className}`}
      width="160"
      height="160"
      fill="none"
    >
      <defs>
        <pattern id={patternId} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" className="fill-current" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
