import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSolutionSection from "@/components/landing/ProblemSolutionSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import SkillsPreviewSection from "@/components/landing/SkillsPreviewSection";
import PricingSection from "@/components/landing/PricingSection";
import TrustSection from "@/components/landing/TrustSection";
import FAQSection from "@/components/landing/FAQSection";
import DemoSection from "@/components/landing/DemoSection";
import Footer from "@/components/landing/Footer";
import CookieBanner from "@/components/landing/CookieBanner";

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <HeroSection />

      {/* Divider */}
      <div
        className="max-w-7xl mx-auto px-6"
        style={{ height: "1px", background: "linear-gradient(90deg, transparent, var(--border), transparent)" }}
      />

      <ProblemSolutionSection />

      <div
        className="max-w-7xl mx-auto px-6"
        style={{ height: "1px", background: "linear-gradient(90deg, transparent, var(--border), transparent)" }}
      />

      <FeaturesSection />
      <HowItWorksSection />

      <div
        className="max-w-7xl mx-auto px-6"
        style={{ height: "1px", background: "linear-gradient(90deg, transparent, var(--border), transparent)" }}
      />

      <SkillsPreviewSection />
      <PricingSection />

      <div
        className="max-w-7xl mx-auto px-6"
        style={{ height: "1px", background: "linear-gradient(90deg, transparent, var(--border), transparent)" }}
      />

      <TrustSection />
      <FAQSection />
      <DemoSection />
      <Footer />
      <CookieBanner />
    </main>
  );
}
