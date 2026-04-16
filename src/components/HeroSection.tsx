import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-14 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary) / 0.5) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--primary) / 0.5) 1px, transparent 1px)`,
        backgroundSize: "80px 80px"
      }} />

      <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-10">
        {/* Holographic portrait frame */}
        <div className="relative mb-8">
          <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden relative animate-neon-pulse border-2 border-primary">
            {/* Scan line overlay */}
            <div className="absolute inset-0 z-10 overflow-hidden rounded-full pointer-events-none">
              <div className="absolute inset-0 w-full h-8 bg-gradient-to-b from-primary/20 to-transparent" style={{ animation: "scan 2s linear infinite" }} />
            </div>
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="font-heading text-4xl neon-text">BN</span>
            </div>
          </div>
          {/* Corner brackets */}
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
        <p className="font-mono text-xs md:text-sm text-muted-foreground max-w-lg leading-relaxed">
          {t("hero_bio")}
        </p>

        {/* Stats */}
        <div className="flex gap-6 mt-8">
          {[
            { label: "AGE", value: "22" },
            { label: "HEIGHT", value: "1.68m" },
            { label: "WEIGHT", value: "57kg" },
            { label: "STATUS", value: "Single" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-lg px-4 py-3 text-center">
              <p className="font-mono text-[10px] text-muted-foreground uppercase">{s.label}</p>
              <p className="font-heading text-sm neon-text">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
