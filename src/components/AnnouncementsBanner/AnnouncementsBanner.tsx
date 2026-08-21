import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { LoadingState } from "../common/LoadingState";
import { ErrorState } from "../common/ErrorState";
import { AnnouncementCard } from "../AnnouncementCard/AnnouncementCard";
import { useAnnouncements } from "../../hooks/useAnnouncements";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const LATEST_ANNOUNCEMENT_COUNT = 3;

export function AnnouncementsBanner(): React.JSX.Element {
  const { announcements, isLoading, error } = useAnnouncements();
  const latestAnnouncements = (announcements ?? []).slice(0, LATEST_ANNOUNCEMENT_COUNT);
  const containerRef = useScrollReveal<HTMLDivElement>(".reveal-item", [isLoading, error]);

  return (
    <section className="bg-surface-muted py-16 sm:py-20">
      <Container>
        <div ref={containerRef}>
          <SectionHeading eyebrow="Stay Informed" title="Latest Announcements" />

          <div className="mt-10">
            {isLoading && <LoadingState label="Loading announcements…" />}
            {error && !isLoading && <ErrorState message={error} />}
            {!isLoading && !error && latestAnnouncements.length === 0 && (
              <p className="reveal-item text-center text-slate-500">There are no announcements at this time.</p>
            )}
            {!isLoading && !error && latestAnnouncements.length > 0 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {latestAnnouncements.map((announcement) => (
                  <div key={announcement._id} className="reveal-item">
                    <AnnouncementCard announcement={announcement} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="reveal-item mt-10 text-center">
            <Link to="/announcements" className="inline-flex items-center gap-2 rounded-lg border border-primary-200 bg-white px-5 py-3 text-sm font-extrabold text-primary-800 shadow-sm transition hover:border-primary-400">
              View all announcements <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
