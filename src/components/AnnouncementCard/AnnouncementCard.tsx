import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import type { Announcement } from "../../types/announcement.types";

interface AnnouncementCardProps {
  announcement: Announcement;
}

const PREVIEW_LENGTH = 140;

function toPreview(content: string): string {
  if (content.length <= PREVIEW_LENGTH) return content;
  return `${content.slice(0, PREVIEW_LENGTH).trimEnd()}…`;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps): React.JSX.Element {
  return (
    <Link
      to={`/announcements/${announcement._id}`}
      className="flex h-full flex-col rounded-2xl border border-primary-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <p className="text-sm text-slate-500">{formatDate(announcement.publishedAt)}</p>
      <h3 className="mt-2 text-lg font-semibold text-primary-900">{announcement.title}</h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">{toPreview(announcement.content)}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-700">
        Read more
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </Link>
  );
}
