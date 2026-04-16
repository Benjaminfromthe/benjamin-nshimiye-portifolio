import { useState, useCallback } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import SplashScreen from "@/components/SplashScreen";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import CredentialsSection from "@/components/CredentialsSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import SystemLog from "@/components/SystemLog";
import Footer from "@/components/Footer";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [theme, setTheme] = useState<"cyber" | "shinkai">("cyber");
  const [entered, setEntered] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    setTimeout(() => setEntered(true), 50);
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
        <NavBar theme={theme} onToggleTheme={toggleTheme} />
        <HeroSection />
        <CredentialsSection />
        <ProjectsSection />
        <SkillsSection />
        <Footer />
        <SystemLog />
      </div>
    </LanguageProvider>
  );
};

export default Index;
