import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import { formatDateTime } from "../../utils/formatDate";
import type { Announcement } from "../../types/announcement.types";

interface FeaturedAnnouncementCardProps {
  announcement: Announcement;
}

export function FeaturedAnnouncementCard({ announcement }: FeaturedAnnouncementCardProps): React.JSX.Element {
  const { t } = useLanguage();

  return (
    <Link
      to={`/announcements/${announcement._id}`}
      className="group relative flex h-full min-h-[22rem] w-full overflow-hidden rounded-3xl bg-primary-900 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
    >
      {announcement.imageUrl ? (
        <img
          src={announcement.imageUrl}
          alt={announcement.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
      ) : null}
      <div
        className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/20 to-transparent transition-opacity duration-500 group-hover:from-primary-950/95"
        aria-hidden="true"
      />

      <div className="relative mt-auto flex flex-col gap-3 p-6 transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:p-8">
        <span className="inline-flex w-fit items-center rounded-full bg-primary-950/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-accent-600">
          {t("announcementsPage.featuredBadge")}
        </span>
        <h2 className="font-serif text-2xl font-medium leading-snug text-white sm:text-3xl">{announcement.title}</h2>
        <div className="flex items-center gap-2 text-sm font-medium text-white/70">
          <span>{formatDateTime(announcement.publishedAt)}</span>
          <ArrowRight
            className="h-4 w-4 -translate-x-1 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
