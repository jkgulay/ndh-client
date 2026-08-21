import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Container } from "../components/common/Container";
import { ErrorState } from "../components/common/ErrorState";
import { LoadingState } from "../components/common/LoadingState";
import { useAnnouncementDetail } from "../hooks/useAnnouncementDetail";
import { useLanguage } from "../i18n/LanguageContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { formatDate } from "../utils/formatDate";

export function AnnouncementDetailPage(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { announcement, isLoading, error } = useAnnouncementDetail(id ?? "");
  const { t } = useLanguage();
  usePageMeta(
    announcement?.title ?? "Announcement",
    announcement?.content.slice(0, 150) ?? "Read the full announcement from our hospital."
  );

  return (
    <Container className="py-16 sm:py-20">
      <Link to="/announcements" className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t("announcementDetailPage.backLink")}
      </Link>

      {isLoading && <LoadingState label={t("announcementDetailPage.loading")} />}
      {error && !isLoading && <ErrorState message={error} />}
      {!isLoading && !error && announcement && (
        <article className="mx-auto max-w-2xl">
          <p className="text-sm text-slate-500">{formatDate(announcement.publishedAt)}</p>
          <h1 className="mt-2 text-3xl font-bold text-primary-900 sm:text-4xl">{announcement.title}</h1>
          <p className="mt-6 whitespace-pre-line text-slate-700">{announcement.content}</p>
        </article>
      )}
    </Container>
  );
}
