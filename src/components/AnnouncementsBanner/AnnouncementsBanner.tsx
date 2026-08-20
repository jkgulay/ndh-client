import { Link } from "react-router-dom";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { LoadingState } from "../common/LoadingState";
import { ErrorState } from "../common/ErrorState";
import { AnnouncementCard } from "../AnnouncementCard/AnnouncementCard";
import { useAnnouncements } from "../../hooks/useAnnouncements";

const LATEST_ANNOUNCEMENT_COUNT = 3;

export function AnnouncementsBanner(): React.JSX.Element {
  const { announcements, isLoading, error } = useAnnouncements();
  const latestAnnouncements = (announcements ?? []).slice(0, LATEST_ANNOUNCEMENT_COUNT);

  return (
    <section className="bg-surface-muted py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Stay Informed" title="Latest Announcements" />

        <div className="mt-10">
          {isLoading && <LoadingState label="Loading announcements…" />}
          {error && !isLoading && <ErrorState message={error} />}
          {!isLoading && !error && latestAnnouncements.length === 0 && (
            <p className="text-center text-slate-500">There are no announcements at this time.</p>
          )}
          {!isLoading && !error && latestAnnouncements.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestAnnouncements.map((announcement) => (
                <AnnouncementCard key={announcement._id} announcement={announcement} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <Link to="/announcements" className="font-semibold text-primary-700 hover:text-primary-800">
            View all announcements →
          </Link>
        </div>
      </Container>
    </section>
  );
}
