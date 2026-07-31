import Hero from "../components/Hero";
import MediaStrip from "../components/MediaStrip";
import ServicesSection from "../components/home/ServicesSection";
import About from "../components/About";
import WhyChooseUs from "../components/home/WhyChooseUs";
import TrustCommitments from "../components/home/TrustCommitments";
import HowItWorks from "../components/HowItWorks";
import Projects from "../components/Projects";
import Packages from "../components/Packages";
import ServiceAreas from "../components/home/ServiceAreas";
import GreenHomes from "../components/GreenHomes";
import BrandValues from "../components/home/BrandValues";
import Testimonials from "../components/Testimonials";
import Brands from "../components/Brands";
import BusinessCTA from "../components/home/BusinessCTA";
import FAQ from "../components/FAQ";
import CTABanner from "../components/CTABanner";

/**
 * Homepage — full business funnel: services, trust, proof, and conversion.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <MediaStrip />
      <ServicesSection />
      <About preview />
      <WhyChooseUs />
      <TrustCommitments />
      <HowItWorks preview />
      <Projects preview />
      <Packages preview />
      <ServiceAreas />
      <GreenHomes preview />
      <BrandValues />
      <Testimonials preview />
      <Brands />
      <BusinessCTA />
      <FAQ preview />
      <CTABanner />
    </>
  );
}
