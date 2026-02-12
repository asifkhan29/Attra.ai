import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GrowSection from "@/components/GrowSection";
import ServicesGrid from "@/components/ServicesGrid";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import EnterpriseFeatureSection from "@/components/Services";
import ParticleHero from "@/components/ParticleHero";
import { WelcomeSection } from "@/components/WelcomeSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <GrowSection />
     <CTASection />

      <EnterpriseFeatureSection/>
      
      <ParticleHero/>
      <Footer />
    </main>
  );
};

export default Index;
