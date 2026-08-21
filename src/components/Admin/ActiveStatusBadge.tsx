interface ActiveStatusBadgeProps {
  isActive: boolean;
}

export function ActiveStatusBadge({ isActive }: ActiveStatusBadgeProps): React.JSX.Element {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        isActive ? "bg-accent-100 text-accent-700" : "bg-slate-100 text-slate-500"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}
