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
import GitHubStats from "@/components/GitHubStats";
import TerminalMode from "@/components/TerminalMode";
import BlogSection from "@/components/BlogSection";
import CodePlayground from "@/components/CodePlayground";

import CVBuilder from "@/components/CVBuilder";
import Guestbook from "@/components/Guestbook";

import Footer from "@/components/Footer";

const Index = () => {
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("welcome-screen-seen") !== "true";
  });
  const [theme, setTheme] = useState<"cyber" | "shinkai">("cyber");
  const [entered, setEntered] = useState(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem("welcome-screen-seen") === "true";
  });
  const [aboutOpen, setAboutOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem("welcome-screen-seen", "true");
    setShowSplash(false);
    setTimeout(() => {
      setEntered(true);
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

      <NavBar
        theme={theme}
        onToggleTheme={toggleTheme}
        onAboutClick={() => setAboutOpen(true)}
        onTerminalClick={() => setTerminalOpen(true)}
        onCvClick={() => setCvOpen(true)}
      />

      <div
        className={`transition-all duration-700 ${
          entered ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
        style={entered ? undefined : { filter: "blur(10px)" }}
      >
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <GitHubStats />
        <MemoryGallery />
        <BlogSection />
        <CredentialsSection />
        <AchievementVault />
        <Guestbook />
        <ContactSection />
        <Footer />
        <SystemLog />
      </div>

      <BenAI />
      <TerminalMode open={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <CVBuilder open={cvOpen} onClose={() => setCvOpen(false)} />
      

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </LanguageProvider>
  );
};

export default Index;
