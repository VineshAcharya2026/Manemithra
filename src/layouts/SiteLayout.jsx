import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFAB from "../components/WhatsAppFAB";
import ScrollToTop from "../components/ScrollToTop";

export default function SiteLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className={isHome ? "" : "pt-16 md:pt-24"}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
