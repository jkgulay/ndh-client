import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "./components/Admin/AdminLayout";
import { ProtectedRoute } from "./components/Admin/ProtectedRoute";
import { Layout } from "./components/Layout/Layout";
import { AboutPage } from "./pages/AboutPage";
import { AnnouncementDetailPage } from "./pages/AnnouncementDetailPage";
import { AnnouncementsPage } from "./pages/AnnouncementsPage";
import { CareersPage } from "./pages/CareersPage";
import { ContactPage } from "./pages/ContactPage";
import { DoctorsPage } from "./pages/DoctorsPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ServicesPage } from "./pages/ServicesPage";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminAccountPage } from "./pages/admin/account/AdminAccountPage";
import { AdminAnnouncementsPage } from "./pages/admin/announcements/AdminAnnouncementsPage";
import { AdminCareersPage } from "./pages/admin/careers/AdminCareersPage";
import { AdminDoctorsPage } from "./pages/admin/doctors/AdminDoctorsPage";
import { AdminServicesPage } from "./pages/admin/services/AdminServicesPage";
import { AdminSettingsPage } from "./pages/admin/settings/AdminSettingsPage";

export function App(): React.JSX.Element {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/announcements/:id" element={<AnnouncementDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/announcements" element={<AdminAnnouncementsPage />} />
          <Route path="/admin/doctors" element={<AdminDoctorsPage />} />
          <Route path="/admin/services" element={<AdminServicesPage />} />
          <Route path="/admin/careers" element={<AdminCareersPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
          <Route path="/admin/account" element={<AdminAccountPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
