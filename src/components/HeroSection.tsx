import { useLanguage } from "@/contexts/LanguageContext";
import profileImg from "@/assets/benjamin-profile.png";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="min-h-[70vh] flex items-center justify-center pt-14 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary) / 0.5) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--primary) / 0.5) 1px, transparent 1px)`,
        backgroundSize: "80px 80px"
      }} />

      <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-10">
        <div className="relative mb-8">
          <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden relative animate-neon-pulse border-2 border-primary">
            <div className="absolute inset-0 z-10 overflow-hidden rounded-full pointer-events-none">
              <div className="absolute inset-0 w-full h-8 bg-gradient-to-b from-primary/20 to-transparent" style={{ animation: "scan 2s linear infinite" }} />
            </div>
            <img src={profileImg} alt="Benjamin Nshimiye" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary" />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary" />
        </div>

        <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl neon-text tracking-widest mb-3">
          {t("hero_title")}
        </h1>
        <p className="font-heading text-sm md:text-base text-secondary tracking-wider mb-4">
          {t("hero_subtitle")}
        </p>
        <p className="font-body text-sm text-muted-foreground max-w-lg leading-relaxed">
          {t("hero_narrative")}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
