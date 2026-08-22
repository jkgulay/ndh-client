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
      className="group relative flex h-full min-h-[22rem] w-full overflow-hidden rounded-3xl bg-primary-900 shadow-sm transition hover:shadow-lg"
    >
      {announcement.imageUrl ? (
        <img
          src={announcement.imageUrl}
          alt={announcement.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/20 to-transparent" aria-hidden="true" />

      <div className="relative mt-auto flex flex-col gap-3 p-6 sm:p-8">
        <span className="inline-flex w-fit items-center rounded-full bg-primary-950/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm">
          {t("announcementsPage.featuredBadge")}
        </span>
        <h2 className="font-serif text-2xl font-medium leading-snug text-white sm:text-3xl">{announcement.title}</h2>
        <p className="text-sm font-medium text-white/70">{formatDateTime(announcement.publishedAt)}</p>
      </div>
    </Link>
  );
}
