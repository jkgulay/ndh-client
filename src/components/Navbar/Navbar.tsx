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
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="text-lg font-bold text-primary-800 sm:text-xl">
          {hospitalName}
        </NavLink>

        <nav className="hidden items-center gap-6 sm:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-primary-800" : "text-slate-600 hover:text-primary-700"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 sm:flex">
          <a
            href={formatTelHref(emergencyHotline)}
            className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-100"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {emergencyHotline}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Open menu"
          className="rounded-md p-2 text-slate-700 hover:bg-slate-100 sm:hidden"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        emergencyHotline={emergencyHotline}
      />
    </header>
  );
}
