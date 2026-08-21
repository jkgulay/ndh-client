import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { LanguageToggle } from "../LanguageToggle/LanguageToggle";
import { NAV_LINKS } from "./navLinks";
import { useLanguage } from "../../i18n/LanguageContext";
import { formatTelHref } from "../../utils/formatTelHref";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  emergencyHotline: string;
}

export function MobileDrawer({ isOpen, onClose, emergencyHotline }: MobileDrawerProps): React.JSX.Element | null {
  const { t } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden" role="dialog" aria-modal="true">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
        <span className="text-lg font-bold text-primary-800">{t("mobileMenu.menu")}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="rounded-md p-2 text-slate-600 hover:bg-slate-100"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-4 py-6">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            onClick={onClose}
            className={({ isActive }) =>
              `rounded-md px-3 py-3 text-lg font-medium ${
                isActive ? "bg-primary-50 text-primary-800" : "text-slate-700 hover:bg-slate-50"
              }`
            }
          >
            {t(link.labelKey)}
          </NavLink>
        ))}
      </nav>
      <div className="flex flex-col items-center gap-4 border-t border-slate-200 px-4 py-4">
        <LanguageToggle />
        <a href={formatTelHref(emergencyHotline)} className="block text-center font-semibold text-red-600">
          {t("mobileMenu.emergencyHotlinePrefix")} {emergencyHotline}
        </a>
      </div>
    </div>
  );
}
