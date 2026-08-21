interface WaveDividerProps {
  fillClassName: string;
  flip?: boolean;
}

export function WaveDivider({ fillClassName, flip = false }: WaveDividerProps): React.JSX.Element {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 -mb-px overflow-hidden leading-none ${
        flip ? "-scale-x-100" : ""
      }`}
    >
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="h-10 w-full sm:h-14 lg:h-16">
        <path
          d="M0,30 C240,80 480,10 720,35 C960,60 1200,15 1440,45 L1440,100 L0,100 Z"
          className={fillClassName}
        />
      </svg>
    </div>
  );
}
