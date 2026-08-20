import { Menu, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useHospitalInfo } from "../../hooks/useHospitalInfo";
import { formatTelHref } from "../../utils/formatTelHref";
import { MobileDrawer } from "./MobileDrawer";
import { NAV_LINKS } from "./navLinks";

const SCROLL_THRESHOLD_PX = 8;
const FALLBACK_HOSPITAL_NAME = "Northgate District Hospital";
const FALLBACK_EMERGENCY_HOTLINE = "0917-123-4567";

export function Navbar(): React.JSX.Element {
  const { hospitalInfo } = useHospitalInfo();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const hospitalName = hospitalInfo?.name ?? FALLBACK_HOSPITAL_NAME;
  const emergencyHotline = hospitalInfo?.emergencyHotline ?? FALLBACK_EMERGENCY_HOTLINE;

  useEffect(() => {
    function handleScroll(): void {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-shadow ${
        isScrolled ? "shadow-md" : "border-b border-slate-100"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:gap-4 lg:px-8">
        <NavLink to="/" className="shrink-0 text-base font-bold text-primary-800 sm:text-lg lg:text-xl">
          {hospitalName}
        </NavLink>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-6" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `whitespace-nowrap text-sm font-medium transition-colors ${
                  isActive ? "text-primary-800" : "text-slate-600 hover:text-primary-700"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={formatTelHref(emergencyHotline)}
            aria-label={`Call emergency hotline ${emergencyHotline}`}
            className="hidden items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-100 lg:flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {emergencyHotline}
          </a>

          <a
            href={formatTelHref(emergencyHotline)}
            aria-label={`Call emergency hotline ${emergencyHotline}`}
            className="flex items-center justify-center rounded-full bg-red-50 p-2 text-red-600 hover:bg-red-100 lg:hidden"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open menu"
            className="rounded-md p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        emergencyHotline={emergencyHotline}
      />
    </header>
  );
}
