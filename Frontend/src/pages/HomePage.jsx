import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Services from "../components/Services";
import NavPillsSection from "../components/NavPillsSection";
import FaqSection from "../components/FaqSection";
import ExampleCVSection from "../components/ExampleCVSection";
import TeamSection from "../components/TeamSection";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <Features />
      <NavPillsSection />
      <FaqSection />
      <ExampleCVSection />
      <TeamSection />
      <Footer />
    </>
  );
}
