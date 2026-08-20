import { Container } from "../components/common/Container";
import { ErrorState } from "../components/common/ErrorState";
import { LoadingState } from "../components/common/LoadingState";
import { PageHero } from "../components/common/PageHero";
import { ContactDetails } from "../components/ContactSection/ContactDetails";
import { ContactForm } from "../components/ContactSection/ContactForm";
import { LocationMap } from "../components/ContactSection/LocationMap";
import { useHospitalInfo } from "../hooks/useHospitalInfo";
import { usePageMeta } from "../hooks/usePageMeta";

export function ContactPage(): React.JSX.Element {
  const { hospitalInfo, isLoading, error } = useHospitalInfo();
  usePageMeta("Contact", "Get in touch with our hospital by phone, email, or the contact form.");

  return (
    <>
      <PageHero title="Contact Us" description="We're here to help. Reach out with any questions or concerns." />
      <Container className="py-16 sm:py-20">
        {isLoading && <LoadingState label="Loading contact information…" />}
        {error && !isLoading && <ErrorState message={error} />}
        {!isLoading && !error && hospitalInfo && (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold text-primary-900">Send Us a Message</h2>
              <ContactForm />
            </div>
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="mb-6 text-2xl font-bold text-primary-900">Contact Details</h2>
                <ContactDetails hospitalInfo={hospitalInfo} />
              </div>
              <LocationMap hospitalName={hospitalInfo.name} googleMapsEmbedUrl={hospitalInfo.googleMapsEmbedUrl} />
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
