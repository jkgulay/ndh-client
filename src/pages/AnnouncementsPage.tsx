import { Container } from "../components/common/Container";
import { ErrorState } from "../components/common/ErrorState";
import { LoadingState } from "../components/common/LoadingState";
import { PageHero } from "../components/common/PageHero";
import { AnnouncementCard } from "../components/AnnouncementCard/AnnouncementCard";
import { useAnnouncements } from "../hooks/useAnnouncements";
import { usePageMeta } from "../hooks/usePageMeta";

export function AnnouncementsPage(): React.JSX.Element {
  const { announcements, isLoading, error } = useAnnouncements();
  usePageMeta("Announcements", "Read the latest news and announcements from our hospital.");

  return (
    <>
      <PageHero title="Announcements" description="Stay up to date with hospital news, advisories, and events." />
      <Container className="py-16 sm:py-20">
        {isLoading && <LoadingState label="Loading announcements…" />}
        {error && !isLoading && <ErrorState message={error} />}
        {!isLoading && !error && (announcements ?? []).length === 0 && (
          <p className="text-center text-slate-500">There are no announcements at this time.</p>
        )}
        {!isLoading && !error && (announcements ?? []).length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(announcements ?? []).map((announcement) => (
              <AnnouncementCard key={announcement._id} announcement={announcement} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
