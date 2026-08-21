import { Link } from "react-router-dom";
import { Bell, Briefcase, SlidersHorizontal, Star, Stethoscope, UserRound } from "lucide-react";

const DASHBOARD_SECTIONS = [
  {
    path: "/admin/announcements",
    label: "Announcements",
    description: "Publish or retire hospital-wide notices.",
    icon: Bell,
  },
  {
    path: "/admin/doctors",
    label: "Doctors",
    description: "Manage the doctor directory and schedules.",
    icon: UserRound,
  },
  {
    path: "/admin/services",
    label: "Services",
    description: "Add, edit, or retire hospital services.",
    icon: Stethoscope,
  },
  {
    path: "/admin/careers",
    label: "Careers",
    description: "Open and close job postings.",
    icon: Briefcase,
  },
  {
    path: "/admin/feedback",
    label: "Feedback",
    description: "Review patient ratings and comments.",
    icon: Star,
  },
  {
    path: "/admin/settings",
    label: "Hospital Info",
    description: "Update address, contact details, and stats.",
    icon: SlidersHorizontal,
  },
] as const;

export function AdminDashboardPage(): React.JSX.Element {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-primary-900">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DASHBOARD_SECTIONS.map(({ path, label, description, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
          >
            <Icon className="h-6 w-6 text-primary-700" aria-hidden="true" />
            <div>
              <h2 className="font-semibold text-slate-800">{label}</h2>
              <p className="mt-1 text-sm text-slate-500">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
