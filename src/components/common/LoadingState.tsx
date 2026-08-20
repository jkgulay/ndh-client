interface LoadingStateProps {
  label: string;
}

export function LoadingState({ label }: LoadingStateProps): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-500">
      <div className="h-1.5 w-32 overflow-hidden rounded-full bg-primary-100" aria-hidden="true">
        <div className="h-full w-1/2 animate-pulse rounded-full bg-primary-600" />
      </div>
      <p role="status">{label}</p>
    </div>
  );
}
