import { useEffect } from "react";
import { useLanguage, LANGUAGES } from "@/contexts/LanguageContext";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const { lang } = useLanguage();
  const currentTime = new Date();
  const welcomeText = LANGUAGES.find((l) => l.code === lang)?.welcome || "Welcome";

  useEffect(() => {
    const timeout = window.setTimeout(onComplete, 2000);
    return () => window.clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
        backgroundSize: "60px 60px"
      }} />

      <div className="relative z-10 flex flex-col items-center animate-fade-in">
        <h1 className="font-heading text-4xl md:text-6xl neon-text mb-4 tracking-widest">
          {welcomeText}
        </h1>
        <p className="font-mono text-lg md:text-xl text-muted-foreground mb-2">
          {currentTime.toLocaleDateString(lang === "zh" ? "zh-CN" : lang === "ja" ? "ja-JP" : lang === "ko" ? "ko-KR" : lang === "ar" ? "ar-SA" : lang === "hi" ? "hi-IN" : lang === "de" ? "de-DE" : lang === "es" ? "es-ES" : lang === "pt" ? "pt-BR" : lang === "fr" ? "fr-FR" : "en-US", {
            weekday: "long", year: "numeric", month: "long", day: "numeric"
          })}
        </p>
        <p className="font-heading text-3xl md:text-5xl neon-text tracking-widest">
          {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </p>

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
    </div>
  );
};

export default SplashScreen;
