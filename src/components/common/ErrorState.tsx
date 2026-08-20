import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps): React.JSX.Element {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-6 py-10 text-center text-red-700"
    >
      <AlertTriangle className="h-8 w-8" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}
