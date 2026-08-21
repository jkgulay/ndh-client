import type { TranslationKey } from "../../i18n/LanguageContext";

export interface NavLinkItem {
  labelKey: TranslationKey;
  path: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { labelKey: "nav.home", path: "/" },
  { labelKey: "nav.about", path: "/about" },
  { labelKey: "nav.services", path: "/services" },
  { labelKey: "nav.ourTeam", path: "/staff" },
  { labelKey: "nav.careers", path: "/careers" },
  { labelKey: "nav.announcements", path: "/announcements" },
  { labelKey: "nav.contact", path: "/contact" },
];
