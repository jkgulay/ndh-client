import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDateTime } from "../../utils/formatDate";
import type { Announcement } from "../../types/announcement.types";

interface AnnouncementListItemProps {
  announcement: Announcement;
}

export function AnnouncementListItem({ announcement }: AnnouncementListItemProps): React.JSX.Element {
  return (
    <Link
      to={`/announcements/${announcement._id}`}
      className="group -mx-3 flex items-start gap-4 rounded-2xl border-b border-slate-100 px-3 py-4 transition-colors duration-300 first:pt-3 last:border-b-0 last:pb-3 hover:bg-surface-tint"
    >
      <div className="h-16 w-16 flex-none overflow-hidden rounded-xl bg-accent-100">
        {announcement.imageUrl ? (
          <img
            src={announcement.imageUrl}
            alt={announcement.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            loading="lazy"
          />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 font-serif text-sm font-medium leading-snug text-primary-900 transition-colors duration-300 group-hover:text-primary-700 sm:text-base">
          {announcement.title}
        </h3>
        <p className="mt-1.5 text-xs font-medium text-slate-400">{formatDateTime(announcement.publishedAt)}</p>
      </div>
      <ArrowUpRight
        className="mt-1 h-4 w-4 flex-none -translate-x-1 translate-y-1 text-primary-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
        aria-hidden="true"
      />
    </Link>
  );
}
