import Navbar from "@/components/landing-page/Navbar";
import HeroSection from "@/components/landing-page/hero-section";
import StatSection from "@/components/landing-page/stat-section";
import WhyChooseSection from "@/components/landing-page/why-choose-section";
import FeaturesSection from "@/components/landing-page/features-section";
import FooterSection from "@/components/landing-page/footer-section";
import CtaSection from "@/components/landing-page/cta-section";
import ShowcaseSection from "@/components/landing-page/showcase-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-8 lg:px-16">
        <Navbar />
      </header>

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Section */}
        <StatSection />

        {/* Why Choose EduSchedPro */}
        <WhyChooseSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Algorithm Showcase */}
        <ShowcaseSection />

        {/* Call to Action */}
        <CtaSection />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
