import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustLogos from "./components/TrustLogos";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

const AIAuditor = lazy(() => import("./components/AIAuditor"));

export default function App() {
  const auditPlaceholderRef = useRef<HTMLElement | null>(null);
  const [loadAuditor, setLoadAuditor] = useState(false);

  useEffect(() => {
    const placeholder = auditPlaceholderRef.current;
    if (!placeholder) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadAuditor(true);
          observer.disconnect();
        }
      },
      { rootMargin: "900px 0px" },
    );

    observer.observe(placeholder);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleOpenAudit = () => {
      if (loadAuditor) return;
      setLoadAuditor(true);
      // The CTA scrolls to the reserved section first. Re-dispatch after the
      // lazy module has had time to load and attach its event listener.
      window.setTimeout(() => {
        window.dispatchEvent(new Event("ketemuterus:open-audit"));
      }, 900);
    };

    window.addEventListener("ketemuterus:open-audit", handleOpenAudit);
    return () => window.removeEventListener("ketemuterus:open-audit", handleOpenAudit);
  }, [loadAuditor]);

  return (
    <div id="main-app" className="min-h-screen min-w-0 overflow-x-clip bg-[#FAFAFA] text-gray-800 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <main>
        <Hero />
        <TrustLogos />
        <Services />
        <section
          id="ai-auditor"
          ref={auditPlaceholderRef}
          className="scroll-mt-20 min-h-[540px] w-full bg-[#F8FAFF] py-16 lg:py-24"
          aria-label="Audit bisnis gratis"
        >
          {loadAuditor ? (
            <Suspense fallback={
              <div className="mx-auto flex min-h-[360px] max-w-3xl items-center justify-center px-5 text-center text-sm text-slate-500" role="status">
                Memuat fitur audit...
              </div>
            }>
              <AIAuditor />
            </Suspense>
          ) : (
            <div className="mx-auto flex min-h-[360px] max-w-3xl flex-col items-center justify-center px-5 text-center">
              <p className="text-sm font-semibold text-blue-600">Audit bisnis gratis</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Cek kondisi bisnismu di Google</h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">Isi beberapa informasi dasar untuk mendapat rekomendasi awal.</p>
            </div>
          )}
        </section>
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
