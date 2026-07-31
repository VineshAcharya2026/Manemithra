import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConsultProvider } from "./context/ConsultContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { SiteContentProvider } from "./context/SiteContentContext";
import AdminRoute from "./components/admin/AdminRoute";
import SiteLayout from "./layouts/SiteLayout";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import ProjectsPage from "./pages/ProjectsPage";
import PackagesPage from "./pages/PackagesPage";
import GreenHomesPage from "./pages/GreenHomesPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import { ROUTES } from "./lib/routes";

export default function App() {
  return (
    <SiteContentProvider>
      <ConsultProvider>
        <AdminAuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path={ROUTES.admin} element={<AdminLoginPage />} />
              <Route
                path={ROUTES.adminDashboard}
                element={
                  <AdminRoute>
                    <AdminDashboardPage />
                  </AdminRoute>
                }
              />
              <Route element={<SiteLayout />}>
                <Route path={ROUTES.home} element={<HomePage />} />
                <Route path={ROUTES.about} element={<AboutPage />} />
                <Route path={ROUTES.howItWorks} element={<HowItWorksPage />} />
                <Route path={ROUTES.projects} element={<ProjectsPage />} />
                <Route path={ROUTES.packages} element={<PackagesPage />} />
                <Route path={ROUTES.greenHomes} element={<GreenHomesPage />} />
                <Route path={ROUTES.testimonials} element={<TestimonialsPage />} />
                <Route path={ROUTES.faq} element={<FAQPage />} />
                <Route path={ROUTES.contact} element={<ContactPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AdminAuthProvider>
      </ConsultProvider>
    </SiteContentProvider>
  );
}
