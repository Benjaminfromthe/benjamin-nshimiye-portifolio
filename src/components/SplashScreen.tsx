import { useState, useEffect, useCallback } from "react";
import { useLanguage, LANGUAGES, type Lang } from "@/contexts/LanguageContext";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"select" | "welcome">("select");
  const [selectedLang, setSelectedLang] = useState<Lang | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { setLang, t } = useLanguage();

  // Update clock every second during welcome phase
  useEffect(() => {
    if (phase !== "welcome") return;
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, [phase]);

  const handleSelect = useCallback((code: Lang) => {
    setLang(code);
    setSelectedLang(code);
    setPhase("welcome");

    // Auto-transition after 3 seconds
    setTimeout(onComplete, 3000);
  }, [setLang, onComplete]);

  const welcomeText = selectedLang
    ? LANGUAGES.find((l) => l.code === selectedLang)?.welcome || "Welcome"
    : "Welcome";

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
        backgroundSize: "60px 60px"
      }} />

      {phase === "select" ? (
        <div className="relative z-10 flex flex-col items-center animate-fade-in">
          <h1 className="font-heading text-2xl md:text-4xl neon-text mb-2 tracking-widest">
            BENJAMIN.SYS
          </h1>
          <p className="font-mono text-sm text-muted-foreground mb-10 tracking-wider">
            {t("select_language")}
          </p>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-w-xl px-4">
            {LANGUAGES.map((l, i) => (
              <button
                key={l.code}
                onClick={() => handleSelect(l.code)}
                className="glass px-4 py-3 rounded-lg font-heading text-xs md:text-sm tracking-wider text-foreground hover:neon-border transition-all duration-300 animate-float text-center"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center animate-fade-in">
          <h1 className="font-heading text-4xl md:text-6xl neon-text mb-4 tracking-widest">
            {welcomeText}
          </h1>
          <p className="font-mono text-lg md:text-xl text-muted-foreground mb-2">
            {currentTime.toLocaleDateString(selectedLang === "zh" ? "zh-CN" : selectedLang === "ja" ? "ja-JP" : selectedLang === "ko" ? "ko-KR" : selectedLang === "ar" ? "ar-SA" : selectedLang === "hi" ? "hi-IN" : selectedLang === "de" ? "de-DE" : selectedLang === "es" ? "es-ES" : selectedLang === "pt" ? "pt-BR" : selectedLang === "fr" ? "fr-FR" : "en-US", {
              weekday: "long", year: "numeric", month: "long", day: "numeric"
            })}
          </p>
          <p className="font-heading text-3xl md:text-5xl neon-text tracking-widest">
            {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </p>

          {/* Loading indicator */}
          <div className="mt-10 flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
