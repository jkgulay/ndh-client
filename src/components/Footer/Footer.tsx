import { Facebook, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "../Navbar/navLinks";
import { useHospitalInfo } from "../../hooks/useHospitalInfo";
import { useServices } from "../../hooks/useServices";
import { Container } from "../common/Container";

const FOOTER_SERVICE_COUNT = 5;
const FALLBACK_HOSPITAL_NAME = "Northgate District Hospital";
const FALLBACK_TAGLINE = "Caring for our community since 1978";

export function Footer(): React.JSX.Element {
  const { hospitalInfo } = useHospitalInfo();
  const { services } = useServices();
  const currentYear = new Date().getFullYear();

  const hospitalName = hospitalInfo?.name ?? FALLBACK_HOSPITAL_NAME;
  const tagline = hospitalInfo?.tagline ?? FALLBACK_TAGLINE;
  const featuredServices = (services ?? []).slice(0, FOOTER_SERVICE_COUNT);

  return (
    <footer className="bg-primary-900 text-primary-100">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-white">{hospitalName}</p>
          <p className="mt-2 text-sm text-primary-200">{tagline}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Services</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {featuredServices.map((service) => (
              <li key={service._id}>
                <Link to="/services" className="hover:text-white">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {hospitalInfo && (
              <>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{hospitalInfo.address}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{hospitalInfo.phone}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{hospitalInfo.email}</span>
                </li>
                <li>{hospitalInfo.hours}</li>
              </>
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-primary-800">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-sm sm:flex-row">
          <p>
            &copy; {currentYear} {hospitalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/admin/login" className="text-xs text-primary-300 hover:text-white">
              Staff Login
            </Link>
            {hospitalInfo?.facebookUrl && (
              <a
                href={hospitalInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${hospitalName} on Facebook`}
                className="rounded-full bg-primary-800 p-2 hover:bg-primary-700"
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </Container>
      </div>
    </footer>
  );
}
