import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustLogos from "./components/TrustLogos";
import AIAuditor from "./components/AIAuditor";
import Stats from "./components/Stats";
import Services from "./components/Services";
import GbpImportance from "./components/GbpImportance";
import HowItWorks from "./components/HowItWorks";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div id="main-app" className="min-h-screen bg-brand-bg text-brand-text font-sans antialiased selection:bg-blue-500 selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main>
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Trusted By */}
        <TrustLogos />

        {/* Dynamic Section: AI Visibility Auditor */}
        <AIAuditor />

        {/* Section 3: Statistics */}
        <Stats />

        {/* Section 4: Services */}
        <Services />

        {/* Section 5: Image + Content (Why GBP Matters) */}
        <GbpImportance />

        {/* Section 6: How It Works */}
        <HowItWorks />

        {/* Section 7: Portfolio (Before vs After) */}
        <Portfolio />

        {/* Section 8: Testimonials */}
        <Testimonials />

        {/* Section 9: FAQ */}
        <FAQ />

        {/* Section 10: Call To Action (Large Blue Gradient + WhatsApp CTA) */}
        <CTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
