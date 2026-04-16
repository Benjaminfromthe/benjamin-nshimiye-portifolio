import { useLanguage } from "@/contexts/LanguageContext";
import { Image } from "lucide-react";

const placeholders = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  aspect: i % 3 === 0 ? "aspect-square" : i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/3]",
}));

const MemoryGallery = () => {
  const { t } = useLanguage();

  return (
    <section id="memories" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-2xl md:text-3xl neon-text text-center tracking-widest mb-12">
          <Image className="inline w-6 h-6 mr-2 mb-1" />
          {t("memories_title")}
        </h2>

        <div className="columns-2 md:columns-3 gap-4 max-w-4xl mx-auto">
          {placeholders.map((p) => (
            <div
              key={p.id}
              className={`mb-4 break-inside-avoid rounded-xl overflow-hidden glass group hover:neon-border transition-all duration-500 ${p.aspect}`}
            >
              <div className="w-full h-full flex items-center justify-center bg-muted/20 relative">
                <div className="absolute inset-0 animate-neon-pulse opacity-30 rounded-xl" />
                <div className="text-center relative z-10">
                  <Image className="w-8 h-8 text-primary/40 mx-auto mb-2" />
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    Memory #{p.id}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemoryGallery;
