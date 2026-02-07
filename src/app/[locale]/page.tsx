import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Features from "@/components/Features";
import PricingSection from "@/components/PricingSection";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar />
      <main>
        <Hero />
        {/*<Benefits />*/}
        <Features />
        <PricingSection />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
