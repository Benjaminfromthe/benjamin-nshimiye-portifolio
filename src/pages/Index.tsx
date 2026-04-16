import { useState, useCallback } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import SplashScreen from "@/components/SplashScreen";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import CredentialsSection from "@/components/CredentialsSection";
import AchievementVault from "@/components/AchievementVault";
import ContactSection from "@/components/ContactSection";
import MemoryGallery from "@/components/MemoryGallery";
import AboutModal from "@/components/AboutModal";
import BenAI from "@/components/BenAI";
import SystemLog from "@/components/SystemLog";
import SystemTour from "@/components/SystemTour";
import Footer from "@/components/Footer";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [theme, setTheme] = useState<"cyber" | "shinkai">("cyber");
  const [entered, setEntered] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [showTour, setShowTour] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    setTimeout(() => {
      setEntered(true);
      setTimeout(() => setShowTour(true), 800);
    }, 50);
  }, []);

  const toggleTheme = () => {
    setTheme((t) => {
      const next = t === "cyber" ? "shinkai" : "cyber";
      if (next === "shinkai") {
        document.documentElement.classList.add("shinkai");
      } else {
        document.documentElement.classList.remove("shinkai");
      }
      return next;
    });
  };

  return (
    <LanguageProvider>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <div
        className={`transition-all duration-700 ${
          entered ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
        style={{ filter: entered ? "blur(0)" : "blur(10px)" }}
      >
        <NavBar theme={theme} onToggleTheme={toggleTheme} onAboutClick={() => setAboutOpen(true)} />
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <MemoryGallery />
        <CredentialsSection />
        <AchievementVault />
        <ContactSection />
        <Footer />
        <SystemLog />
        <BenAI />
      </div>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
      {showTour && <SystemTour onClose={() => setShowTour(false)} />}
    </LanguageProvider>
  );
};

export default Index;
