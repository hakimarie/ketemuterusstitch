import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustLogos from "./components/TrustLogos";
import AIAuditor from "./components/AIAuditor";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div id="main-app" className="min-h-screen min-w-0 overflow-x-clip bg-[#FAFAFA] text-gray-800 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <main>
        <Hero />
        <TrustLogos />
        <Services />
        <AIAuditor />
        <HowItWorks />
        <Portfolio />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}