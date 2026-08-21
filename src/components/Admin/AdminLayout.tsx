import { LogOut } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";

const ADMIN_NAV_LINKS = [
  { path: "/admin", label: "Dashboard" },
  { path: "/admin/announcements", label: "Announcements" },
  { path: "/admin/doctors", label: "Doctors" },
  { path: "/admin/services", label: "Services" },
  { path: "/admin/careers", label: "Careers" },
  { path: "/admin/feedback", label: "Feedback" },
  { path: "/admin/settings", label: "Hospital Info" },
  { path: "/admin/account", label: "Account" },
] as const;

export function AdminLayout(): React.JSX.Element {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  function handleLogout(): void {
    logout();
    navigate("/admin/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <span className="text-lg font-bold text-primary-800">Admin Panel</span>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Log out
          </button>
        </div>
        <nav
          aria-label="Admin"
          className="mx-auto flex w-full max-w-6xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6"
        >
          {ADMIN_NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/admin"}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive ? "bg-primary-700 text-white" : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}
