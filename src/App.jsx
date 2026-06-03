import { ConsultProvider } from "./context/ConsultContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MediaStrip from "./components/MediaStrip";
import About from "./components/About";
import HowItWorks from "./components/HowItWorks";
import Packages from "./components/Packages";
import GreenHomes from "./components/GreenHomes";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Brands from "./components/Brands";
import FAQ from "./components/FAQ";
import CTABanner from "./components/CTABanner";
import Footer from "./components/Footer";
import WhatsAppFAB from "./components/WhatsAppFAB";

export default function App() {
  return (
    <ConsultProvider>
      <Navbar />
      <main>
        <Hero />
        <MediaStrip />
        <About />
        <HowItWorks />
        <Packages />
        <GreenHomes />
        <Projects />
        <Testimonials />
        <Brands />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
      <WhatsAppFAB />
    </ConsultProvider>
  );
}
