import { ArrowUpRight, Menu, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LanguageToggle } from "../LanguageToggle/LanguageToggle";
import { useHospitalInfo } from "../../hooks/useHospitalInfo";
import { useLanguage } from "../../i18n/LanguageContext";
import { formatTelHref } from "../../utils/formatTelHref";
import { MobileDrawer } from "./MobileDrawer";
import { NAV_LINKS } from "./navLinks";

const SCROLL_THRESHOLD_PX = 8;
const FALLBACK_HOSPITAL_NAME = "Nasipit District Hospital";
const FALLBACK_EMERGENCY_HOTLINE = "0917-123-4567";

export function Navbar(): React.JSX.Element {
  const { hospitalInfo } = useHospitalInfo();
  const { t } = useLanguage();
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
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:px-8 lg:gap-8 lg:px-12">
        <NavLink to="/" className="flex shrink-0 items-center gap-2 text-primary-900">
          <img src="/components/naslogo.png" alt="Nasipit District Hospital logo" className="h-11 w-11 object-contain" />
          <span className="font-serif text-sm font-medium tracking-tight sm:text-base lg:text-lg">{hospitalName}</span>
        </NavLink>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                  `whitespace-nowrap text-xs font-bold uppercase tracking-wide transition-colors ${
                  isActive ? "text-primary-700" : "text-slate-500 hover:text-primary-700"
                }`
              }
            >
              {t(link.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageToggle className="hidden sm:flex" />

          <a
            href={formatTelHref(emergencyHotline)}
            aria-label={`Call emergency hotline ${emergencyHotline}`}
            className="hidden items-center gap-1.5 rounded-full bg-red-600 px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-sm transition hover:bg-red-700 lg:flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {t("nav.emergencyCare")}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
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
