import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const { setLang, t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return p + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
        backgroundSize: "60px 60px"
      }} />

      <h1 className="font-heading text-3xl md:text-5xl neon-text mb-2 tracking-widest">
        BENJAMIN.SYS
      </h1>
      <p className="font-mono text-sm text-muted-foreground mb-12 tracking-wider">
        {t("systemSyncing")}...
      </p>

      {/* Progress bar */}
      <div className="w-72 md:w-96 h-2 rounded-full bg-muted overflow-hidden mb-8">
        <div
          className="h-full rounded-full bg-primary transition-all duration-100"
          style={{
            width: `${progress}%`,
            animation: "progress-glow 1.5s ease-in-out infinite",
          }}
        />
      </div>
      <p className="font-mono text-xs text-primary mb-12">{progress}%</p>

      {/* Language buttons */}
      <div className="flex gap-4">
        {(["en", "rw", "fr"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className="glass px-5 py-2 rounded-lg font-heading text-sm uppercase tracking-wider text-foreground hover:neon-border transition-all duration-300 animate-float"
            style={{ animationDelay: `${["en", "rw", "fr"].indexOf(l) * 0.3}s` }}
          >
            {l === "en" ? "English" : l === "rw" ? "Kinyarwanda" : "Français"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
