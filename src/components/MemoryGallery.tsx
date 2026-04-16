import { useLanguage } from "@/contexts/LanguageContext";
import { Image } from "lucide-react";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import memory4 from "@/assets/memory-4.jpg";

const photos = [
  { id: 1, src: memory1, aspect: "aspect-[3/4]", alt: "Benjamin at the football field" },
  { id: 2, src: memory2, aspect: "aspect-[3/4]", alt: "Benjamin with a friend" },
  { id: 3, src: memory3, aspect: "aspect-square", alt: "Benjamin photo collage" },
  { id: 4, src: memory4, aspect: "aspect-[3/4]", alt: "Benjamin in denim jacket" },
];

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
          {photos.map((p) => (
            <div
              key={p.id}
              className={`mb-4 break-inside-avoid rounded-xl overflow-hidden glass group hover:neon-border transition-all duration-500`}
            >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 animate-neon-pulse opacity-20 rounded-xl z-10 pointer-events-none" />
                <img
                  src={p.src}
                  alt={p.alt}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemoryGallery;
