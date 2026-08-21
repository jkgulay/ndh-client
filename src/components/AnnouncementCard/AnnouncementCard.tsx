import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
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
  const { t } = useLanguage();

  return (
    <Link
      to={`/announcements/${announcement._id}`}
      className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      {announcement.imageUrl ? (
        <img
          src={announcement.imageUrl}
          alt={announcement.title}
          className="h-40 w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="h-3 w-full bg-accent-200" aria-hidden="true" />
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{formatDate(announcement.publishedAt)}</p>
        <h3 className="mt-2 font-serif text-lg font-medium text-primary-900">{announcement.title}</h3>
        <p className="mt-2 flex-1 text-sm text-slate-500">{toPreview(announcement.content)}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary-700">
          {t("common.readMore")}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
