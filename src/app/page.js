import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Work from "@/components/sections/Work";
import Problems from "@/components/sections/Problems";
import Process from "@/components/sections/Process";
import Included from "@/components/sections/Included";
import Founder from "@/components/sections/Founder";
import Faq from "@/components/sections/Faq";
import DemoForm from "@/components/sections/DemoForm";
import Footer from "@/components/sections/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Trust Strip */}
        <TrustStrip />

        {/* 3. Portfolio: Video Case Studies */}
        <Work />

        {/* 4. Problems We Fix */}
        <Problems />

        {/* 5. How The Free Demo Works */}
        <Process />

        {/* 6. What The Full Website Includes */}
        <Included />

        {/* 7. Founder Introduction */}
        <Founder />

        {/* 8. FAQ */}
        <Faq />

        {/* 9. Final CTA + Demo Request Form */}
        <DemoForm />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky CTA Bar */}
      <MobileCtaBar />
    </>
  );
}
