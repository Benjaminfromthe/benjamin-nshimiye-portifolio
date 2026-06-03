import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Image, ChevronLeft, ChevronRight } from "lucide-react";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory4 from "@/assets/memory-4.jpg";

const photos = [
  { id: 1, src: memory1, alt: "Benjamin at the football field", desc: "Scoring goals and building teamwork on the field." },
  { id: 2, src: memory2, alt: "Benjamin with a friend", desc: "Great moments shared with close friends." },
  { id: 4, src: memory4, alt: "Benjamin in denim jacket", desc: "Casual style, confident mindset." },
];

const MemoryGallery = () => {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIndex((i) => (i + 1) % photos.length);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0 || e.deltaX > 0) next();
    else prev();
  };

  return (
    <section id="memories" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-2xl md:text-3xl neon-text text-center tracking-widest mb-12">
          <Image className="inline w-6 h-6 mr-2 mb-1" />
          {t("memories_title")}
        </h2>

        <div className="relative max-w-md mx-auto flex items-center justify-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="shrink-0 p-2 rounded-full glass hover:neon-border transition-all text-primary"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            onWheel={handleWheel}
            className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden glass neon-border group"
          >
            {photos.map((p, i) => (
              <img
                key={p.id}
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 animate-neon-pulse opacity-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pb-8">
              <p className="text-white text-sm font-medium text-center drop-shadow-md">
                {photos[index].desc}
              </p>
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/50 hover:bg-primary/60"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={next}
            aria-label="Next photo"
            className="shrink-0 p-2 rounded-full glass hover:neon-border transition-all text-primary"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MemoryGallery;
