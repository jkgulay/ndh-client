export interface NavLinkItem {
  label: string;
  path: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Our Team", path: "/staff" },
  { label: "Careers", path: "/careers" },
  { label: "Announcements", path: "/announcements" },
  { label: "Contact", path: "/contact" },
];
