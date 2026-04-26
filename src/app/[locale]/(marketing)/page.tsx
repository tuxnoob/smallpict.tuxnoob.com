import Hero from "@/components/Hero";
import TrustBar from "@/components/marketing/TrustBar";
import Features from "@/components/Features";
import ToolCta from "@/components/marketing/ToolCta";
import PricingSection from "@/components/PricingSection";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Features />
      <ToolCta />
      <PricingSection />
      <HowItWorks />
      <Testimonials />
    </>
  );
}
