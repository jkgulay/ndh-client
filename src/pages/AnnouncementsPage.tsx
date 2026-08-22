import { Container } from "../components/common/Container";
import { ErrorState } from "../components/common/ErrorState";
import { LoadingState } from "../components/common/LoadingState";
import { PageHero } from "../components/common/PageHero";
import { AnnouncementCard } from "../components/AnnouncementCard/AnnouncementCard";
import { FeaturedAnnouncementCard } from "../components/AnnouncementCard/FeaturedAnnouncementCard";
import { AnnouncementListItem } from "../components/AnnouncementCard/AnnouncementListItem";
import { useAnnouncements } from "../hooks/useAnnouncements";
import { useLanguage } from "../i18n/LanguageContext";
import { usePageMeta } from "../hooks/usePageMeta";

const SIDEBAR_COUNT = 4;

export function AnnouncementsPage(): React.JSX.Element {
  const { announcements, isLoading, error } = useAnnouncements();
  const { t } = useLanguage();
  usePageMeta("Announcements", "Read the latest news and announcements from our hospital.");

  const sorted = [...(announcements ?? [])].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const [featured, ...rest] = sorted;
  const sidebarAnnouncements = rest.slice(0, SIDEBAR_COUNT);
  const remainingAnnouncements = rest.slice(SIDEBAR_COUNT);

  return (
    <>
      <PageHero title={t("pageHeroAnnouncements.title")} description={t("pageHeroAnnouncements.description")} />
      <Container className="py-16 sm:py-20">
        {isLoading && <LoadingState label={t("announcementsBanner.loading")} />}
        {error && !isLoading && <ErrorState message={error} />}
        {!isLoading && !error && sorted.length === 0 && (
          <p className="text-center text-slate-500">{t("announcementsBanner.empty")}</p>
        )}

        {!isLoading && !error && featured && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
            <FeaturedAnnouncementCard announcement={featured} />

            {sidebarAnnouncements.length > 0 && (
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="font-serif text-lg font-medium text-primary-950">{t("announcementsPage.latestHeading")}</h2>
                <div className="mt-2">
                  {sidebarAnnouncements.map((announcement) => (
                    <AnnouncementListItem key={announcement._id} announcement={announcement} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!isLoading && !error && remainingAnnouncements.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-medium text-primary-950">{t("announcementsPage.moreHeading")}</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {remainingAnnouncements.map((announcement) => (
                <AnnouncementCard key={announcement._id} announcement={announcement} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
