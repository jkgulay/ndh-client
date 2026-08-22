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
      className="group flex items-start gap-4 border-b border-slate-100 py-4 first:pt-0 last:border-b-0 last:pb-0"
    >
      <div className="h-16 w-16 flex-none overflow-hidden rounded-xl bg-accent-100">
        {announcement.imageUrl ? (
          <img
            src={announcement.imageUrl}
            alt={announcement.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : null}
      </div>
      <div className="min-w-0">
        <h3 className="line-clamp-2 font-serif text-sm font-medium leading-snug text-primary-900 transition group-hover:text-primary-700 sm:text-base">
          {announcement.title}
        </h3>
        <p className="mt-1.5 text-xs font-medium text-slate-400">{formatDateTime(announcement.publishedAt)}</p>
      </div>
    </Link>
  );
}
