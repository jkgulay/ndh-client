import { Briefcase, Calendar } from "lucide-react";
import { formatDate } from "../../utils/formatDate";
import type { Career } from "../../types/career.types";

interface JobCardProps {
  career: Career;
}

const EMPLOYMENT_TYPE_BADGE_CLASSES: Record<Career["type"], string> = {
  "Full-time": "bg-accent-50 text-accent-700",
  "Part-time": "bg-primary-50 text-primary-700",
  Contract: "bg-amber-50 text-amber-700",
};

export function JobCard({ career }: JobCardProps): React.JSX.Element {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${EMPLOYMENT_TYPE_BADGE_CLASSES[career.type]}`}>
          {career.type}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
          Posted {formatDate(career.postedAt)}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-primary-900">{career.title}</h3>
      <p className="flex items-center gap-1.5 text-sm text-slate-500">
        <Briefcase className="h-4 w-4 shrink-0" aria-hidden="true" />
        {career.department}
      </p>
      <p className="text-sm text-slate-600">{career.description}</p>

      {career.requirements && (
        <div>
          <p className="text-sm font-semibold text-primary-900">Requirements</p>
          <p className="text-sm text-slate-600">{career.requirements}</p>
        </div>
      )}

      <div>
        <p className="text-sm font-semibold text-primary-900">How to Apply</p>
        <p className="text-sm text-slate-600">{career.howToApply}</p>
      </div>
    </article>
  );
}
